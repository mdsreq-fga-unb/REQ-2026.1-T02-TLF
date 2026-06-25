import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '@common/prisma/prisma.service';
import { RegisterRequestDto, RegisterServiceResponseDto } from './dto/register.dto';
import { SeedService } from 'prisma/seed';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { LogoutResponseDto } from './dto/logout.dto';
import { RefreshRequestDto, RefreshResponseDto } from './dto/refresh.dto';
export declare class AuthService {
    private supabase;
    private prisma;
    private seed;
    constructor(supabase: SupabaseService, prisma: PrismaService, seed: SeedService);
    register(dto: RegisterRequestDto): Promise<RegisterServiceResponseDto>;
    login(dto: LoginRequestDto): Promise<LoginResponseDto>;
    logout(accessToken: string): Promise<LogoutResponseDto>;
    refreshToken(dto: RefreshRequestDto): Promise<RefreshResponseDto>;
}
