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
exports.CreateRecurrenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateRecurrenceDto {
}
exports.CreateRecurrenceDto = CreateRecurrenceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
        description: 'ID da conta bancária associada à recorrência',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "accountId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
        description: 'ID da categoria principal da recorrência',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'a55d44df-6f3b-480d-9db4-388235e931bc',
        description: 'ID da subcategoria (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "subCategoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Assinatura Netflix',
        description: 'Descrição da recorrência financeira',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2990,
        description: 'Valor da recorrência em centavos (ex: R$ 29,90 = 2990)',
        minimum: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRecurrenceDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10,
        description: 'Dia do mês em que a recorrência será cobrada (1 a 31)',
        minimum: 1,
        maximum: 31,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(31),
    __metadata("design:type", Number)
], CreateRecurrenceDto.prototype, "chargeDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-01-01T00:00:00.000Z',
        description: 'Data de início da recorrência (ISO 8601)',
    }),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-12-31T00:00:00.000Z',
        description: 'Data de término da recorrência (opcional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateRecurrenceDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Indica se a recorrência está ativa',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRecurrenceDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-recurrence.dto.js.map