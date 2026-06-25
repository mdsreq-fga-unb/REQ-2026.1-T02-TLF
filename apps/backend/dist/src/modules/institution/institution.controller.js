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
exports.InstitutionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/context/auth.guard");
const current_user_decorator_1 = require("../auth/context/current-user.decorator");
const institution_service_1 = require("./institution.service");
const create_institution_dto_1 = require("./dto/create-institution.dto");
const update_institution_dto_1 = require("./dto/update-institution.dto");
let InstitutionController = class InstitutionController {
    constructor(institutionService) {
        this.institutionService = institutionService;
    }
    create(userId, dto) {
        return this.institutionService.create(userId, dto);
    }
    findAll(userId) {
        return this.institutionService.findAll(userId);
    }
    findOne(userId, id) {
        return this.institutionService.findOne(userId, id);
    }
    update(userId, id, dto) {
        return this.institutionService.update(userId, id, dto);
    }
    remove(userId, id) {
        return this.institutionService.remove(userId, id);
    }
};
exports.InstitutionController = InstitutionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar nova instituição financeira' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Instituição criada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Instituição com esse nome já existe' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_institution_dto_1.CreateInstitutionDto]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar instituições do usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de instituições' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar instituição por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da instituição' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instituição não encontrada' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar instituição' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da instituição' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição atualizada' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instituição não encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Nome já utilizado por outra instituição' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_institution_dto_1.UpdateInstitutionDto]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Remover instituição' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da instituição' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Instituição removida com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Instituição possui contas vinculadas' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Não autenticado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Instituição não encontrada' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "remove", null);
exports.InstitutionController = InstitutionController = __decorate([
    (0, swagger_1.ApiTags)('institution'),
    (0, swagger_1.ApiBearerAuth)('supabase-jwt'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('institution'),
    __metadata("design:paramtypes", [institution_service_1.InstitutionService])
], InstitutionController);
//# sourceMappingURL=institution.controller.js.map