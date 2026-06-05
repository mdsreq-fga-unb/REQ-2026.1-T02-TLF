import { Injectable } from '@nestjs/common'
import { PrismaService } from '@common/prisma/prisma.service'
import { DEFAULT_ACCOUNTS, DEFAULT_CATEGORIES, DEFAULT_INSTITUTION } from '@config/ui-options'

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
          ...category,
          userId,
        },
      })
    }
  }

  // cria uma instituição default a contas para usuarios novos
  async seedDefaultAccounts(userId: string) {
    const existing = await this.prisma.institution.findFirst({ where: { userId } })
    if (existing) return

    await this.prisma.institution.create({
      data: {
        userId,
        name: DEFAULT_INSTITUTION.name,
        color: DEFAULT_INSTITUTION.color,
        accounts: {
          create: DEFAULT_ACCOUNTS.map((account) => ({
            name: account.name,
            type: account.type,
          })),
        },
      },
    })
  }
}
