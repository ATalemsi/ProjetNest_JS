import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Categorie, CategorieSchema } from '../schemas/categorie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
