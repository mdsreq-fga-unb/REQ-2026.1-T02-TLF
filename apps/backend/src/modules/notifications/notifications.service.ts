import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { createDeletedRecords } from '@common/sync/deleted-record.util'
import { buildTimestampWhere } from '@common/sync/sync-query.util'
import { TableName } from 'generated/prisma/client'
import { FindManyNotificationsDto } from './dto/find-many.dto'
import { RemoveNotificationRequestDto } from './dto/remove.dto'
import { SyncNotificationDto } from './dto/sync-notification.dto'

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  findMany(dto: FindManyNotificationsDto) {
    const { userId, id, type, isRead, referenceType, createdAfter, updatedAfter } = dto

    return this.prisma.notification.findMany({
      where: {
        userId,
        ...(id && { id }),
        ...(type && { type }),
        ...(isRead !== undefined && { isRead }),
        ...(referenceType && { referenceType }),
        ...buildTimestampWhere({ createdAfter, updatedAfter }),
      },
    })
  }

  async syncCreate(userId: string, dto: SyncNotificationDto) {
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
    })
  }

  async syncUpdate(userId: string, dto: SyncNotificationDto) {
    const notification = await this.prisma.notification.findUnique({ where: { id: dto.id } })
    if (!notification) throw new NotFoundException('Notificação não encontrada')
    if (notification.userId !== userId) throw new ForbiddenException('Acesso negado')

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
    })
  }

  async remove(dto: RemoveNotificationRequestDto): Promise<void> {
    const { userId, id: notificationId } = dto
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    })
    if (!notification) throw new NotFoundException('Notificação não encontrada')
    if (notification.userId !== userId) throw new ForbiddenException('Acesso negado')

    await this.prisma.$transaction(async (tx) => {
      await createDeletedRecords({
        tx,
        userId,
        tableName: TableName.NOTIFICATIONS,
        recordIds: [notificationId],
      })
      await tx.notification.delete({ where: { id: notificationId } })
    })
  }
}
