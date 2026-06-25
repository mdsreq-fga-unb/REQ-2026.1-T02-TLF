"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTimestampWhere = buildTimestampWhere;
function buildTimestampWhere(filter) {
    const { createdAfter, updatedAfter } = filter;
    if (createdAfter && updatedAfter) {
        return {
            OR: [{ createdAt: { gt: createdAfter } }, { updatedAt: { gt: updatedAfter } }],
        };
    }
    if (createdAfter)
        return { createdAt: { gt: createdAfter } };
    if (updatedAfter)
        return { updatedAt: { gt: updatedAfter } };
    return {};
}
//# sourceMappingURL=sync-query.util.js.map