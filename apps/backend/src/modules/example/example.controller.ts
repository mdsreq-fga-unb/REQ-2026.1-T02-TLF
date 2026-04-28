import { Body, Controller, Post } from '@nestjs/common'
import { ExampleService } from './example.service'
import { ExampleDto } from './dto/example.dto'

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  getHello(@Body() exampleDto: ExampleDto): string {
    return this.exampleService.getHello(exampleDto.name)
  }
}
