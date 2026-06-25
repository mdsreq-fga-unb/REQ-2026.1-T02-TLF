export declare class CreateRecurrenceDto {
    accountId: string;
    categoryId: string;
    subCategoryId?: string;
    description: string;
    amount: number;
    chargeDate: number;
    startDate: string;
    endDate?: string;
    isActive?: boolean;
}
