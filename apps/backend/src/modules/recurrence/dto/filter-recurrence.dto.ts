import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsUUID } from "class-validator";

export class FilterRecurrenceDto {

    @ApiPropertyOptional({
        example: '3cec466a-096d-4016-bb10-bcc9b94a7d36',
        description: 'Filtra recorrências pela categoria',
    })
    @IsOptional()
    @IsUUID()
    categoryId?: string;
}