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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const seed_1 = require("../../../prisma/seed");
let AuthService = class AuthService {
    constructor(supabase, prisma, seed) {
        this.supabase = supabase;
        this.prisma = prisma;
        this.seed = seed;
    }
    async register(dto) {
        const { name, email, password } = dto;
        const { data, error } = await this.supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            password,
        });
        if (error) {
            console.error(error.message);
            throw new common_1.BadRequestException(error.message);
        }
        try {
            const user = await this.prisma.user.create({
                data: {
                    id: data.user.id,
                    email,
                    name,
                    createdAt: new Date(data.user.created_at),
                },
            });
            await this.seed.seedDefaultCategories(user.id);
            return { userId: user.id };
        }
        catch (error) {
            await this.supabase.auth.admin.deleteUser(data.user.id);
            console.error(error.message);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async login(dto) {
        const { email, password } = dto;
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error(error.message);
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: data.user.id,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        const accessToken = data.session?.access_token;
        const refreshToken = data.session?.refresh_token;
        if (!accessToken || !refreshToken) {
            throw new common_1.BadRequestException('Sessão retornada pelo provedor está incompleta');
        }
        return {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken,
            refreshToken,
        };
    }
    async logout(accessToken) {
        const { error } = await this.supabase.auth.admin.signOut(accessToken);
        if (error) {
            console.error(error.message);
            throw new common_1.BadRequestException(error.message);
        }
        return { success: true };
    }
    async refreshToken(dto) {
        const { refreshToken: currentRefreshToken } = dto;
        const { data, error } = await this.supabase.auth.refreshSession({
            refresh_token: currentRefreshToken,
        });
        if (error) {
            console.error(error.message);
            throw new common_1.UnauthorizedException('Token de refresh inválido');
        }
        const accessToken = data.session?.access_token;
        const refreshToken = data.session?.refresh_token;
        if (!accessToken || !refreshToken) {
            throw new common_1.BadRequestException('Invalid refresh token');
        }
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        prisma_service_1.PrismaService,
        seed_1.SeedService])
], AuthService);
//# sourceMappingURL=auth.service.js.map