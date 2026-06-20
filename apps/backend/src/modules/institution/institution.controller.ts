import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '../auth/context/auth.guard'
import { CurrentUser } from '../auth/context/current-user.decorator'
import { InstitutionService } from './institution.service'
import { CreateInstitutionDto } from './dto/create-institution.dto'
import { UpdateInstitutionDto } from './dto/update-institution.dto'

@ApiTags('institution')
@ApiBearerAuth('supabase-jwt')
@UseGuards(AuthGuard)
@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar nova instituição financeira' })
  @ApiResponse({ status: 201, description: 'Instituição criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 409, description: 'Instituição com esse nome já existe' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateInstitutionDto) {
    return this.institutionService.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar instituições do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de instituições' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  findAll(@CurrentUser('id') userId: string) {
    return this.institutionService.findAll(userId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar instituição por ID' })
  @ApiParam({ name: 'id', description: 'ID da instituição' })
  @ApiResponse({ status: 200, description: 'Instituição encontrada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.institutionService.findOne(userId, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar instituição' })
  @ApiParam({ name: 'id', description: 'ID da instituição' })
  @ApiResponse({ status: 200, description: 'Instituição atualizada' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  @ApiResponse({ status: 409, description: 'Nome já utilizado por outra instituição' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateInstitutionDto,
  ) {
    return this.institutionService.update(userId, id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover instituição' })
  @ApiParam({ name: 'id', description: 'ID da instituição' })
  @ApiResponse({ status: 200, description: 'Instituição removida com sucesso' })
  @ApiResponse({ status: 400, description: 'Instituição possui contas vinculadas' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 404, description: 'Instituição não encontrada' })
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.institutionService.remove(userId, id)
  }
}