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
exports.PushResponseDto = exports.PushRequestDto = exports.PushBodyDto = exports.PushQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PushQueryDto {
}
exports.PushQueryDto = PushQueryDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PushQueryDto.prototype, "lastUpdatedAt", void 0);
class PushBodyDto {
}
exports.PushBodyDto = PushBodyDto;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], PushBodyDto.prototype, "changes", void 0);
class PushRequestDto {
}
exports.PushRequestDto = PushRequestDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PushRequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PushRequestDto.prototype, "lastUpdatedAt", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Object),
    __metadata("design:type", Object)
], PushRequestDto.prototype, "changes", void 0);
class PushResponseDto {
}
exports.PushResponseDto = PushResponseDto;
//# sourceMappingURL=push.js.map