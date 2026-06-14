import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { nullifyTransactionInvoiceRefs } from '@common/sync/set-null.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { InvoicePaymentStatus, InvoiceStatus, TableName } from 'generated/prisma/client'
import { FindManyInvoicesDto } from './dto/find-many.dto'
import { SyncInvoiceDto } from './dto/sync-invoice.dto'

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyInvoicesDto) {
    const {
      userId,
      id,
      accountId,
      status,
      referenceMonth,
      referenceYear,
      createdAfter,
      updatedAfter,
    } = dto

    return this.prisma.invoice.findMany({
      where: {
        account: { institution: { userId } },
        ...(id && { id }),
        ...(accountId && { accountId }),
        ...(status && { status }),
        ...(referenceMonth !== undefined && { referenceMonth }),
        ...(referenceYear !== undefined && { referenceYear }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  private async assertAccountOwnership(userId: string, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      include: { institution: true },
    })
    if (!account) throw new NotFoundException('Conta não encontrada')
    if (account.institution.userId !== userId) throw new ForbiddenException('Acesso negado')
  }

  async syncCreate(userId: string, dto: SyncInvoiceDto) {
    await this.assertAccountOwnership(userId, dto.accountId)
    return this.prisma.invoice.upsert({
      where: { id: dto.id },
      create: {
        id: dto.id,
        accountId: dto.accountId,
        status: dto.status ?? InvoiceStatus.OPEN,
        paymentStatus: dto.paymentStatus ?? InvoicePaymentStatus.NOT_PAID,
        referenceMonth: dto.referenceMonth,
        referenceYear: dto.referenceYear,
        totalAmount: dto.totalAmount ?? 0,
        paidAmount: dto.paidAmount ?? 0,
        closingDay: dto.closingDay,
        dueDay: dto.dueDay,
        ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
      update: {
        accountId: dto.accountId,
        status: dto.status,
        paymentStatus: dto.paymentStatus,
        referenceMonth: dto.referenceMonth,
        referenceYear: dto.referenceYear,
        totalAmount: dto.totalAmount,
        paidAmount: dto.paidAmount,
        closingDay: dto.closingDay,
        dueDay: dto.dueDay,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async syncUpdate(userId: string, dto: SyncInvoiceDto) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: dto.id },
      include: { account: { include: { institution: true } } },
    })
    if (!invoice) throw new NotFoundException('Fatura não encontrada')
    if (invoice.account.institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    return this.prisma.invoice.update({
      where: { id: dto.id },
      data: {
        accountId: dto.accountId,
        status: dto.status,
        paymentStatus: dto.paymentStatus,
        referenceMonth: dto.referenceMonth,
        referenceYear: dto.referenceYear,
        totalAmount: dto.totalAmount,
        paidAmount: dto.paidAmount,
        closingDay: dto.closingDay,
        dueDay: dto.dueDay,
        ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
      },
    })
  }

  async remove(userId: string, invoiceId: string) {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { account: { include: { institution: true } } },
    })
    if (!invoice) throw new NotFoundException('Fatura não encontrada')
    if (invoice.account.institution.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await nullifyTransactionInvoiceRefs(tx, invoiceId)
      await createDeletedRecords(tx, userId, TableName.INVOICES, [invoiceId])
      await tx.invoice.delete({ where: { id: invoiceId } })
    })
  }
}
