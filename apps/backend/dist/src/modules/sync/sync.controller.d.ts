import { PullQueryDto, PullResponseDto } from './dto/pull';
import { PushBodyDto, PushQueryDto, PushResponseDto } from './dto/push';
import { SyncService } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    pull(userId: string, dto: PullQueryDto): Promise<PullResponseDto>;
    push(userId: string, query: PushQueryDto, body: PushBodyDto): Promise<PushResponseDto>;
}
