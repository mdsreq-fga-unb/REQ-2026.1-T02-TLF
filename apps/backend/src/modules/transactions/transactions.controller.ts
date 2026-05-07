import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    id: string;
  };
}

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  // CA1, CA3, CA4
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto) {
    // CA5: userId fixo por enquanto — substituir por @CurrentUser() quando auth estiver pronto
    const userId = 'user-teste-001'
    return this.transactionsService.create(userId, dto)
  }

  //Issue #10 - CA1
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.transactionsService.findAll(req.user.id);
  }
}