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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/context/auth.guard");
const current_user_decorator_1 = require("../auth/context/current-user.decorator");
const get_dto_1 = require("./dto/get.dto");
const delete_dto_1 = require("./dto/delete.dto");
const update_dto_1 = require("./dto/update.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUser(userId) {
        return await this.userService.getUser({ userId });
    }
    async deleteUser(userId) {
        return await this.userService.deleteUser({ userId });
    }
    async updateUser(userId, updateUserDto) {
        return await this.userService.updateUser({ userId, ...updateUserDto });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter perfil do usuário',
        description: 'Retorna os dados do usuário autenticado.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: get_dto_1.GetUserResponseDto, description: 'Dados do usuário' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuário não encontrado na base local' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Deletar conta',
        description: 'Remove permanentemente o usuário e todos os seus dados (categorias, instituições, orçamentos). Invalida a conta no provedor de autenticação.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: delete_dto_1.DeleteUserResponseDto, description: 'Conta removida' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuário não encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Falha ao remover do provedor de autenticação' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar perfil',
        description: 'Atualiza nome, e-mail e/ou senha do usuário. Pelo menos um campo deve ser enviado. Credenciais (e-mail e senha) são atualizadas no provedor de autenticação; nome e e-mail são sincronizados na base local.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: update_dto_1.UpdateUserResponseDto, description: 'Perfil atualizado' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Usuário não encontrado' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Nenhum campo fornecido, dados inválidos ou falha ao atualizar no provedor de autenticação',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateUserRequestDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)('supabase-jwt'),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token não fornecido, inválido ou expirado' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map