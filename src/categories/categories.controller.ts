import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
   
    @Get()
    findAll() {
        return this.categoriesService.findAll()
    }

    @Get(':id')  
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id)
    }
    @Post() 
    create(@Body(ValidationPipe) createCategorieDto: CreateCategorieDto) {
        return this.categoriesService.create(createCategorieDto)
    }

    @Patch(':id') 
    update(@Param('id') id: string, @Body(ValidationPipe) updateCategorieDto: UpdateCategorieDto) {
        return this.categoriesService.update(id, updateCategorieDto)
    }
    @Delete(':id')  
    delete(@Param('id') id: string) {
        return this.categoriesService.delete(id)
    }

}
