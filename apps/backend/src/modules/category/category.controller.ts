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
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ReclassifyCategoryDto } from './dto/reclassify-category.dto'

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 409, description: 'Categoria com esse nome já existe' })
  create(@Body() dto: CreateCategoryDto) {
    const userId = 'user-teste-001'
    return this.categoryService.create(userId, dto)
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorias do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  findAll() {
    const userId = 'user-teste-001'
    return this.categoryService.findAll(userId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria por ID' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  findOne(@Param('id') id: string) {
    const userId = 'user-teste-001'
    return this.categoryService.findOne(userId, id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria' })
  @ApiParam({ name: 'id', description: 'ID da categoria' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado ou categoria padrão' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
   const userId = 'user-teste-001'
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
  remove(@Param('id') id: string, @Body() dto: ReclassifyCategoryDto) {
    const userId = 'user-teste-001'
    return this.categoryService.remove(userId, id, dto?.newCategoryId)
  }
}