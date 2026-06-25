import { PrismaService } from '@common/prisma/prisma.service';
import { InvoicePaymentStatus, InvoiceStatus } from 'generated/prisma/client';
import { FindManyInvoicesDto } from './dto/find-many.dto';
import { RemoveInvoiceRequestDto } from './dto/remove.dto';
import { SyncInvoiceDto } from './dto/sync-invoice.dto';
export declare class InvoiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManyInvoicesDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: InvoiceStatus;
        accountId: string;
        paymentStatus: InvoicePaymentStatus;
        referenceMonth: number;
        referenceYear: number;
        totalAmount: number;
        paidAmount: number;
        closingDay: number;
        dueDay: number;
    }[]>;
    private assertAccountOwnership;
    syncCreate(userId: string, dto: SyncInvoiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: InvoiceStatus;
        accountId: string;
        paymentStatus: InvoicePaymentStatus;
        referenceMonth: number;
        referenceYear: number;
        totalAmount: number;
        paidAmount: number;
        closingDay: number;
        dueDay: number;
    }>;
    syncUpdate(userId: string, dto: SyncInvoiceDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: InvoiceStatus;
        accountId: string;
        paymentStatus: InvoicePaymentStatus;
        referenceMonth: number;
        referenceYear: number;
        totalAmount: number;
        paidAmount: number;
        closingDay: number;
        dueDay: number;
    }>;
    remove(dto: RemoveInvoiceRequestDto): Promise<void>;
}
