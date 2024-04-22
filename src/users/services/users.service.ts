import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserDao } from '../db/userDao';
import { MongoDbService } from '../db/mongodb.service';

@Injectable()
export class UserService {
  private readonly _db: IUserDao;
  constructor(
    readonly _mongoDbService: MongoDbService,
    // private readonly cloudinaryService: CloudinaryService,
  ) {
    this._db = _mongoDbService;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createUser = this._db.create(createUserDto);
      return createUser;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<User>> {
    try {
      const results = await this._db.findAll();
      if (!results) throw new NotFoundException('Could not find any users');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<User> {
    try {
      const user = await this._db.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    try {
      const user = await this._db.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return `User ${user.id} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const user = await this._db.remove(id);
      if (!user) throw new NotFoundException('User not found');
      return `User ${user.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }
}
