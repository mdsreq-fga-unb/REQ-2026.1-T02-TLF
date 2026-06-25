import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
export declare class BudgetController {
    private readonly budgetService;
    constructor(budgetService: BudgetService);
    create(dto: CreateBudgetDto, userId: string): Promise<{
        id: string;
        name: string;
        amountLimit: number;
        month: number;
        year: number;
        categoryId: string;
        userId?: string;
        category?: {
            id: string;
            name: string;
            color: string;
            icon: string;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        spentValue: number;
        remainingValue: number;
        spentPercentage: number;
    }>;
    findAll(userId: string): Promise<({
        id: string;
        name: string;
        amountLimit: number;
        month: number;
        year: number;
        categoryId: string;
        userId?: string;
        category?: {
            id: string;
            name: string;
            color: string;
            icon: string;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        spentValue: number;
        remainingValue: number;
        spentPercentage: number;
    })[]>;
    findByCategory(categoryId: string, userId: string): Promise<({
        id: string;
        name: string;
        amountLimit: number;
        month: number;
        year: number;
        categoryId: string;
        userId?: string;
        category?: {
            id: string;
            name: string;
            color: string;
            icon: string;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        spentValue: number;
        remainingValue: number;
        spentPercentage: number;
    })[]>;
    findOne(id: string, userId: string): Promise<{
        id: string;
        name: string;
        amountLimit: number;
        month: number;
        year: number;
        categoryId: string;
        userId?: string;
        category?: {
            id: string;
            name: string;
            color: string;
            icon: string;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        spentValue: number;
        remainingValue: number;
        spentPercentage: number;
    }>;
    update(id: string, dto: UpdateBudgetDto, userId: string): Promise<{
        id: string;
        name: string;
        amountLimit: number;
        month: number;
        year: number;
        categoryId: string;
        userId?: string;
        category?: {
            id: string;
            name: string;
            color: string;
            icon: string;
        } | null;
        createdAt: Date;
        updatedAt: Date;
    } & {
        spentValue: number;
        remainingValue: number;
        spentPercentage: number;
    }>;
    remove(id: string, userId: string): Promise<void>;
}
