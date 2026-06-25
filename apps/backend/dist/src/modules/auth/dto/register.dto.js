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
exports.RegisterResponseDto = exports.RegisterServiceResponseDto = exports.RegisterRequestDto = void 0;
const auth_user_dto_1 = require("./auth-user.dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RegisterRequestDto {
}
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do usuário',
        example: 'John Doe',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Length)(3, 100),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email do usuário',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Length)(5, 255),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Senha do usuário deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número',
        example: 'Password123',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    }, {
        message: 'A senha deve ter no mínimo 8 caracteres, com pelo menos 1 letra maiúscula, 1 letra minúscula e 1 número.',
    }),
    (0, class_validator_1.Length)(8, 100),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "password", void 0);
class RegisterServiceResponseDto {
}
exports.RegisterServiceResponseDto = RegisterServiceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID do usuário',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], RegisterServiceResponseDto.prototype, "userId", void 0);
class RegisterResponseDto {
}
exports.RegisterResponseDto = RegisterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mesmo payload de usuário do login, obtido ao abrir sessão após o cadastro.',
        type: auth_user_dto_1.AuthUserDto,
    }),
    __metadata("design:type", auth_user_dto_1.AuthUserDto)
], RegisterResponseDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de acesso',
        example: '1234567890',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de atualização',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=register.dto.js.map