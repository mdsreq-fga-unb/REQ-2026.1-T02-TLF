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
exports.UpdateUserResponseDto = exports.UpdateUserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UpdateUserRequestDto {
}
exports.UpdateUserRequestDto = UpdateUserRequestDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo nome do usuário',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo e-mail do usuário',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Length)(5, 255),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nova senha — deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número',
        example: 'NewPassword123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsStrongPassword)({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }, {
        message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
    }),
    (0, class_validator_1.Length)(8, 100),
    __metadata("design:type", String)
], UpdateUserRequestDto.prototype, "password", void 0);
class UpdateUserResponseDto {
}
exports.UpdateUserResponseDto = UpdateUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UpdateUserResponseDto.prototype, "success", void 0);
//# sourceMappingURL=update.dto.js.map