import { IsString, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExampleDto {
  @ApiProperty({
    description: 'Nome do exemplo',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name!: string
}
