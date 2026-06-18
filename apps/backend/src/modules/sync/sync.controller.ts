import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { CurrentUser } from '@modules/auth/context/current-user.decorator'
import { AuthGuard } from '@modules/auth/context/auth.guard'
import { PullQueryDto, PullResponseDto } from './dto/pull'
import { PushBodyDto, PushQueryDto, PushResponseDto } from './dto/push'
import { SyncService } from './sync.service'

@ApiBearerAuth('supabase-jwt')
@ApiUnauthorizedResponse({ description: 'Token não fornecido, inválido ou expirado' })
@UseGuards(AuthGuard)
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('pull')
  async pull(
    @CurrentUser('id') userId: string,
    @Query() dto: PullQueryDto,
  ): Promise<PullResponseDto> {
    return this.syncService.pull({ userId, lastUpdatedAt: dto.lastUpdatedAt })
  }

  @Post('push')
  async push(
    @CurrentUser('id') userId: string,
    @Query() query: PushQueryDto,
    @Body() body: PushBodyDto,
  ): Promise<PushResponseDto> {
    return this.syncService.push({
      userId,
      lastUpdatedAt: query.lastUpdatedAt,
      changes: body.changes,
    })
  }
}
