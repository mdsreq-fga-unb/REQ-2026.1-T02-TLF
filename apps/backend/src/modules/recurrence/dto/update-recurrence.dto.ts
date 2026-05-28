import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrenceDto } from './create-recurrence.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export enum RecurrenceApplyScope {
  THIS = 'THIS',
  ALL = 'ALL',
}


export class UpdateRecurrenceDto extends PartialType(CreateRecurrenceDto) {
  
  @ApiPropertyOptional({
    enum: RecurrenceApplyScope,
    enumName: 'RecurrenceApplyScope',
    example: RecurrenceApplyScope.THIS,
    description:
      'Define se a alteração será aplicada apenas nesta recorrência ou em todas as instâncias já geradas',
  })
  @IsOptional()
  @IsEnum(RecurrenceApplyScope)
  applyScope?: RecurrenceApplyScope;
}