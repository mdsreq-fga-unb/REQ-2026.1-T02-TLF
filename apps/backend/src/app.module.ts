import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, validate } from './config/app.config'
import { PrismaModule } from './common/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { SupabaseModule } from './modules/supabase/supabase.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/.env',
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    SupabaseModule,
  ],
})
export class AppModule {}
