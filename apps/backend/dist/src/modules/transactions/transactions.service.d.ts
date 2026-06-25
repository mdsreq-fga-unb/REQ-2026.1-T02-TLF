import { PrismaService } from '@common/prisma/prisma.service';
import { TransactionStatus } from 'generated/prisma/client';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { FindManyTransactionsDto } from './dto/find-many.dto';
import { RemoveTransactionRequestDto } from './dto/remove.dto';
import { TransactionListResponseDto } from './dto/transaction-list.response.dto';
import { SyncTransactionDto } from './dto/sync-transaction.dto';
export declare class TransactionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManyTransactionsDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        type: import("generated/prisma/client").TransactionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: TransactionStatus;
        amount: number;
        date: Date;
        installmentReference: string | null;
        installmentNumber: number | null;
        installmentTotal: number | null;
        receiptUrl: string | null;
        externalId: string | null;
        institutionId: string;
        destinationInstitutionId: string | null;
        subCategoryId: string | null;
        recurrenceId: string | null;
        invoiceId: string | null;
    }[]>;
    create(userId: string, dto: CreateTransactionDto): Promise<{
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
    private getTransactionOrThrow;
    findAll(userId: string, query: FilterTransactionsDto): Promise<TransactionListResponseDto>;
    findOne({ userId, id }: {
        userId: string;
        id: string;
    }): Promise<{
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
    update({ userId, id, dto }: {
        userId: string;
        id: string;
        dto: UpdateTransactionDto;
    }): Promise<{
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
    private assertTransactionRelations;
    syncCreate(userId: string, dto: SyncTransactionDto): Promise<{
        type: import("generated/prisma/client").TransactionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: TransactionStatus;
        amount: number;
        date: Date;
        installmentReference: string | null;
        installmentNumber: number | null;
        installmentTotal: number | null;
        receiptUrl: string | null;
        externalId: string | null;
        institutionId: string;
        destinationInstitutionId: string | null;
        subCategoryId: string | null;
        recurrenceId: string | null;
        invoiceId: string | null;
    }>;
    syncUpdate(userId: string, dto: SyncTransactionDto): Promise<{
        category: {
            name: string;
            id: string;
            userId: string;
            icon: string;
            color: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        subCategory: {
            name: string;
            id: string;
            icon: string;
            color: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
        } | null;
        institution: {
            name: string;
            id: string;
            userId: string;
            icon: string | null;
            color: string;
            createdAt: Date;
            updatedAt: Date;
            logoUrl: string | null;
        };
    } & {
        type: import("generated/prisma/client").TransactionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        status: TransactionStatus;
        amount: number;
        date: Date;
        installmentReference: string | null;
        installmentNumber: number | null;
        installmentTotal: number | null;
        receiptUrl: string | null;
        externalId: string | null;
        institutionId: string;
        destinationInstitutionId: string | null;
        subCategoryId: string | null;
        recurrenceId: string | null;
        invoiceId: string | null;
    }>;
    remove(dto: RemoveTransactionRequestDto): Promise<void>;
    private formatTransaction;
}
