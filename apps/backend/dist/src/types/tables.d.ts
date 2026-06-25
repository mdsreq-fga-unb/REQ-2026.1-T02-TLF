import { SyncAccountDto } from '@modules/accounts/dto/sync-account.dto';
import { SyncBudgetDto } from '@modules/budget/dto/sync-budget.dto';
import { SyncCategoryDto } from '@modules/categories/dto/sync-category.dto';
import { SyncInstitutionDto } from '@modules/institutions/dto/sync-institution.dto';
import { SyncInvoiceDto } from '@modules/invoices/dto/sync-invoice.dto';
import { SyncNotificationDto } from '@modules/notifications/dto/sync-notification.dto';
import { SyncRecurrenceDto } from '@modules/recurrences/dto/sync-recurrence.dto';
import { SyncSubCategoryDto } from '@modules/sub-categories/dto/sync-sub-category.dto';
import { SyncTransactionDto } from '@modules/transactions/dto/sync-transaction.dto';
export type TableChangeSet<T> = {
    created: T[];
    updated: T[];
    deleted: string[];
};
export type PushChanges = {
    categories?: TableChangeSet<SyncCategoryDto>;
    sub_categories?: TableChangeSet<SyncSubCategoryDto>;
    institutions?: TableChangeSet<SyncInstitutionDto>;
    budgets?: TableChangeSet<SyncBudgetDto>;
    accounts?: TableChangeSet<SyncAccountDto>;
    invoices?: TableChangeSet<SyncInvoiceDto>;
    recurrences?: TableChangeSet<SyncRecurrenceDto>;
    transactions?: TableChangeSet<SyncTransactionDto>;
    notifications?: TableChangeSet<SyncNotificationDto>;
};
export type PullChanges = {
    categories?: TableChangeSet<Record<string, unknown>>;
    sub_categories?: TableChangeSet<Record<string, unknown>>;
    institutions?: TableChangeSet<Record<string, unknown>>;
    budgets?: TableChangeSet<Record<string, unknown>>;
    accounts?: TableChangeSet<Record<string, unknown>>;
    invoices?: TableChangeSet<Record<string, unknown>>;
    recurrences?: TableChangeSet<Record<string, unknown>>;
    transactions?: TableChangeSet<Record<string, unknown>>;
    notifications?: TableChangeSet<Record<string, unknown>>;
};
