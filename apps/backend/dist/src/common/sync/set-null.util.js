"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullifyTransactionCategoryRefs = nullifyTransactionCategoryRefs;
exports.nullifyTransactionSubCategoryRefs = nullifyTransactionSubCategoryRefs;
exports.nullifyTransactionRecurrenceRefs = nullifyTransactionRecurrenceRefs;
exports.nullifyTransactionInvoiceRefs = nullifyTransactionInvoiceRefs;
exports.nullifyTransactionDestinationInstitutionRefs = nullifyTransactionDestinationInstitutionRefs;
exports.nullifyRecurrenceCategoryRefs = nullifyRecurrenceCategoryRefs;
exports.nullifyRecurrenceSubCategoryRefs = nullifyRecurrenceSubCategoryRefs;
const now = () => new Date();
async function nullifyTransactionCategoryRefs(tx, categoryId) {
    await tx.transaction.updateMany({
        where: { categoryId },
        data: { categoryId: null, updatedAt: now() },
    });
}
async function nullifyTransactionSubCategoryRefs(tx, subCategoryId) {
    await tx.transaction.updateMany({
        where: { subCategoryId },
        data: { subCategoryId: null, updatedAt: now() },
    });
}
async function nullifyTransactionRecurrenceRefs(tx, recurrenceId) {
    await tx.transaction.updateMany({
        where: { recurrenceId },
        data: { recurrenceId: null, updatedAt: now() },
    });
}
async function nullifyTransactionInvoiceRefs(tx, invoiceId) {
    await tx.transaction.updateMany({
        where: { invoiceId },
        data: { invoiceId: null, updatedAt: now() },
    });
}
async function nullifyTransactionDestinationInstitutionRefs(tx, institutionId) {
    await tx.transaction.updateMany({
        where: { destinationInstitutionId: institutionId },
        data: { destinationInstitutionId: null, updatedAt: now() },
    });
}
async function nullifyRecurrenceCategoryRefs(tx, categoryId) {
    await tx.recurrence.updateMany({
        where: { categoryId },
        data: { categoryId: null, updatedAt: now() },
    });
}
async function nullifyRecurrenceSubCategoryRefs(tx, subCategoryId) {
    await tx.recurrence.updateMany({
        where: { subCategoryId },
        data: { subCategoryId: null, updatedAt: now() },
    });
}
//# sourceMappingURL=set-null.util.js.map