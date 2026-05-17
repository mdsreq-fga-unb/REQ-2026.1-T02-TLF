import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Request } from 'express';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { User } from '@supabase/supabase-js'

interface AuthRequest extends Request {
  authUser: User
}

@UseGuards(AuthGuard)
@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  // CA1, CA3, CA4
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto, @Req() req: AuthRequest) {
    // CA5: userId fixo por enquanto — substituir por @CurrentUser() quando auth estiver pronto
    const userId = req.authUser.id
    return this.transactionsService.create(userId, dto)
  }

  //Issue #10 - CA1, CA2, CA3
  @ApiResponse({ status: 200, description: 'Lista de transações encontrada com sucesso' })
  @Get()
  findAll(@Req() req: AuthRequest,
    @Query() query: FilterTransactionsDto) {
    return this.transactionsService.findAll({
      userId: req.authUser.id,
      ...query,
    });
  }

  //Issue #10 - CA4
  @ApiResponse({ status: 200, description: 'Transação encontrada' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @Get(':id')
  findOne(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.transactionsService.findOne({
      userId: req.authUser.id,
      id,
    });
  }

  //Issue #10 - CA5
  @ApiResponse({ status: 200, description: 'Transação atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para atualização' })
  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({
      userId: req.authUser.id,
      id,
      dto,
    });
  }

  //Issue #10 - CA6
  @ApiResponse({ status: 200, description: 'Transação deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transação não encontrada' })
  @ApiResponse({ status: 403, description: 'Acesso negado para deleção' })
  @Delete(':id')
  remove(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.transactionsService.remove({
      userId: req.authUser.id,
      id,
    });
  }
}