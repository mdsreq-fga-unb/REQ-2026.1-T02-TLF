import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { Controller, Post, Body } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }
}
