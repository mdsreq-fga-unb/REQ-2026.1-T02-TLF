import { PrismaService } from '@common/prisma/prisma.service';
export declare class SeedService {
    private prisma;
    constructor(prisma: PrismaService);
    seedDefaultCategories(userId: string): Promise<void>;
}
