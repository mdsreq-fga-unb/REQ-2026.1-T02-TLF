import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrenceDto } from './create-recurrence.dto';

export class UpdateRecurrenceDto extends PartialType(CreateRecurrenceDto) {}
