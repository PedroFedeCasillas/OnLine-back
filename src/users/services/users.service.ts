import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
      ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
      }
    
      async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
      }
    
      async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
          throw new NotFoundException('User not found');
        }
        return user;
      }
    
      async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = await this.userModel
          .findByIdAndUpdate(id, updateUserDto, { new: true })
          .exec();
        if (!updatedUser) {
          throw new NotFoundException('User not found');
        }
        return updatedUser;
      }
    
      async remove(id: string): Promise<User> {
        const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedUser) {
          throw new NotFoundException('User not found');
        }
        return deletedUser;
      }

}
