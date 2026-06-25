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
exports.GetUserResponseDto = exports.UserProfileDto = exports.GetUserRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetUserRequestDto {
}
exports.GetUserRequestDto = GetUserRequestDto;
class UserProfileDto {
}
exports.UserProfileDto = UserProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11111111-1111-1111-1111-111111111111' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], UserProfileDto.prototype, "name", void 0);
class GetUserResponseDto {
}
exports.GetUserResponseDto = GetUserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserProfileDto }),
    __metadata("design:type", UserProfileDto)
], GetUserResponseDto.prototype, "user", void 0);
//# sourceMappingURL=get.dto.js.map