import {
    ApiProperty,
    ApiPropertyOptional
} from "@nestjs/swagger"
import {
    IsInt,
    IsISO8601,
    IsOptional,
    IsString,
    IsUUID,
    Min,
    Max,
    IsBoolean,
} from "class-validator";

export class CreateRecurrenceDto {

    @ApiProperty({
        example: 'ae73db85-6c25-4b8d-91b2-d0cda2830c65',
        description: 'ID da conta bancária associada à recorrência',
    })
    @IsUUID()
    accountId!: string;

    @ApiProperty({
        example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
        description: 'ID da categoria principal da recorrência',
    })
    @IsUUID()
    categoryId!: string;

    @ApiPropertyOptional({
        example: 'a55d44df-6f3b-480d-9db4-388235e931bc',
        description: 'ID da subcategoria (opcional)',
    })
    @IsOptional()
    @IsUUID()
    subCategoryId?: string;

    @ApiProperty({
        example: 'Assinatura Netflix',
        description: 'Descrição da recorrência financeira',
    })
    @IsString()
    description!: string;

    @ApiProperty({
        example: 2990,
        description: 'Valor da recorrência em centavos (ex: R$ 29,90 = 2990)',
        minimum: 1,
    })
    @IsInt()
    @Min(1)
    amount!: number; //em centavos

    @ApiProperty({
        example: 10,
        description: 'Dia do mês em que a recorrência será cobrada (1 a 31)',
        minimum: 1,
        maximum: 31,
    })
    @IsInt()
    @Min(1)
    @Max(31)
    chargeDate!: number;

    @ApiProperty({
        example: '2026-01-01T00:00:00.000Z',
        description: 'Data de início da recorrência (ISO 8601)',
    })
    @IsISO8601()
    startDate!: string;

    @ApiPropertyOptional({
        example: '2026-12-31T00:00:00.000Z',
        description: 'Data de término da recorrência (opcional)',
    })
    @IsOptional()
    @IsISO8601()
    endDate?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Indica se a recorrência está ativa',
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
