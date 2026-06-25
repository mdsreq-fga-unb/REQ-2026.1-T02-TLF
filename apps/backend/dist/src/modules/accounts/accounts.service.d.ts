import { PrismaService } from '@common/prisma/prisma.service';
import { AccountType, Currency } from 'generated/prisma/client';
import { DeleteAccountInTransactionDto } from './dto/delete-account-in-transaction.dto';
import { FindManyAccountsDto } from './dto/find-many.dto';
import { RemoveAccountRequestDto } from './dto/remove.dto';
import { SyncAccountDto } from './dto/sync-account.dto';
export declare class AccountsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManyAccountsDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        type: AccountType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        isActive: boolean;
        closingDay: number | null;
        dueDay: number | null;
        balance: number;
        creditLimit: number | null;
        currency: Currency;
    }[]>;
    private assertInstitutionOwnership;
    deleteAccountInTransaction(dto: DeleteAccountInTransactionDto): Promise<void>;
    syncCreate(userId: string, dto: SyncAccountDto): Promise<{
        type: AccountType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        isActive: boolean;
        closingDay: number | null;
        dueDay: number | null;
        balance: number;
        creditLimit: number | null;
        currency: Currency;
    }>;
    syncUpdate(userId: string, dto: SyncAccountDto): Promise<{
        type: AccountType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        institutionId: string;
        isActive: boolean;
        closingDay: number | null;
        dueDay: number | null;
        balance: number;
        creditLimit: number | null;
        currency: Currency;
    }>;
    remove(dto: RemoveAccountRequestDto): Promise<void>;
}
