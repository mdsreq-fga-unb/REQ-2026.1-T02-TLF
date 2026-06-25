import { PrismaService } from '@common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private checkDuplicateName;
    private reclassify;
    create(userId: string, dto: CreateCategoryDto): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
    }>;
    findAll(userId: string): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
    }>;
    update(userId: string, id: string, dto: UpdateCategoryDto, newCategoryId?: string): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
    }>;
    remove(userId: string, id: string, newCategoryId?: string): Promise<{
        message: string;
    }>;
}
