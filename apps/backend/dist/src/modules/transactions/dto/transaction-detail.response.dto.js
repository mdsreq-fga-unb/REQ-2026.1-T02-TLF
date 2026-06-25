"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TransactionDetailResponseDto {
}
exports.TransactionDetailResponseDto = TransactionDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
    }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EXPENSE' }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    __metadata("design:type", Number)
], TransactionDetailResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Almoço', required: false }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-02T00:00:00.000Z' }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'COMPLETED', required: false }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5b6d0359-79e2-4e67-9d6f-81bc96e76095', required: false }),
    __metadata("design:type", String)
], TransactionDetailResponseDto.prototype, "destinationInstitutionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
            name: 'Alimentação',
        },
    }),
    __metadata("design:type", Object)
], TransactionDetailResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a55d44df-6f3b-480d-9db4-388235e931bc',
            name: 'Restaurante',
        },
        required: false,
    }),
    __metadata("design:type", Object)
], TransactionDetailResponseDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
            name: 'Nubank',
        },
    }),
    __metadata("design:type", Object)
], TransactionDetailResponseDto.prototype, "institution", void 0);
//# sourceMappingURL=transaction-detail.response.dto.js.map