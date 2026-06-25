import { AuthUserDto } from './auth-user.dto';
export declare class LoginRequestDto {
    email: string;
    password: string;
}
export declare class LoginResponseDto {
    user: AuthUserDto;
    accessToken: string;
    refreshToken: string;
}
