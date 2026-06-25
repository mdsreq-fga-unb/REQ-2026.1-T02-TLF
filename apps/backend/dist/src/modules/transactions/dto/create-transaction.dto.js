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
exports.CreateTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("../../../../generated/prisma/client");
class CreateTransactionDto {
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'd4f7a1b8-4dc8-49d2-8d37-5f5de0f5d0a1',
        description: 'ID da transação. Quando informado, é reutilizado no cadastro local e no servidor.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
        description: 'ID da instituição',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "institutionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
        description: 'ID da categoria da transação',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'a55d44df-6f3b-480d-9db4-388235e931bc',
        description: 'ID da subcategoria da transação',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "subCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.TransactionType,
        example: client_1.TransactionType.EXPENSE,
        description: 'Tipos válidos da transação',
    }),
    (0, class_validator_1.IsEnum)(client_1.TransactionType),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5000,
        minimum: 1,
        description: 'Valor monetário da transação em centavos (ex: R$ 50,00 = 5000)',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Almoço',
        description: 'Descrição opcional da transação por parte do usuário',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-05-02T00:00:00.000Z',
        description: 'Data da transação no formato ISO 8601',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.TransactionStatus,
        example: client_1.TransactionStatus.COMPLETED,
        description: 'Estados possíveis da transação',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.TransactionStatus),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
        description: 'ID da fatura associada',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "invoiceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '64021cd7-e3a1-458f-b8df-e8e2b92e8747',
        description: 'ID da assinatura',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "recurrenceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '5b6d0359-79e2-4e67-9d6f-81bc96e76095',
        description: 'ID da instituição destinatária da transação',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "destinationInstitutionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'Número da parcela atual',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "installmentNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 12,
        description: 'Total de parcelas',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "installmentTotal", void 0);
//# sourceMappingURL=create-transaction.dto.js.map