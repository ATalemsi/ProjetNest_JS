import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorie } from 'src/schemas/categorie.schema';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Categorie.name) private categorieModel: Model<Categorie>) {}

    async findAll(): Promise<Categorie[]> {
        return this.categorieModel.find().exec();
      }
    
    async findOne(id: string): Promise<Categorie> {
        const user = await this.categorieModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException('Categorie Not Found');
        }
        return user;
    }

    async create(createCategorieDto: CreateCategorieDto): Promise<Categorie> {
        try {
          const createdCategorie = new this.categorieModel(createCategorieDto);
          return await createdCategorie.save();
        } catch (error) {
          if (error.code === 11000 && error.keyPattern.name === 1) {
            throw new NotFoundException('Name already exists');
          } 
          throw error;
        }
    }

    async update(id: string, updateCategorieDto: UpdateCategorieDto): Promise<Categorie> {
        try {
          const updatedCategorie = await this.categorieModel.findByIdAndUpdate(id, updateCategorieDto, { new: true }).exec();
          if (!updatedCategorie) {
            throw new NotFoundException('Categorie Not Found');
          }
          return updatedCategorie;
        } catch (error) {
          if (error.name === 'CastError') {
            throw new NotFoundException('Invalid categorie ID format');
          }else{
            throw new NotFoundException('Categorie already exists');
          }
          throw error;
        }
      }

      delete(id: string){
        const removedCategorie =  this.categorieModel.findByIdAndDelete(id);
        return removedCategorie;
      }
}
