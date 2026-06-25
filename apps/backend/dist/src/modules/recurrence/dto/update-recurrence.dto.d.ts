import { CreateRecurrenceDto } from './create-recurrence.dto';
import { RecurrenceApplyScope } from '../enums/recurrence-apply-scope.enum';
declare const UpdateRecurrenceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecurrenceDto>>;
export declare class UpdateRecurrenceDto extends UpdateRecurrenceDto_base {
    applyScope?: RecurrenceApplyScope;
}
export {};
