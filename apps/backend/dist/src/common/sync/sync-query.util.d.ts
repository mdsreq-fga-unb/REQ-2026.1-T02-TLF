import { SyncFindManyBaseDto } from '@common/sync/dto/sync-find-many-base.dto';
export type SyncTimestampFilter = Pick<SyncFindManyBaseDto, 'createdAfter' | 'updatedAfter'>;
export declare function buildTimestampWhere(filter: SyncTimestampFilter): {
    OR: ({
        createdAt: {
            gt: Date;
        };
        updatedAt?: undefined;
    } | {
        updatedAt: {
            gt: Date;
        };
        createdAt?: undefined;
    })[];
    createdAt?: undefined;
    updatedAt?: undefined;
} | {
    createdAt: {
        gt: Date;
    };
    OR?: undefined;
    updatedAt?: undefined;
} | {
    updatedAt: {
        gt: Date;
    };
    OR?: undefined;
    createdAt?: undefined;
} | {
    OR?: undefined;
    createdAt?: undefined;
    updatedAt?: undefined;
};
