import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsObject, IsOptional, Min } from 'class-validator'
import { SyncChanges } from '../sync.types'

export class PullQueryDto {
  @ApiPropertyOptional({
    example: 0,
    description:
      'Marca de tempo (ms) da última sincronização. 0/ausente = primeira sync (retorna tudo).',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  lastPulledAt?: number

  @ApiPropertyOptional({ example: 2, description: 'Versão do schema local do WatermelonDB' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  schemaVersion?: number
}

export class PushChangesDto {
  @ApiProperty({
    description:
      'Objeto de mudanças no formato WatermelonDB: { [tabela]: { created, updated, deleted } }',
  })
  @IsObject()
  changes!: SyncChanges

  @ApiPropertyOptional({
    example: 0,
    description: 'lastPulledAt usado pelo cliente, para detecção de conflitos',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  lastPulledAt?: number
}
