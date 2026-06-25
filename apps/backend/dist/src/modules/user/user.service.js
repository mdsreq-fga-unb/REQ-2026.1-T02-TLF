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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const supabase_service_1 = require("../supabase/supabase.service");
let UserService = class UserService {
    constructor(prisma, supabase) {
        this.prisma = prisma;
        this.supabase = supabase;
    }
    async getUser(dto) {
        const user = await this.prisma.user.findUnique({
            where: { id: dto.userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async deleteUser(dto) {
        try {
            await this.prisma.user.delete({ where: { id: dto.userId } });
        }
        catch {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const { error } = await this.supabase.auth.admin.deleteUser(dto.userId);
        if (error) {
            console.error(error.message);
            throw new common_1.BadRequestException('Falha ao remover usuário do provedor de autenticação');
        }
        return { success: true };
    }
    async updateUser(dto) {
        const hasChanges = dto.name !== undefined || dto.email !== undefined || dto.password !== undefined;
        if (!hasChanges) {
            throw new common_1.BadRequestException('Nenhum campo para atualizar foi fornecido');
        }
        if (dto.email !== undefined || dto.password !== undefined) {
            const { error } = await this.supabase.auth.admin.updateUserById(dto.userId, {
                ...(dto.email && { email: dto.email }),
                ...(dto.password && { password: dto.password }),
            });
            if (error) {
                console.error(error.message);
                throw new common_1.BadRequestException('Falha ao atualizar credenciais no provedor de autenticação');
            }
        }
        if (dto.name !== undefined || dto.email !== undefined) {
            try {
                await this.prisma.user.update({
                    where: { id: dto.userId },
                    data: {
                        ...(dto.name && { name: dto.name }),
                        ...(dto.email && { email: dto.email }),
                    },
                });
            }
            catch {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
        }
        return { success: true };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        supabase_service_1.SupabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map