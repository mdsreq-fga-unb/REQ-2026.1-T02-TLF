import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../auth/context/auth.guard'
import { CurrentUser } from '../auth/context/current-user.decorator'
import { PullQueryDto, PushChangesDto } from './dto/sync.dto'
import { SyncService } from './sync.service'

@UseGuards(AuthGuard)
@ApiTags('sync')
@ApiBearerAuth('supabase-jwt')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @ApiOperation({ summary: 'WatermelonDB pull: mudanças do servidor desde lastPulledAt' })
  @ApiResponse({ status: 200, description: '{ changes, timestamp }' })
  @Get()
  pull(@CurrentUser('id') userId: string, @Query() query: PullQueryDto) {
    return this.syncService.pull(userId, query.lastPulledAt)
  }

  @ApiOperation({ summary: 'WatermelonDB push: aplica mudanças locais no servidor' })
  @ApiResponse({ status: 200, description: 'Mudanças aplicadas' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async push(@CurrentUser('id') userId: string, @Body() dto: PushChangesDto) {
    await this.syncService.push(userId, dto.changes)
    return { ok: true }
  }
}
