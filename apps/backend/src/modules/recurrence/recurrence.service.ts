import { Injectable } from '@nestjs/common';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';

@Injectable()
export class RecurrenceService {
  create(createRecurrenceDto: CreateRecurrenceDto) {
    return 'This action adds a new recurrence';
  }

  findAll() {
    return `This action returns all recurrence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recurrence`;
  }

  update(id: number, updateRecurrenceDto: UpdateRecurrenceDto) {
    return `This action updates a #${id} recurrence`;
  }

  remove(id: number) {
    return `This action removes a #${id} recurrence`;
  }
}
