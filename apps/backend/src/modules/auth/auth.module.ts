import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SeedService } from 'prisma/seed'
import { AuthGuard } from './context/auth.guard'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, SeedService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
