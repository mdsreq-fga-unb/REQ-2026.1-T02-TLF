import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';

@Controller('recurrence')
export class RecurrenceController {
  constructor(private readonly recurrenceService: RecurrenceService) {}

  @Post()
  create(@Body() createRecurrenceDto: CreateRecurrenceDto) {
    return this.recurrenceService.create(createRecurrenceDto);
  }

  @Get()
  findAll() {
    return this.recurrenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurrenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecurrenceDto: UpdateRecurrenceDto) {
    return this.recurrenceService.update(+id, updateRecurrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurrenceService.remove(+id);
  }
}
