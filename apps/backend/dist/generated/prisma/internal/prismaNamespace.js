"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.NullsOrder = exports.QueryMode = exports.SortOrder = exports.DeletedRecordScalarFieldEnum = exports.NotificationScalarFieldEnum = exports.TransactionScalarFieldEnum = exports.RecurrenceScalarFieldEnum = exports.InvoiceScalarFieldEnum = exports.AccountScalarFieldEnum = exports.BudgetScalarFieldEnum = exports.InstitutionScalarFieldEnum = exports.SubCategoryScalarFieldEnum = exports.CategoryScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = require("@prisma/client/runtime/client");
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Category: 'Category',
    SubCategory: 'SubCategory',
    Institution: 'Institution',
    Budget: 'Budget',
    Account: 'Account',
    Invoice: 'Invoice',
    Recurrence: 'Recurrence',
    Transaction: 'Transaction',
    Notification: 'Notification',
    DeletedRecord: 'DeletedRecord'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.CategoryScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    icon: 'icon',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SubCategoryScalarFieldEnum = {
    id: 'id',
    categoryId: 'categoryId',
    name: 'name',
    icon: 'icon',
    color: 'color',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.InstitutionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    name: 'name',
    color: 'color',
    icon: 'icon',
    logoUrl: 'logoUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BudgetScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    categoryId: 'categoryId',
    name: 'name',
    amountLimit: 'amountLimit',
    month: 'month',
    year: 'year',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.AccountScalarFieldEnum = {
    id: 'id',
    institutionId: 'institutionId',
    name: 'name',
    type: 'type',
    balance: 'balance',
    closingDay: 'closingDay',
    dueDay: 'dueDay',
    creditLimit: 'creditLimit',
    currency: 'currency',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.InvoiceScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    status: 'status',
    paymentStatus: 'paymentStatus',
    referenceMonth: 'referenceMonth',
    referenceYear: 'referenceYear',
    totalAmount: 'totalAmount',
    paidAmount: 'paidAmount',
    closingDay: 'closingDay',
    dueDay: 'dueDay',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.RecurrenceScalarFieldEnum = {
    id: 'id',
    accountId: 'accountId',
    categoryId: 'categoryId',
    subCategoryId: 'subCategoryId',
    description: 'description',
    amount: 'amount',
    isActive: 'isActive',
    chargeDate: 'chargeDate',
    startDate: 'startDate',
    endDate: 'endDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TransactionScalarFieldEnum = {
    id: 'id',
    institutionId: 'institutionId',
    destinationInstitutionId: 'destinationInstitutionId',
    status: 'status',
    type: 'type',
    categoryId: 'categoryId',
    subCategoryId: 'subCategoryId',
    amount: 'amount',
    date: 'date',
    description: 'description',
    recurrenceId: 'recurrenceId',
    invoiceId: 'invoiceId',
    installmentReference: 'installmentReference',
    installmentNumber: 'installmentNumber',
    installmentTotal: 'installmentTotal',
    receiptUrl: 'receiptUrl',
    externalId: 'externalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    description: 'description',
    isRead: 'isRead',
    primaryActionLabel: 'primaryActionLabel',
    primaryAction: 'primaryAction',
    secondaryActionLabel: 'secondaryActionLabel',
    secondaryAction: 'secondaryAction',
    icon: 'icon',
    color: 'color',
    referenceId: 'referenceId',
    referenceType: 'referenceType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.DeletedRecordScalarFieldEnum = {
    id: 'id',
    recordId: 'recordId',
    tableName: 'tableName',
    userId: 'userId',
    deletedAt: 'deletedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map