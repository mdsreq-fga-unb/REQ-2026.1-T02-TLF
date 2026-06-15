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
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { AuthGuard } from '../auth/context/auth.guard'
import { CurrentUser } from '../auth/context/current-user.decorator'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ReclassifyCategoryDto } from './dto/reclassify-category.dto'

@ApiTags('category')
@ApiBearerAuth('supabase-jwt')
@UseGuards(AuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 409, description: 'Categoria com esse nome já existe' })
  create(@CurrentUser('id') userId: string, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  findAll(@CurrentUser('id') userId: string) {
    return this.categoryService.findAll(userId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.categoryService.findOne(userId, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado ou categoria padrão' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(userId, id, dto, dto.newCategoryId)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria removida com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado ou categoria padrão' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  remove(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: ReclassifyCategoryDto,
  ) {
    return this.categoryService.remove(userId, id, dto?.newCategoryId)
  }
}
