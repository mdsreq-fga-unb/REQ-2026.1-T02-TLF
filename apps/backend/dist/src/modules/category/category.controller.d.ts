import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReclassifyCategoryDto } from './dto/reclassify-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    update(userId: string, id: string, dto: UpdateCategoryDto): Promise<{
        name: string;
        id: string;
        icon: string;
        color: string;
    }>;
    remove(userId: string, id: string, dto: ReclassifyCategoryDto): Promise<{
        message: string;
    }>;
}
