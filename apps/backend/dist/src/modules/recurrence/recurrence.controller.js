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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceController = void 0;
const common_1 = require("@nestjs/common");
const recurrence_service_1 = require("./recurrence.service");
const create_recurrence_dto_1 = require("./dto/create-recurrence.dto");
const update_recurrence_dto_1 = require("./dto/update-recurrence.dto");
const auth_guard_1 = require("../auth/context/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/context/current-user.decorator");
const filter_recurrence_dto_1 = require("./dto/filter-recurrence.dto");
const recurrence_list_response_dto_1 = require("./dto/recurrence-list.response.dto");
const recurrence_detail_response_dto_1 = require("./dto/recurrence-detail.response.dto");
const delete_recurrence_dto_1 = require("./dto/delete-recurrence.dto");
let RecurrenceController = class RecurrenceController {
    constructor(recurrenceService) {
        this.recurrenceService = recurrenceService;
    }
    create(userId, dto) {
        return this.recurrenceService.create(userId, dto);
    }
    findAll(userId, query) {
        return this.recurrenceService.findAll(userId, query);
    }
    findOne(userId, id) {
        return this.recurrenceService.findOne(userId, id);
    }
    update(userId, id, dto) {
        return this.recurrenceService.update(userId, id, dto);
    }
    remove(userId, id, query) {
        return this.recurrenceService.remove(userId, id, query);
    }
};
exports.RecurrenceController = RecurrenceController;
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        type: recurrence_detail_response_dto_1.RecurrenceDetailResponseDto,
        description: 'Recorrência criada com sucesso',
    }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_recurrence_dto_1.CreateRecurrenceDto]),
    __metadata("design:returntype", void 0)
], RecurrenceController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: recurrence_list_response_dto_1.RecurrenceListResponseDto,
        description: 'Lista de recorrências retornada com sucesso',
    }),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_recurrence_dto_1.FilterRecurrenceDto]),
    __metadata("design:returntype", void 0)
], RecurrenceController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: recurrence_detail_response_dto_1.RecurrenceDetailResponseDto,
        description: 'Recorrência encontrada',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Recorrência não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], RecurrenceController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: recurrence_detail_response_dto_1.RecurrenceDetailResponseDto,
        description: 'Recorrência atualizada com sucesso',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Recorrência não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_recurrence_dto_1.UpdateRecurrenceDto]),
    __metadata("design:returntype", void 0)
], RecurrenceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: recurrence_detail_response_dto_1.RecurrenceDetailResponseDto,
        description: 'Recorrência removida com sucesso',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Recorrência não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Acesso negado' }),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, delete_recurrence_dto_1.DeleteRecurrenceDto]),
    __metadata("design:returntype", void 0)
], RecurrenceController.prototype, "remove", null);
exports.RecurrenceController = RecurrenceController = __decorate([
    (0, swagger_1.ApiBearerAuth)('supabase-jwt'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)('recurrence'),
    (0, common_1.Controller)('recurrences'),
    __metadata("design:paramtypes", [recurrence_service_1.RecurrenceService])
], RecurrenceController);
//# sourceMappingURL=recurrence.controller.js.map