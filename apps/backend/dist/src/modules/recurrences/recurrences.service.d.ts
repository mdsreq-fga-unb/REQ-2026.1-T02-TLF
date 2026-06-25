import { PrismaService } from '@common/prisma/prisma.service';
import { FindManyRecurrencesDto } from './dto/find-many.dto';
import { RemoveRecurrenceRequestDto } from './dto/remove.dto';
import { SyncRecurrenceDto } from './dto/sync-recurrence.dto';
export declare class RecurrencesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManyRecurrencesDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        amount: number;
        subCategoryId: string | null;
        isActive: boolean;
        chargeDate: number;
        startDate: Date;
        endDate: Date | null;
        accountId: string;
    }[]>;
    private assertAccountOwnership;
    syncCreate(userId: string, dto: SyncRecurrenceDto): Promise<{
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        amount: number;
        subCategoryId: string | null;
        isActive: boolean;
        chargeDate: number;
        startDate: Date;
        endDate: Date | null;
        accountId: string;
    }>;
    syncUpdate(userId: string, dto: SyncRecurrenceDto): Promise<{
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string | null;
        amount: number;
        subCategoryId: string | null;
        isActive: boolean;
        chargeDate: number;
        startDate: Date;
        endDate: Date | null;
        accountId: string;
    }>;
    remove(dto: RemoveRecurrenceRequestDto): Promise<void>;
}
