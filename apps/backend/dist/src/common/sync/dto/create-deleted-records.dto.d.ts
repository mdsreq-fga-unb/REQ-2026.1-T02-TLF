import { Prisma, TableName } from 'generated/prisma/client';
export type CreateDeletedRecordsDto = {
    tx: Prisma.TransactionClient;
    userId: string;
    tableName: TableName;
    recordIds: string[];
};
