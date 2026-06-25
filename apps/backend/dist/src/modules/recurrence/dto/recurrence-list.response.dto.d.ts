export declare class RecurrenceListResponseDto {
    data: {
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
        account: {
            id: string;
            name: string;
        };
    }[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
