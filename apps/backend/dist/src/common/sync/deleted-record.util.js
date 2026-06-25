"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeletedRecords = createDeletedRecords;
async function createDeletedRecords(dto) {
    const { tx, userId, tableName, recordIds } = dto;
    if (recordIds.length === 0)
        return;
    await tx.deletedRecord.createMany({
        data: recordIds.map((recordId) => ({
            recordId,
            tableName,
            userId,
            deletedAt: new Date(),
        })),
    });
}
//# sourceMappingURL=deleted-record.util.js.map