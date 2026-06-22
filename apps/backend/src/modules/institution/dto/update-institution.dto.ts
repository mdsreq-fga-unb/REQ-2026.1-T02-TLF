import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsUrl, Matches } from 'class-validator'

export class UpdateInstitutionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6})$/, { message: 'Cor deve ser um hexadecimal válido ex: #8A05BE' })
  color?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string
}
