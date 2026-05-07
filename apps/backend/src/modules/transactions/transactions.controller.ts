import { Body, Controller, Post, HttpCode, HttpStatus, Get, Req, Query, Param, Patch, Delete } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { Request } from 'express';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  //Issue #10 - CA1, CA2, CA3
  @Get()
  findAll(@Req() req: AuthRequest,
    @Query() query: FilterTransactionsDto) {
    return this.transactionsService.findAll({
      userId: req.user.id,
      ...query,
    });
  }

  //Issue #10 - CA4
  @Get(':id')
  findOne(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.transactionsService.findOne({
      userId: req.user.id,
      id,
    });
  }

  //Issue #10 - CA5
  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() dto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update({
      userId: req.user.id,
      id,
      dto,
    });
  }

  //Issue #10 - CA6
  @Delete(':id')
  remove(
    @Req() req: AuthRequest,
    @Param('id') id: string,
  ) {
    return this.transactionsService.remove({
      userId: req.user.id,
      id,
    });
  }
}