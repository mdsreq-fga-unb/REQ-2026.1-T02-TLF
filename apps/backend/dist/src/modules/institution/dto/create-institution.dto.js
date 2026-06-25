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
exports.CreateInstitutionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInstitutionDto {
}
exports.CreateInstitutionDto = CreateInstitutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nubank' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#8A05BE', description: 'Cor em hexadecimal' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^#([A-Fa-f0-9]{6})$/, { message: 'Cor deve ser um hexadecimal válido ex: #8A05BE' }),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'landmark', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateInstitutionDto.prototype, "logoUrl", void 0);
//# sourceMappingURL=create-institution.dto.js.map