import { TransactionType } from '../../../../generated/prisma/client';
export declare class FilterTransactionsDto {
    institutionId?: string;
    type?: TransactionType;
    categoryId?: string;
    page?: number;
    limit?: number;
}
