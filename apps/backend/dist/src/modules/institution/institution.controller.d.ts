import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionController {
    private readonly institutionService;
    constructor(institutionService: InstitutionService);
    create(userId: string, dto: CreateInstitutionDto): Promise<{
        name: string;
        id: string;
        icon: string | null;
        color: string;
        logoUrl: string | null;
    }>;
    findAll(userId: string): Promise<{
        name: string;
        id: string;
        icon: string | null;
        color: string;
        logoUrl: string | null;
    }[]>;
    findOne(userId: string, id: string): Promise<{
        name: string;
        id: string;
        icon: string | null;
        color: string;
        logoUrl: string | null;
    }>;
    update(userId: string, id: string, dto: UpdateInstitutionDto): Promise<{
        name: string;
        id: string;
        icon: string | null;
        color: string;
        logoUrl: string | null;
    }>;
    remove(userId: string, id: string): Promise<{
        message: string;
    }>;
}
