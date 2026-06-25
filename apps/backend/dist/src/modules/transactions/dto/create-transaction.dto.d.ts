import { TransactionType, TransactionStatus } from '../../../../generated/prisma/client';
export declare class CreateTransactionDto {
    id?: string;
    institutionId: string;
    categoryId: string;
    subCategoryId?: string;
    type: TransactionType;
    amount: number;
    description?: string;
    date?: string;
    status?: TransactionStatus;
    invoiceId?: string;
    recurrenceId?: string;
    destinationInstitutionId?: string;
    installmentNumber?: number;
    installmentTotal?: number;
}
