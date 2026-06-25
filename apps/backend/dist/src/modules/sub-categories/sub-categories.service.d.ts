import { PrismaService } from '@common/prisma/prisma.service';
import { FindManySubCategoriesDto } from './dto/find-many.dto';
import { RemoveSubCategoryRequestDto } from './dto/remove.dto';
import { SyncSubCategoryDto } from './dto/sync-sub-category.dto';
export declare class SubCategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findMany(dto: FindManySubCategoriesDto): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        name: string;
        id: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }[]>;
    private assertCategoryOwnership;
    syncCreate(userId: string, dto: SyncSubCategoryDto): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    syncUpdate(userId: string, dto: SyncSubCategoryDto): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
    }>;
    remove(dto: RemoveSubCategoryRequestDto): Promise<void>;
}
