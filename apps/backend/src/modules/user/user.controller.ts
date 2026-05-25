import { Body, Controller, Delete, Get, HttpCode, Patch, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '@modules/auth/context/auth.guard'
import { CurrentUser } from '@modules/auth/context/current-user.decorator'
import { GetUserResponseDto } from './dto/get.dto'
import { DeleteUserResponseDto } from './dto/delete.dto'
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dto/update.dto'
import { UserService } from './user.service'

@ApiTags('User')
@ApiBearerAuth('supabase-jwt')
@ApiUnauthorizedResponse({ description: 'Token não fornecido, inválido ou expirado' })
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Obter perfil do usuário',
    description: 'Retorna os dados do usuário autenticado.',
  })
  @ApiOkResponse({ type: GetUserResponseDto, description: 'Dados do usuário' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado na base local' })
  async getUser(@CurrentUser('id') userId: string): Promise<GetUserResponseDto> {
    return await this.userService.getUser({ userId })
  }

  @Delete()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Deletar conta',
    description:
      'Remove permanentemente o usuário e todos os seus dados (categorias, instituições, orçamentos). Invalida a conta no provedor de autenticação.',
  })
  @ApiOkResponse({ type: DeleteUserResponseDto, description: 'Conta removida' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'Falha ao remover do provedor de autenticação' })
  async deleteUser(@CurrentUser('id') userId: string): Promise<DeleteUserResponseDto> {
    return await this.userService.deleteUser({ userId })
  }

  @Patch()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar perfil',
    description:
      'Atualiza nome, e-mail e/ou senha do usuário. Pelo menos um campo deve ser enviado. Credenciais (e-mail e senha) são atualizadas no provedor de autenticação; nome e e-mail são sincronizados na base local.',
  })
  @ApiOkResponse({ type: UpdateUserResponseDto, description: 'Perfil atualizado' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({
    description:
      'Nenhum campo fornecido, dados inválidos ou falha ao atualizar no provedor de autenticação',
  })
  async updateUser(
    @CurrentUser('id') userId: string,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.userService.updateUser({ userId, ...updateUserDto })
  }
}
