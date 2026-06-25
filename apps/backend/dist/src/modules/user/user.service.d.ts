import { PrismaService } from '@common/prisma/prisma.service';
import { GetUserRequestDto, GetUserResponseDto } from './dto/get.dto';
import { DeleteUserRequestDto, DeleteUserResponseDto } from './dto/delete.dto';
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dto/update.dto';
import { SupabaseService } from '@modules/supabase/supabase.service';
export declare class UserService {
    private readonly prisma;
    private readonly supabase;
    constructor(prisma: PrismaService, supabase: SupabaseService);
    getUser(dto: GetUserRequestDto): Promise<GetUserResponseDto>;
    deleteUser(dto: DeleteUserRequestDto): Promise<DeleteUserResponseDto>;
    updateUser(dto: {
        userId: string;
    } & UpdateUserRequestDto): Promise<UpdateUserResponseDto>;
}
