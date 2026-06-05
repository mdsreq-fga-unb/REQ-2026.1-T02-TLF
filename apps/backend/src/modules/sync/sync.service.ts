import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { TransactionStatus, TransactionType } from '../../../generated/prisma/client'
import { RawRecord, SyncChanges, SyncPullResult } from './sync.types'

// Prisma row shapes we read in this service (only the columns we map).
type AccountRow = {
  id: string
  name: string
  type: string
  balance: number
  currency: string
  institutionId: string
  createdAt: Date
  updatedAt: Date
}

type TransactionRow = {
  id: string
  amount: number
  description: string | null
  date: Date
  type: TransactionType
  status: TransactionStatus
  accountId: string
  categoryId: string | null
  subCategoryId: string | null
  invoiceId: string | null
  recurrenceId: string | null
  destinationAccountId: string | null
  installmentReference: string | null
  installmentNumber: number | null
  installmentTotal: number | null
  receiptUrl: string | null
  externalId: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

@Injectable()
export class SyncService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Pull: server → client ────────────────────────────────────────────────
  async pull(userId: string, lastPulledAtInput?: number): Promise<SyncPullResult> {
    const lastPulledAt = lastPulledAtInput ?? 0
    const isFirstSync = lastPulledAt === 0
    const since = new Date(lastPulledAt)
    // Snapshot a single "now" so a record changed mid-request isn't missed next time.
    const timestamp = Date.now()

    const accounts = (await this.prisma.account.findMany({
      where: {
        institution: { userId },
        ...(isFirstSync ? {} : { updatedAt: { gt: since } }),
      },
    })) as AccountRow[]

    const transactions = (await this.prisma.transaction.findMany({
      where: {
        account: { institution: { userId } },
        ...(isFirstSync ? { deletedAt: null } : { updatedAt: { gt: since } }),
      },
    })) as TransactionRow[]

    const accountsChanges = { created: [] as RawRecord[], updated: [] as RawRecord[], deleted: [] }
    for (const account of accounts) {
      accountsChanges[isFirstSync ? 'created' : 'updated'].push(this.accountToRaw(account))
    }

    const txChanges = {
      created: [] as RawRecord[],
      updated: [] as RawRecord[],
      deleted: [] as string[],
    }
    for (const tx of transactions) {
      if (tx.deletedAt) {
        if (!isFirstSync) txChanges.deleted.push(tx.id)
        continue
      }

      txChanges[isFirstSync ? 'created' : 'updated'].push(this.transactionToRaw(tx))
    }

    return {
      changes: {
        accounts: accountsChanges,
        transactions: txChanges,
      },
      timestamp,
    }
  }

  // ─── Push: client → server ────────────────────────────────────────────────
  async push(userId: string, changes: SyncChanges): Promise<void> {
    const txChanges = changes?.transactions
    if (!txChanges) return

    // Ownership: only accept transactions referencing accounts that belong to
    // the user. Accounts themselves are read-only from the client.
    const ownedAccounts = await this.prisma.account.findMany({
      where: { institution: { userId } },
      select: { id: true },
    })
    const ownedAccountIds = new Set(ownedAccounts.map((account) => account.id))

    const upserts = [...(txChanges.created ?? []), ...(txChanges.updated ?? [])]
    const deletions = txChanges.deleted ?? []

    await this.prisma.$transaction(async (tx) => {
      for (const raw of upserts) {
        const data = this.rawToTransactionData(raw)

        if (!ownedAccountIds.has(data.accountId)) {
          throw new ForbiddenException('Conta da transação não pertence ao usuário')
        }
        if (data.destinationAccountId && !ownedAccountIds.has(data.destinationAccountId)) {
          throw new ForbiddenException('Conta destino da transação não pertence ao usuário')
        }

        const id = String(raw.id)
        // Push contract: create if new, update if it already exists (no error).
        await tx.transaction.upsert({
          where: { id },
          create: { id, ...data },
          update: data,
        })
      }

      // Deletions are tombstoned so other clients can still pull the removal.
      for (const id of deletions) {
        await tx.transaction.updateMany({
          where: { id, account: { institution: { userId } } },
          data: { deletedAt: new Date() },
        })
      }
    })
  }

  // ─── Mappers (backend ⇄ WatermelonDB raw) ─────────────────────────────────
  private accountToRaw(account: AccountRow): RawRecord {
    return {
      id: account.id,
      name: account.name,
      type: account.type,
      balance: account.balance / 100,
      currency: account.currency,
      institution_id: account.institutionId,
      created_at: account.createdAt.getTime(),
      updated_at: account.updatedAt.getTime(),
    }
  }

  private transactionToRaw(tx: TransactionRow): RawRecord {
    return {
      id: tx.id,
      amount: tx.amount / 100, // cents → reais (mobile stores reais)
      description: tx.description ?? '',
      date: tx.date.getTime(),
      type: tx.type,
      status: this.toClientStatus(tx.status),
      account_id: tx.accountId,
      category_id: tx.categoryId,
      subcategory_id: tx.subCategoryId,
      invoice_id: tx.invoiceId,
      recurrence_id: tx.recurrenceId,
      destination_account_id: tx.destinationAccountId,
      installment_ref: tx.installmentReference,
      installment_number: tx.installmentNumber,
      installment_total: tx.installmentTotal,
      receipt_url: tx.receiptUrl,
      external_id: tx.externalId,
      created_at: tx.createdAt.getTime(),
      updated_at: tx.updatedAt.getTime(),
    }
  }

  private rawToTransactionData(raw: RawRecord) {
    const str = (value: unknown): string | null =>
      value === null || value === undefined || value === '' ? null : String(value)
    const num = (value: unknown): number | null =>
      value === null || value === undefined ? null : Number(value)

    return {
      accountId: String(raw.account_id),
      destinationAccountId: str(raw.destination_account_id),
      // TODO (categorias): hoje o app sempre envia category_id null (categorias
      // ainda não sincronizadas). Quando o app passar a enviar o id real, ele já
      // será persistido aqui sem mudança — só validar que a categoria existe.
      categoryId: str(raw.category_id),
      subCategoryId: str(raw.subcategory_id),
      type: (str(raw.type) ?? TransactionType.EXPENSE) as TransactionType,
      status: this.toServerStatus(str(raw.status)),
      amount: Math.round(Number(raw.amount ?? 0) * 100), // reais → cents
      description: str(raw.description),
      date: raw.date ? new Date(Number(raw.date)) : new Date(),
      recurrenceId: str(raw.recurrence_id),
      invoiceId: str(raw.invoice_id),
      installmentReference: str(raw.installment_ref),
      installmentNumber: num(raw.installment_number),
      installmentTotal: num(raw.installment_total),
      receiptUrl: str(raw.receipt_url),
      externalId: str(raw.external_id),
      deletedAt: null,
    }
  }

  // Mobile only knows PENDING | CONFIRMED; backend adds COMPLETED | FAILED.
  private toClientStatus(status: TransactionStatus): string {
    return status === TransactionStatus.COMPLETED ? 'CONFIRMED' : 'PENDING'
  }

  private toServerStatus(status: string | null): TransactionStatus {
    return status === 'CONFIRMED' ? TransactionStatus.COMPLETED : TransactionStatus.PENDING
  }
}
