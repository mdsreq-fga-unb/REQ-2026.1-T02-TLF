import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { FilterTransactionsDto } from './dto/filter-transactions.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { AuthGuard } from '../auth/context/auth.guard'
import { CurrentUser } from '../auth/context/current-user.decorator'
import { TransactionListResponseDto } from './dto/transaction-list.response.dto'
import { TransactionDetailResponseDto } from './dto/transaction-detail.response.dto'

@UseGuards(AuthGuard)
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({
    status: 201,
    type: TransactionDetailResponseDto,
    description: 'Transação criada com sucesso',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto, @CurrentUser('id') userId: string) {
    return this.transactionsService.create(userId, dto)
  }

  @ApiResponse({
    status: 200,
    type: TransactionListResponseDto,
    description: 'Lista de transações encontrada com sucesso',
  })
  @Get()
  findAll(@CurrentUser('id') userId: string, @Query() query: FilterTransactionsDto) {
    return this.transactionsService.findAll(userId, query)
  }

  @ApiResponse({
    status: 200,
    type: TransactionDetailResponseDto,
    description: 'Transação encontrada',
  })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.transactionsService.findOne({
      userId,
      id,
    })
  }

  @ApiResponse({
    status: 200,
    type: TransactionDetailResponseDto,
    description: 'Transação atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para atualização' })
  @Patch(':id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({
      userId,
      id,
      dto,
    })
  }

  @ApiResponse({ status: 200, description: 'Transação deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para deleção' })
  @Delete(':id')
  remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.transactionsService.remove({
      userId,
      id,
    })
  }
}
