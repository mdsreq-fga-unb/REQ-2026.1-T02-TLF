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
exports.InstitutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const set_null_util_1 = require("../../common/sync/set-null.util");
let InstitutionService = class InstitutionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkDuplicateName(userId, name, excludeId) {
        const existing = await this.prisma.institution.findFirst({
            where: { userId, name },
        });
        if (existing && existing.id !== excludeId) {
            throw new common_1.ConflictException('Já existe uma instituição com esse nome');
        }
    }
    async create(userId, dto) {
        await this.checkDuplicateName(userId, dto.name);
        return this.prisma.institution.create({
            data: { ...dto, userId },
            select: { id: true, name: true, color: true, icon: true, logoUrl: true },
        });
    }
    async findAll(userId) {
        return this.prisma.institution.findMany({
            where: { userId },
            select: { id: true, name: true, color: true, icon: true, logoUrl: true },
        });
    }
    async findOne(userId, id) {
        const institution = await this.prisma.institution.findUnique({
            where: { id, userId },
            select: { id: true, name: true, color: true, icon: true, logoUrl: true },
        });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        return institution;
    }
    async update(userId, id, dto) {
        const institution = await this.prisma.institution.findUnique({ where: { id, userId } });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        if (dto.name) {
            await this.checkDuplicateName(userId, dto.name, id);
        }
        return this.prisma.institution.update({
            where: { id },
            data: dto,
            select: { id: true, name: true, color: true, icon: true, logoUrl: true },
        });
    }
    async remove(userId, id) {
        const institution = await this.prisma.institution.findUnique({ where: { id, userId } });
        if (!institution)
            throw new common_1.NotFoundException('Instituição não encontrada');
        const accountCount = await this.prisma.account.count({
            where: { institutionId: id },
        });
        if (accountCount > 0) {
            throw new common_1.BadRequestException(`Esta instituição possui ${accountCount} conta(s) vinculada(s). Remova ou desvincule as contas antes de excluir a instituição.`);
        }
        await this.prisma.$transaction(async (tx) => {
            await (0, set_null_util_1.nullifyTransactionDestinationInstitutionRefs)(tx, id);
            await tx.institution.delete({ where: { id } });
        });
        return { message: 'Instituição removida com sucesso' };
    }
};
exports.InstitutionService = InstitutionService;
exports.InstitutionService = InstitutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstitutionService);
//# sourceMappingURL=institution.service.js.map