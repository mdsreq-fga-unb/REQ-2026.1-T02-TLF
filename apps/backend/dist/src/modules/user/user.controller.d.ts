import { GetUserResponseDto } from './dto/get.dto';
import { DeleteUserResponseDto } from './dto/delete.dto';
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dto/update.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(userId: string): Promise<GetUserResponseDto>;
    deleteUser(userId: string): Promise<DeleteUserResponseDto>;
    updateUser(userId: string, updateUserDto: UpdateUserRequestDto): Promise<UpdateUserResponseDto>;
}
