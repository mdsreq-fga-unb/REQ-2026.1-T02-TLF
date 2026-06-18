import { Injectable } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { DEFAULT_CATEGORIES } from '@config/ui-options'

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seedDefaultCategories(userId: string) {
    for (const category of DEFAULT_CATEGORIES) {
      await this.prisma.category.upsert({
        where: {
          userId_name: {
            userId,
            name: category.name,
          },
        },
        update: {},
        create: {
          name: category.name,
          icon: category.icon,
          color: category.color,
          userId,
        },
      })
    }
  }
}
