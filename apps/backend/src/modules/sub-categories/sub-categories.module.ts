import { Module } from '@nestjs/common'
import { SubCategoriesService } from './sub-categories.service'

@Module({
  providers: [SubCategoriesService],
  exports: [SubCategoriesService],
})
export class SubCategoriesModule {}
