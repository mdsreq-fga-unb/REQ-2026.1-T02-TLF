import { Controller, Get, Query } from '@nestjs/common'
import { ExampleService } from './example.service'
import { ExampleDto } from './dto/example.dto'

@Controller()
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  getHello(@Query() exampleDto: ExampleDto): string {
    return this.exampleService.getHello(exampleDto.name)
  }
}
