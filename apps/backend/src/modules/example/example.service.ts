import { Injectable } from '@nestjs/common'

@Injectable()
export class ExampleService {
  getHello(name: string): string {
    return `Hello ${name}!`
  }
}
