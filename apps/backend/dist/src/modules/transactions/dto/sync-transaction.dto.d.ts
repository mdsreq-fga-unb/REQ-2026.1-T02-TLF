import { TransactionStatus, TransactionType } from 'generated/prisma/client';
import { SyncRecordDto } from '@common/sync/dto/sync-record.dto';
export declare class SyncTransactionDto extends SyncRecordDto {
    institutionId: string;
    categoryId?: string | null;
    subCategoryId?: string | null;
    type: TransactionType;
    amount: number;
    description?: string | null;
    date?: string;
    status?: TransactionStatus;
    invoiceId?: string | null;
    recurrenceId?: string | null;
    destinationInstitutionId?: string | null;
    installmentReference?: string | null;
    installmentNumber?: number | null;
    installmentTotal?: number | null;
    receiptUrl?: string | null;
    externalId?: string | null;
}
