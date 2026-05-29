import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrenceDto } from './create-recurrence.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RecurrenceApplyScope } from '../enums/recurrence-apply-scope.enum';


export class UpdateRecurrenceDto extends PartialType(CreateRecurrenceDto) {
  @ApiPropertyOptional({
    enum: RecurrenceApplyScope,
    enumName: 'RecurrenceApplyScope',
    example: RecurrenceApplyScope.THIS,
    description:
      'Define o escopo da alteração: apenas esta ocorrência (THIS), todas as ocorrências (ALL) ou apenas futuras (FUTURE).',
  })
  @IsOptional()
  @IsEnum(RecurrenceApplyScope)
  applyScope?: RecurrenceApplyScope;
}