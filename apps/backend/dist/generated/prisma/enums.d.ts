export declare const AccountType: {
    readonly CHECKING: "CHECKING";
    readonly SAVINGS: "SAVINGS";
    readonly CREDIT_CARD: "CREDIT_CARD";
    readonly CASH: "CASH";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const Currency: {
    readonly BRL: "BRL";
};
export type Currency = (typeof Currency)[keyof typeof Currency];
export declare const InvoiceStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
};
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];
export declare const InvoicePaymentStatus: {
    readonly NOT_PAID: "NOT_PAID";
    readonly PARTIALLY_PAID: "PARTIALLY_PAID";
    readonly PAID: "PAID";
};
export type InvoicePaymentStatus = (typeof InvoicePaymentStatus)[keyof typeof InvoicePaymentStatus];
export declare const TransactionType: {
    readonly EXPENSE: "EXPENSE";
    readonly INCOME: "INCOME";
    readonly TRANSFER: "TRANSFER";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const NotificationType: {
    readonly BUDGET_WARNING: "BUDGET_WARNING";
    readonly BUDGET_EXCEEDED: "BUDGET_EXCEEDED";
    readonly RECURRENCE_DUE_WARNING: "RECURRENCE_DUE_WARNING";
    readonly RECURRENCE_DUE: "RECURRENCE_DUE";
    readonly INVOICE_CLOSING_WARNING: "INVOICE_CLOSING_WARNING";
    readonly INVOICE_CLOSING: "INVOICE_CLOSING";
    readonly INVOICE_DUE_WARNING: "INVOICE_DUE_WARNING";
    readonly INVOICE_DUE: "INVOICE_DUE";
    readonly INVOICE_OVERDUE: "INVOICE_OVERDUE";
    readonly INVOICE_PAID: "INVOICE_PAID";
    readonly INVOICE_PARTIALLY_PAID: "INVOICE_PARTIALLY_PAID";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const TableName: {
    readonly CATEGORIES: "CATEGORIES";
    readonly SUB_CATEGORIES: "SUB_CATEGORIES";
    readonly INSTITUTIONS: "INSTITUTIONS";
    readonly BUDGETS: "BUDGETS";
    readonly ACCOUNTS: "ACCOUNTS";
    readonly INVOICES: "INVOICES";
    readonly RECURRENCES: "RECURRENCES";
    readonly TRANSACTIONS: "TRANSACTIONS";
    readonly NOTIFICATIONS: "NOTIFICATIONS";
};
export type TableName = (typeof TableName)[keyof typeof TableName];
