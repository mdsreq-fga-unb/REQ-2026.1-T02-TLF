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
exports.DeleteRecurrenceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const recurrence_delete_scope_enum_1 = require("../enums/recurrence-delete-scope.enum");
class DeleteRecurrenceDto {
}
exports.DeleteRecurrenceDto = DeleteRecurrenceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: recurrence_delete_scope_enum_1.RecurrenceDeleteScope,
        enumName: 'RecurrenceDeleteScope',
        example: recurrence_delete_scope_enum_1.RecurrenceDeleteScope.THIS,
        default: recurrence_delete_scope_enum_1.RecurrenceDeleteScope.THIS,
        description: 'Define o escopo da exclusão da recorrência: THIS remove apenas esta ocorrência, FUTURE remove esta e as próximas, ALL remove todas as ocorrências e histórico gerado.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(recurrence_delete_scope_enum_1.RecurrenceDeleteScope),
    __metadata("design:type", String)
], DeleteRecurrenceDto.prototype, "scope", void 0);
//# sourceMappingURL=delete-recurrence.dto.js.map