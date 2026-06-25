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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const deleted_record_util_1 = require("../../common/sync/deleted-record.util");
const sync_query_util_1 = require("../../common/sync/sync-query.util");
const client_1 = require("../../../generated/prisma/client");
let NotificationsService = class NotificationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findMany(dto) {
        const { userId, id, type, isRead, referenceType, createdAfter, updatedAfter } = dto;
        return this.prisma.notification.findMany({
            where: {
                userId,
                ...(id && { id }),
                ...(type && { type }),
                ...(isRead !== undefined && { isRead }),
                ...(referenceType && { referenceType }),
                ...(0, sync_query_util_1.buildTimestampWhere)({ createdAfter, updatedAfter }),
            },
        });
    }
    async syncCreate(userId, dto) {
        return this.prisma.notification.upsert({
            where: { id: dto.id },
            create: {
                id: dto.id,
                userId,
                type: dto.type,
                title: dto.title,
                description: dto.description,
                isRead: dto.isRead ?? false,
                primaryActionLabel: dto.primaryActionLabel ?? null,
                primaryAction: dto.primaryAction ?? null,
                secondaryActionLabel: dto.secondaryActionLabel ?? null,
                secondaryAction: dto.secondaryAction ?? null,
                icon: dto.icon,
                color: dto.color,
                referenceId: dto.referenceId,
                referenceType: dto.referenceType,
                ...(dto.createdAt && { createdAt: new Date(dto.createdAt) }),
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
            update: {
                type: dto.type,
                title: dto.title,
                description: dto.description,
                isRead: dto.isRead,
                primaryActionLabel: dto.primaryActionLabel ?? null,
                primaryAction: dto.primaryAction ?? null,
                secondaryActionLabel: dto.secondaryActionLabel ?? null,
                secondaryAction: dto.secondaryAction ?? null,
                icon: dto.icon,
                color: dto.color,
                referenceId: dto.referenceId,
                referenceType: dto.referenceType,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async syncUpdate(userId, dto) {
        const notification = await this.prisma.notification.findUnique({ where: { id: dto.id } });
        if (!notification)
            throw new common_1.NotFoundException('Notificação não encontrada');
        if (notification.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        return this.prisma.notification.update({
            where: { id: dto.id },
            data: {
                type: dto.type,
                title: dto.title,
                description: dto.description,
                isRead: dto.isRead,
                primaryActionLabel: dto.primaryActionLabel ?? null,
                primaryAction: dto.primaryAction ?? null,
                secondaryActionLabel: dto.secondaryActionLabel ?? null,
                secondaryAction: dto.secondaryAction ?? null,
                icon: dto.icon,
                color: dto.color,
                referenceId: dto.referenceId,
                referenceType: dto.referenceType,
                ...(dto.updatedAt && { updatedAt: new Date(dto.updatedAt) }),
            },
        });
    }
    async remove(dto) {
        const { userId, id: notificationId } = dto;
        const notification = await this.prisma.notification.findUnique({
            where: { id: notificationId },
        });
        if (!notification)
            throw new common_1.NotFoundException('Notificação não encontrada');
        if (notification.userId !== userId)
            throw new common_1.ForbiddenException('Acesso negado');
        await this.prisma.$transaction(async (tx) => {
            await (0, deleted_record_util_1.createDeletedRecords)({
                tx,
                userId,
                tableName: client_1.TableName.NOTIFICATIONS,
                recordIds: [notificationId],
            });
            await tx.notification.delete({ where: { id: notificationId } });
        });
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map