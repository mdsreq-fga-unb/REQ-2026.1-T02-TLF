import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RecurrenceDeleteScope } from '../enums/recurrence-delete-scope.enum';

export class DeleteRecurrenceDto {
  @ApiPropertyOptional({
    enum: RecurrenceDeleteScope,
    enumName: 'RecurrenceDeleteScope',
    example: RecurrenceDeleteScope.THIS,
    default: RecurrenceDeleteScope.THIS,
    description:
        'Define o escopo da exclusão da recorrência: THIS remove apenas esta ocorrência, FUTURE remove esta e as próximas, ALL remove todas as ocorrências e histórico gerado.',
    })
  @IsOptional()
  @IsEnum(RecurrenceDeleteScope)
  scope?: RecurrenceDeleteScope;
}