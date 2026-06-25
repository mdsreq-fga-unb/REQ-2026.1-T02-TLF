import { PrismaService } from '@common/prisma/prisma.service';
import { AccountsService } from '@modules/accounts/accounts.service';
import { FindManyInstitutionsDto } from './dto/find-many.dto';
import { RemoveInstitutionRequestDto } from './dto/remove.dto';
import { SyncInstitutionDto } from './dto/sync-institution.dto';
export declare class InstitutionsService {
    private readonly prisma;
    private readonly accountsService;
    constructor(prisma: PrismaService, accountsService: AccountsService);
    findMany(dto: FindManyInstitutionsDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        name: string;
        id: string;
        userId: string;
        icon: string | null;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }[]>;
    syncCreate(userId: string, dto: SyncInstitutionDto): Promise<{
        name: string;
        id: string;
        userId: string;
        icon: string | null;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
    syncUpdate(userId: string, dto: SyncInstitutionDto): Promise<{
        name: string;
        id: string;
        userId: string;
        icon: string | null;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
    }>;
    remove(dto: RemoveInstitutionRequestDto): Promise<void>;
}
