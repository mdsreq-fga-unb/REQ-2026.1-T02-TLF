"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableName = exports.NotificationType = exports.TransactionStatus = exports.TransactionType = exports.InvoicePaymentStatus = exports.InvoiceStatus = exports.Currency = exports.AccountType = void 0;
exports.AccountType = {
    CHECKING: 'CHECKING',
    SAVINGS: 'SAVINGS',
    CREDIT_CARD: 'CREDIT_CARD',
    CASH: 'CASH'
};
exports.Currency = {
    BRL: 'BRL'
};
exports.InvoiceStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
};
exports.InvoicePaymentStatus = {
    NOT_PAID: 'NOT_PAID',
    PARTIALLY_PAID: 'PARTIALLY_PAID',
    PAID: 'PAID'
};
exports.TransactionType = {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME',
    TRANSFER: 'TRANSFER'
};
exports.TransactionStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
exports.NotificationType = {
    BUDGET_WARNING: 'BUDGET_WARNING',
    BUDGET_EXCEEDED: 'BUDGET_EXCEEDED',
    RECURRENCE_DUE_WARNING: 'RECURRENCE_DUE_WARNING',
    RECURRENCE_DUE: 'RECURRENCE_DUE',
    INVOICE_CLOSING_WARNING: 'INVOICE_CLOSING_WARNING',
    INVOICE_CLOSING: 'INVOICE_CLOSING',
    INVOICE_DUE_WARNING: 'INVOICE_DUE_WARNING',
    INVOICE_DUE: 'INVOICE_DUE',
    INVOICE_OVERDUE: 'INVOICE_OVERDUE',
    INVOICE_PAID: 'INVOICE_PAID',
    INVOICE_PARTIALLY_PAID: 'INVOICE_PARTIALLY_PAID'
};
exports.TableName = {
    CATEGORIES: 'CATEGORIES',
    SUB_CATEGORIES: 'SUB_CATEGORIES',
    INSTITUTIONS: 'INSTITUTIONS',
    BUDGETS: 'BUDGETS',
    ACCOUNTS: 'ACCOUNTS',
    INVOICES: 'INVOICES',
    RECURRENCES: 'RECURRENCES',
    TRANSACTIONS: 'TRANSACTIONS',
    NOTIFICATIONS: 'NOTIFICATIONS'
};
//# sourceMappingURL=enums.js.map