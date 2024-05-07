import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe , ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINNER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(':id')  // GET  /users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }
    @Delete(':id')  // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }


}
