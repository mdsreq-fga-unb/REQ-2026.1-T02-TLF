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
import { ApiTags } from '@nestjs/swagger'
import { BudgetService } from './budget.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { CurrentUser } from '@modules/auth/context/current-user.decorator'
import { AuthGuard } from '@modules/auth/context/auth.guard'

@ApiTags('budget')
@UseGuards(AuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBudgetDto, @CurrentUser('id') userId: string) {
    return this.budgetService.create(userId, dto)
  }

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.budgetService.findAll(userId)
  }

  @Get('category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string, @CurrentUser('id') userId: string) {
    return this.budgetService.findByCategory(userId, categoryId)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.budgetService.findOne(userId, id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto, @CurrentUser('id') userId: string) {
    return this.budgetService.update(userId, id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.budgetService.remove({ userId, id })
  }
}
