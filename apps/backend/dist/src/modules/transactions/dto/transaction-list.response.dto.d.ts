export declare class TransactionListResponseDto {
    data: {
        id: string;
        type: string;
        amount: number;
        description?: string;
        date: string;
        status?: string;
        destinationInstitutionId?: string;
        category?: {
            id: string;
            name: string;
        };
        subCategory?: {
            id: string;
            name: string;
        };
        institution: {
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
