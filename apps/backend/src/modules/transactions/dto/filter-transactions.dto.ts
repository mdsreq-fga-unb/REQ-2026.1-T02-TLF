import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsUUID, IsEnum } from "class-validator"
import { TransactionType } from "../../../../generated/prisma"
export class FilterTransactionsDto {

    @ApiPropertyOptional({
        enum: TransactionType,
        example: TransactionType.EXPENSE,
        description: 'Tipo da transação para filtro'
    })
    @IsOptional()
    @IsEnum(TransactionType)
    type?: TransactionType;

    @ApiPropertyOptional({
        example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
        description: 'ID da categoria usado como filtro'
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;
}