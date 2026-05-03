import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { SupabaseService } from './supabase.service'
import { SeedService } from 'prisma/seed'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, SupabaseService, SeedService],
})
export class AuthModule {}
