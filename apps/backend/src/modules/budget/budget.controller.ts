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
import { ApiTags } from '@nestjs/swagger'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'

@ApiTags('budget')
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBudgetDto) {
    const userId = 'user-teste-001'
    return this.budgetService.create(userId, dto)
  }

  @Get()
  findAll() {
    const userId = 'user-teste-001'
    return this.budgetService.findAll(userId)
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    const userId = 'user-teste-001'
    return this.budgetService.findByCategory(userId, categoryId)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const userId = 'user-teste-001'
    return this.budgetService.findOne(userId, id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    const userId = 'user-teste-001'
    return this.budgetService.update(userId, id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    const userId = 'user-teste-001'
    return this.budgetService.remove({ userId, id })
  }
}
