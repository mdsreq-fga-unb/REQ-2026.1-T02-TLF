import { Body, Controller, Post, Get, Param, Patch, Delete, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { AuthGuard } from '../auth/context/auth.guard';
import { Request } from 'express';
import { User } from '@supabase/supabase-js';

interface AuthRequest extends Request {
  authUser: User;
}

@UseGuards(AuthGuard)
@Controller('recurrence')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRecurrenceDto, @Req() req: AuthRequest) {
    const userId = req.authUser.id;
    return this.recurrenceService.create(userId, dto);
  }

  @Get()
  findAll() {
    return this.recurrenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthRequest) {
    return this.recurrenceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateRecurrenceDto, 
    @Req() req: AuthRequest) {
      const userId = req.authUser.id;
      return this.recurrenceService.update(id, dto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurrenceService.remove(id);
  }
}
