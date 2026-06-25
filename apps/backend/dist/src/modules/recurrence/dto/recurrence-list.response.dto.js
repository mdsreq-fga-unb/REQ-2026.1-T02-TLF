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
exports.RecurrenceListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RecurrenceListResponseDto {
}
exports.RecurrenceListResponseDto = RecurrenceListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            {
                id: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
                description: 'Assinatura Netflix',
                amount: 2990,
                chargeDate: 10,
                startDate: '2026-01-01T00:00:00.000Z',
                endDate: null,
                isActive: true,
                category: {
                    id: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
                    name: 'Assinaturas',
                },
                account: {
                    id: '077e482b-dfd9-48cb-9b79-15a3c25a83a5',
                    name: 'Nubank',
                },
            },
        ],
        description: 'Lista de recorrências',
    }),
    __metadata("design:type", Array)
], RecurrenceListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            total: 50,
            page: 1,
            limit: 20,
            totalPages: 3,
        },
        description: 'Metadados de paginação',
    }),
    __metadata("design:type", Object)
], RecurrenceListResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=recurrence-list.response.dto.js.map