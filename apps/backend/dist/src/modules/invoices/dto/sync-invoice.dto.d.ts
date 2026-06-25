import { InvoicePaymentStatus, InvoiceStatus } from 'generated/prisma/client';
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncInvoiceDto extends SyncRecordDto {
    accountId: string;
    status?: InvoiceStatus;
    paymentStatus?: InvoicePaymentStatus;
    referenceMonth: number;
    referenceYear: number;
    totalAmount?: number;
    paidAmount?: number;
    closingDay: number;
    dueDay: number;
}
