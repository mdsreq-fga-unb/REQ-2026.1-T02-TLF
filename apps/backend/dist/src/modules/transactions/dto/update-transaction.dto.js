"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_transaction_dto_1 = require("./create-transaction.dto");
class UpdateTransactionDto extends (0, mapped_types_1.PartialType)(create_transaction_dto_1.CreateTransactionDto) {
}
exports.UpdateTransactionDto = UpdateTransactionDto;
//# sourceMappingURL=update-transaction.dto.js.map