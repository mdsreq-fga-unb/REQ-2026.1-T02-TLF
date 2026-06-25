import { PrismaService } from '@common/prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { FindManyBudgetsDto } from './dto/find-many.dto';
import { RemoveBudgetRequestDto } from './dto/remove.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { SyncBudgetDto } from './dto/sync-budget.dto';
type BudgetCategory = {
    id: string;
    name: string;
    color: string;
    icon: string;
};
type BudgetBase = {
    id: string;
    name: string;
    amountLimit: number;
    month: number;
    year: number;
    categoryId: string;
    userId?: string;
    category?: BudgetCategory | null;
    createdAt: Date;
    updatedAt: Date;
};
type BudgetSummary = {
    spentValue: number;
    remainingValue: number;
    spentPercentage: number;
};
type BudgetWithSummary = BudgetBase & BudgetSummary;
export declare class BudgetService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private getBudgetPeriod;
    private getBudgetSpentValue;
    private normalizeBudget;
    private attachBudgetSummary;
    private attachBudgetsSummary;
    findMany(dto: FindManyBudgetsDto): Promise<(BudgetBase & BudgetSummary)[]>;
    create(userId: string, dto: CreateBudgetDto): Promise<BudgetWithSummary>;
    findAll(userId: string): Promise<(BudgetBase & BudgetSummary)[]>;
    findOne(userId: string, id: string): Promise<BudgetWithSummary>;
    findByCategory(userId: string, categoryId: string): Promise<(BudgetBase & BudgetSummary)[]>;
    update(userId: string, id: string, dto: UpdateBudgetDto): Promise<BudgetWithSummary>;
    syncCreate(userId: string, dto: SyncBudgetDto): Promise<BudgetWithSummary>;
    syncUpdate(userId: string, dto: SyncBudgetDto): Promise<BudgetWithSummary>;
    remove(dto: RemoveBudgetRequestDto): Promise<void>;
}
export {};
