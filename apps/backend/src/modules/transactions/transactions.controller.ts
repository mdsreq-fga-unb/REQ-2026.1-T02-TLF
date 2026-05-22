import { Body, Controller, Post, HttpCode, HttpStatus, Get, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { CurrentUser } from '../auth/context/current-user.decorator';


@UseGuards(AuthGuard)
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto, @CurrentUser('id') userId: string) {
    return this.transactionsService.create(userId, dto)
  }

  @ApiResponse({ status: 200, description: 'Lista de transações encontrada com sucesso' })
  @Get()
  findAll(@CurrentUser('id') userId: string,
    @Query() query: FilterTransactionsDto) {
    return this.transactionsService.findAll({
      userId: userId,
      ...query,
    });
  }

  @ApiResponse({ status: 200, description: 'Transação encontrada' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Get(':id')
  findOne(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.transactionsService.findOne({
      userId: userId,
      id,
    });
  }

  @ApiResponse({ status: 200, description: 'Transação atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para atualização' })
  @Patch(':id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({
      userId: userId,
      id,
      dto,
    });
  }

  @ApiResponse({ status: 200, description: 'Transação deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para deleção' })
  @Delete(':id')
  remove(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
  ) {
    return this.transactionsService.remove({
      userId: userId,
      id,
    });
  }
}