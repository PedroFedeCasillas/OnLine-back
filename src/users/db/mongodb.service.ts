import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserDao } from './userDao';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class MongoDbService implements IUserDao {
  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this._userModel.findOne(createUserDto).exec();
      if (existingUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario ya existe.',
        });
      }

      const createdUser = new this._userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     const createdUser = new this._userModel(createUserDto);
  //     return createdUser.save();
  //   } catch (error) {
  //     if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
  //     else throw error;
  //   }
  // }

  async findAll(): Promise<User[]> {
    try {
      return this._userModel.find().exec();
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this._userModel.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this._userModel.findById(id).exec();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `No user found with id ${id}`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this._userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
      if (!updatedUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Error updating with id ${id}`,
        });
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this._userModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Error when deleting with id ${id}`,
        });
      }
      return deletedUser;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }
}
