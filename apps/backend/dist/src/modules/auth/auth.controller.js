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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const common_1 = require("@nestjs/common");
const login_dto_1 = require("./dto/login.dto");
const logout_dto_1 = require("./dto/logout.dto");
const refresh_dto_1 = require("./dto/refresh.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("./context/auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        const { userId } = await this.authService.register(registerDto);
        const { user, accessToken, refreshToken } = await this.authService.login({
            email: registerDto.email,
            password: registerDto.password,
        });
        if (user.id !== userId) {
            throw new common_1.InternalServerErrorException('Sessão inconsistente após o cadastro');
        }
        return { user, accessToken, refreshToken };
    }
    async login(loginDto) {
        return await this.authService.login(loginDto);
    }
    async logout(req) {
        return await this.authService.logout(req.accessToken);
    }
    async refresh(refreshDto) {
        return await this.authService.refreshToken(refreshDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar usuário',
        description: 'Cria conta no provedor, persiste usuário local, semeia categorias padrão e abre sessão (mesmo contrato que login: usuário + tokens).',
    }),
    (0, swagger_1.ApiCreatedResponse)({ type: register_dto_1.RegisterResponseDto, description: 'Usuário criado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Dados inválidos ou e-mail já em uso no provedor' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Login',
        description: 'Autentica por e-mail e senha. Retorna o perfil do usuário (para dispositivos sem cache local) e os tokens de acesso.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: login_dto_1.LoginResponseDto, description: 'Sessão criada com sucesso' }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Credenciais inválidas ou usuário não encontrado na base local',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)('supabase-jwt'),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout',
        description: 'Encerra a sessão usando o mesmo access JWT enviado em `Authorization: Bearer <token>` (Swagger: Authorize).',
    }),
    (0, swagger_1.ApiOkResponse)({ type: logout_dto_1.LogoutResponseDto, description: 'Logout efetuado' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Token não enviado, inválido ou expirado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Falha ao encerrar sessão no provedor' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({
        summary: 'Renovar sessão',
        description: 'Troca o refresh token (body) por um novo par de access e refresh tokens.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: refresh_dto_1.RefreshResponseDto, description: 'Nova sessão emitida' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Refresh token inválido ou expirado' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Payload de sessão incompleta após o refresh' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_dto_1.RefreshRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map