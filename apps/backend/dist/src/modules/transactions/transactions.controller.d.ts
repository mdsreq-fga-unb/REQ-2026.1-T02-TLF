import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionListResponseDto } from './dto/transaction-list.response.dto';
export declare class TransactionsController {
    private readonly transactionsService;
    constructor(transactionsService: TransactionsService);
    create(dto: CreateTransactionDto, userId: string): Promise<{
        id: string;
        type: string;
        amount: number;
        description: string | undefined;
        date: string;
        status: string;
        destinationInstitutionId: string | undefined;
        category: {
            id: string;
            name: string;
        } | undefined;
        subCategory: {
            id: string;
            name: string;
        } | undefined;
        institution: {
            id: string;
            name: string;
        };
    }>;
    findAll(userId: string, query: FilterTransactionsDto): Promise<TransactionListResponseDto>;
    findOne(userId: string, id: string): Promise<{
        id: string;
        type: string;
        amount: number;
        description: string | undefined;
        date: string;
        status: string;
        destinationInstitutionId: string | undefined;
        category: {
            id: string;
            name: string;
        } | undefined;
        subCategory: {
            id: string;
            name: string;
        } | undefined;
        institution: {
            id: string;
            name: string;
        };
    }>;
    update(userId: string, id: string, dto: UpdateTransactionDto): Promise<{
        id: string;
        type: string;
        amount: number;
        description: string | undefined;
        date: string;
        status: string;
        destinationInstitutionId: string | undefined;
        category: {
            id: string;
            name: string;
        } | undefined;
        subCategory: {
            id: string;
            name: string;
        } | undefined;
        institution: {
            id: string;
            name: string;
        };
    }>;
    remove(userId: string, id: string): Promise<void>;
}
