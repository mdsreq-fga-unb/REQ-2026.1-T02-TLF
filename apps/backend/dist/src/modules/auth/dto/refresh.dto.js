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
exports.RefreshResponseDto = exports.RefreshRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RefreshRequestDto {
}
exports.RefreshRequestDto = RefreshRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Refresh token',
        example: '1234567890',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.Length)(10, 255),
    __metadata("design:type", String)
], RefreshRequestDto.prototype, "refreshToken", void 0);
class RefreshResponseDto {
}
exports.RefreshResponseDto = RefreshResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Access token',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], RefreshResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Refresh token',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], RefreshResponseDto.prototype, "refreshToken", void 0);
//# sourceMappingURL=refresh.dto.js.map