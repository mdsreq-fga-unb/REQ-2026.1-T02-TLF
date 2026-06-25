import { RecurrenceService } from './recurrence.service';
import { CreateRecurrenceDto } from './dto/create-recurrence.dto';
import { UpdateRecurrenceDto } from './dto/update-recurrence.dto';
import { FilterRecurrenceDto } from './dto/filter-recurrence.dto';
import { RecurrenceListResponseDto } from './dto/recurrence-list.response.dto';
import { RecurrenceDetailResponseDto } from './dto/recurrence-detail.response.dto';
import { DeleteRecurrenceDto } from './dto/delete-recurrence.dto';
export declare class RecurrenceController {
    private readonly recurrenceService;
    constructor(recurrenceService: RecurrenceService);
    create(userId: string, dto: CreateRecurrenceDto): Promise<RecurrenceDetailResponseDto>;
    findAll(userId: string, query: FilterRecurrenceDto): Promise<RecurrenceListResponseDto>;
    findOne(userId: string, id: string): Promise<RecurrenceDetailResponseDto>;
    update(userId: string, id: string, dto: UpdateRecurrenceDto): Promise<RecurrenceDetailResponseDto>;
    remove(userId: string, id: string, query: DeleteRecurrenceDto): Promise<RecurrenceDetailResponseDto>;
}
