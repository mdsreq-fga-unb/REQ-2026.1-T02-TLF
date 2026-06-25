import { PrismaService } from '@common/prisma/prisma.service';
import { FindManyCategoriesDto } from './dto/find-many.dto';
import { RemoveCategoryRequestDto } from './dto/remove.dto';
import { SyncCategoryDto } from './dto/sync-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManyCategoriesDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        name: string;
        id: string;
        userId: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    syncCreate(userId: string, dto: SyncCategoryDto): Promise<{
        name: string;
        id: string;
        userId: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    syncUpdate(userId: string, dto: SyncCategoryDto): Promise<{
        name: string;
        id: string;
        userId: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(dto: RemoveCategoryRequestDto): Promise<void>;
}
