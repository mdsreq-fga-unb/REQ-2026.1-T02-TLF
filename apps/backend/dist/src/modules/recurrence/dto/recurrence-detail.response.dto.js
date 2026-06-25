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
exports.RecurrenceDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecurrenceDetailResponseDto {
}
exports.RecurrenceDetailResponseDto = RecurrenceDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
    }),
    __metadata("design:type", String)
], RecurrenceDetailResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Assinatura Netflix' }),
    __metadata("design:type", String)
], RecurrenceDetailResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2990 }),
    __metadata("design:type", Number)
], RecurrenceDetailResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], RecurrenceDetailResponseDto.prototype, "chargeDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01T00:00:00.000Z' }),
    __metadata("design:type", String)
], RecurrenceDetailResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-12-31T00:00:00.000Z', required: false }),
    __metadata("design:type", String)
], RecurrenceDetailResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], RecurrenceDetailResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
            name: 'Assinaturas',
        },
        required: false,
    }),
    __metadata("design:type", Object)
], RecurrenceDetailResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: 'a55d44df-6f3b-480d-9db4-388235e931bc',
            name: 'Streaming',
        },
        required: false,
    }),
    __metadata("design:type", Object)
], RecurrenceDetailResponseDto.prototype, "subCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
            name: 'Nubank',
        },
    }),
    __metadata("design:type", Object)
], RecurrenceDetailResponseDto.prototype, "account", void 0);
//# sourceMappingURL=recurrence-detail.response.dto.js.map