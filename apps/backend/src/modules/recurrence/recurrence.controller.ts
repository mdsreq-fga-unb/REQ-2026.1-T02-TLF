import { Body, Controller, Post, Get, Param, Patch, Delete, Query, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from '../auth/context/current-user.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('recurrence')
@Controller('recurrence')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Recorrência criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  create(@Body() dto: CreateRecurrenceDto, @CurrentUser('id') userId: string) {
    return this.recurrenceService.create(userId, dto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de recorrências retornada com sucesso' })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filtra recorrências por categoria',
    example: 'c9f3a2b1-xxxx',
  })
  findAll(@CurrentUser('id') userId: string, @Query('categoryId') categoryId?: string) {
    return this.recurrenceService.findAll(userId, categoryId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Recorrência encontrada' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.recurrenceService.findOne(userId, id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Recorrência atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRecurrenceDto, 
    @CurrentUser('id') userId: string) {
      return this.recurrenceService.update(userId, id, dto);
    }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Recorrência removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.recurrenceService.remove(userId, id)
  }
}
