export declare class RecurrenceDetailResponseDto {
    id: string;
    description: string;
    amount: number;
    chargeDate: number;
    startDate: string;
    endDate?: string;
    isActive: boolean;
    category?: {
        id: string;
        name: string;
    };
    subCategory?: {
        id: string;
        name: string;
    };
    account: {
        id: string;
        name: string;
    };
}
