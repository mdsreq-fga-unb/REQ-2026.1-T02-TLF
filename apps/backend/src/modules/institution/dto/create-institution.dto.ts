import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUrl, Matches } from 'class-validator'

export class CreateInstitutionDto {
  @ApiProperty({ example: 'Nubank' })
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty({ example: '#8A05BE', description: 'Cor em hexadecimal' })
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6})$/, { message: 'Cor deve ser um hexadecimal válido ex: #8A05BE' })
  color!: string

  @ApiProperty({ example: 'landmark', required: false })
  @IsOptional()
  @IsString()
  icon?: string

  @ApiProperty({ example: 'https://example.com/logo.png', required: false })
  @IsOptional()
  @IsUrl()
  logoUrl?: string
}
