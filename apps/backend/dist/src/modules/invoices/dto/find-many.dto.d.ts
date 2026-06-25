import { InvoiceStatus } from 'generated/prisma/client';
import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export declare class FindManyInvoicesDto extends SyncFindManyBaseDto {
    id?: string;
    accountId?: string;
    status?: InvoiceStatus;
    referenceMonth?: number;
    referenceYear?: number;
}
