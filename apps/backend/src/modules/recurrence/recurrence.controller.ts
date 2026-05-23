import { Body, Controller, Post, Get, Param, Patch, Delete, Query, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { Request } from 'express';
import { User } from '@supabase/supabase-js';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

interface AuthRequest extends Request {
  authUser: User;
}

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
  create(@Body() dto: CreateRecurrenceDto, @Req() req: AuthRequest) {
    const userId = req.authUser.id;
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
  findAll(@Req() req: AuthRequest, @Query('categoryId') categoryId?: string) {
    return this.recurrenceService.findAll(req.authUser.id, categoryId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Recorrência encontrada' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.recurrenceService.findOne(req.authUser.id, id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Recorrência atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRecurrenceDto, 
    @Req() req: AuthRequest) {
      return this.recurrenceService.update(req.authUser.id, id, dto);
    }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Recorrência removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Recorrência não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  remove(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.recurrenceService.remove(req.authUser.id, id)
  }
}
