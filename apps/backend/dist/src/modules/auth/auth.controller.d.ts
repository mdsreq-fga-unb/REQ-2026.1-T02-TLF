import { AuthService } from './auth.service';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';
import { LogoutResponseDto } from './dto/logout.dto';
import { RefreshRequestDto, RefreshResponseDto } from './dto/refresh.dto';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterRequestDto): Promise<RegisterResponseDto>;
    login(loginDto: LoginRequestDto): Promise<LoginResponseDto>;
    logout(req: Request): Promise<LogoutResponseDto>;
    refresh(refreshDto: RefreshRequestDto): Promise<RefreshResponseDto>;
}
