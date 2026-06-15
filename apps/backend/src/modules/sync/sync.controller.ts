import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { assertMatchingUserId } from '@common/sync/validate-user-id'
import { CurrentUser } from '@modules/auth/context/current-user.decorator'
import { AuthGuard } from '@modules/auth/context/auth.guard'
import { PullRequestDto, PullResponseDto } from './dto/pull'
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
    @CurrentUser('id') authUserId: string,
    @Query() dto: PullRequestDto,
  ): Promise<PullResponseDto> {
    assertMatchingUserId(authUserId, dto.userId)
    return this.syncService.pull(dto)
  }

  @Post('push')
  async push(
    @CurrentUser('id') authUserId: string,
    @Query() query: PushQueryDto,
    @Body() body: PushBodyDto,
  ): Promise<PushResponseDto> {
    assertMatchingUserId(authUserId, query.userId)
    return this.syncService.push({
      userId: query.userId,
      lastUpdatedAt: query.lastUpdatedAt,
      changes: body.changes,
    })
  }
}
