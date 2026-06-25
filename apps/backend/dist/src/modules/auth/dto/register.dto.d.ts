import { AuthUserDto } from './auth-user.dto';
export declare class RegisterRequestDto {
    name: string;
    email: string;
    password: string;
}
export declare class RegisterServiceResponseDto {
    userId: string;
}
export declare class RegisterResponseDto {
    user: AuthUserDto;
    accessToken: string;
    refreshToken: string;
}
