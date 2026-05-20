import { AuthService } from './auth.service'
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto'
import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto'
import { LogoutResponseDto } from './dto/logout.dto'
import { RefreshRequestDto, RefreshResponseDto } from './dto/refresh.dto'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from './context/auth.guard'
import { Request } from 'express'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuário',
    description:
      'Cria conta no provedor, persiste usuário local, semeia categorias padrão e abre sessão (mesmo contrato que login: usuário + tokens).',
  })
  @ApiCreatedResponse({ type: RegisterResponseDto, description: 'Usuário criado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou e-mail já em uso no provedor' })
  async register(@Body() registerDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { userId } = await this.authService.register(registerDto)
    const { user, accessToken, refreshToken } = await this.authService.login({
      email: registerDto.email,
      password: registerDto.password,
    })

    if (user.id !== userId) {
      throw new InternalServerErrorException('Sessão inconsistente após o cadastro')
    }

    return { user, accessToken, refreshToken }
  }

  @HttpCode(200)
  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description:
      'Autentica por e-mail e senha. Retorna o perfil do usuário (para dispositivos sem cache local) e os tokens de acesso.',
  })
  @ApiOkResponse({ type: LoginResponseDto, description: 'Sessão criada com sucesso' })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas ou usuário não encontrado na base local',
  })
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Post('logout')
  @ApiBearerAuth('supabase-jwt')
  @ApiOperation({
    summary: 'Logout',
    description:
      'Encerra a sessão usando o mesmo access JWT enviado em `Authorization: Bearer <token>` (Swagger: Authorize).',
  })
  @ApiOkResponse({ type: LogoutResponseDto, description: 'Logout efetuado' })
  @ApiUnauthorizedResponse({ description: 'Token não enviado, inválido ou expirado' })
  @ApiBadRequestResponse({ description: 'Falha ao encerrar sessão no provedor' })
  async logout(@Req() req: Request): Promise<LogoutResponseDto> {
    return await this.authService.logout(req.accessToken!)
  }

  @HttpCode(200)
  @Post('refresh')
  @ApiOperation({
    summary: 'Renovar sessão',
    description: 'Troca o refresh token (body) por um novo par de access e refresh tokens.',
  })
  @ApiOkResponse({ type: RefreshResponseDto, description: 'Nova sessão emitida' })
  @ApiUnauthorizedResponse({ description: 'Refresh token inválido ou expirado' })
  @ApiBadRequestResponse({ description: 'Payload de sessão incompleta após o refresh' })
  async refresh(@Body() refreshDto: RefreshRequestDto): Promise<RefreshResponseDto> {
    return await this.authService.refreshToken(refreshDto)
  }
}
