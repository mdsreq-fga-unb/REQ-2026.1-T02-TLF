import { Body, Controller, Post, Get, Param, Patch, Delete, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../auth/context/current-user.decorator';
import { FilterRecurrenceDto } from './dto/filter-recurrence.dto';
import { RecurrenceListResponseDto } from './dto/recurrence-list.response.dto';
import { RecurrenceDetailResponseDto } from './dto/recurrence-detail.response.dto';

@ApiBearerAuth('supabase-jwt')
@UseGuards(AuthGuard)
@ApiTags('recurrence')
@Controller('recurrences')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @ApiResponse({ status: 201, type: RecurrenceDetailResponseDto, description: 'Recorrência criada com sucesso' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@CurrentUser('id') userId: string, @Body() dto: CreateRecurrenceDto) {
    return this.recurrenceService.create(userId, dto);
  }

  @ApiResponse({ status: 200, type: RecurrenceListResponseDto, description: 'Lista de recorrências retornada com sucesso' })
  @Get()
  findAll(@CurrentUser('id') userId: string, @Query() query: FilterRecurrenceDto) {
    return this.recurrenceService.findAll(userId, query);
  }

  @ApiResponse({ status: 200, type: RecurrenceDetailResponseDto, description: 'Recorrência encontrada' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.recurrenceService.findOne(userId, id);
  }

  @ApiResponse({ status: 200, type: RecurrenceDetailResponseDto, description: 'Recorrência atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateRecurrenceDto) {
    return this.recurrenceService.update(userId, id, dto);
  }

  @ApiResponse({ status: 200, type: RecurrenceDetailResponseDto, description: 'Recorrência removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.recurrenceService.remove(userId, id);
  }
}