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
exports.UpdateRecurrenceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_recurrence_dto_1 = require("./create-recurrence.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const recurrence_apply_scope_enum_1 = require("../enums/recurrence-apply-scope.enum");
class UpdateRecurrenceDto extends (0, mapped_types_1.PartialType)(create_recurrence_dto_1.CreateRecurrenceDto) {
}
exports.UpdateRecurrenceDto = UpdateRecurrenceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: recurrence_apply_scope_enum_1.RecurrenceApplyScope,
        enumName: 'RecurrenceApplyScope',
        example: recurrence_apply_scope_enum_1.RecurrenceApplyScope.THIS,
        description: 'Define o escopo da alteração: apenas esta ocorrência (THIS), todas as ocorrências (ALL) ou apenas futuras (FUTURE).',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(recurrence_apply_scope_enum_1.RecurrenceApplyScope),
    __metadata("design:type", String)
], UpdateRecurrenceDto.prototype, "applyScope", void 0);
//# sourceMappingURL=update-recurrence.dto.js.map