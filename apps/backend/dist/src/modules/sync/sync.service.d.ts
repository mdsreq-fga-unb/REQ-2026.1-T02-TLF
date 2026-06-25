import { PrismaService } from '@common/prisma/prisma.service';
import { AccountsService } from '../accounts/accounts.service';
import { BudgetService } from '../budget/budget.service';
import { CategoriesService } from '../categories/categories.service';
import { InstitutionsService } from '../institutions/institutions.service';
import { InvoiceService } from '../invoices/invoice.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RecurrencesService } from '../recurrences/recurrences.service';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PullRequestDto, PullResponseDto } from './dto/pull';
import { PushRequestDto, PushResponseDto } from './dto/push';
export declare class SyncService {
    private readonly prisma;
    private readonly categoriesService;
    private readonly subCategoriesService;
    private readonly institutionsService;
    private readonly budgetService;
    private readonly accountsService;
    private readonly invoiceService;
    private readonly recurrencesService;
    private readonly transactionsService;
    private readonly notificationsService;
    constructor(prisma: PrismaService, categoriesService: CategoriesService, subCategoriesService: SubCategoriesService, institutionsService: InstitutionsService, budgetService: BudgetService, accountsService: AccountsService, invoiceService: InvoiceService, recurrencesService: RecurrencesService, transactionsService: TransactionsService, notificationsService: NotificationsService);
    pull(dto: PullRequestDto): Promise<PullResponseDto>;
    push(dto: PushRequestDto): Promise<PushResponseDto>;
    private applyTableChanges;
}
