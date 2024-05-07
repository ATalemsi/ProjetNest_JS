import { Injectable } from '@nestjs/common';
import { Error, Model , Error as MongooseError ,  Document} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { User,UserDocument  } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(role?: 'INTERN' | 'ENGINNER' | 'ADMIN'): Promise<User[]> {
        let users: UserDocument[];
        
        if (role) {
          users = await this.userModel.find({ role }).exec();
          if (users.length === 0) {
            throw new NotFoundException(`No users found with role: ${role}`);
          }
        } else {
          users = await this.userModel.find().exec();
        }
    
        return users;
      }


      async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException('User Not Found');
        }
        return user;
      }

      async findOneEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email}).exec();
        if (!user) {
          throw new NotFoundException('User Not Found');
        }
        return user.toObject();
      }
      async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
        try {
          const userToCreate = {
            ...createUserDto,
            password: hashedPassword,
          };
    
          
          const createdUser = new this.userModel(userToCreate);
          return await createdUser.save();
        } catch (error) {
          if (error.code === 11000 && error.keyPattern.email === 1) {
            throw new NotFoundException('Email already exists');
          } 
          throw error;
        }
      }

      async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        try {
          const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
          if (!updatedUser) {
            throw new NotFoundException('User Not Found');
          }
          return updatedUser;
        } catch (error) {
          if (error.name === 'CastError') {
            throw new NotFoundException('Invalid user ID format');
          }else{
            throw new NotFoundException('Email already exists');
          }
          throw error;
        }
      }

    delete(id: string){
        const removedUser =  this.userModel.findByIdAndDelete(id);
        return removedUser;
    }

    
}