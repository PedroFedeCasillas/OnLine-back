import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserDao } from '../db/userDao';
import { MongoDbService } from '../db/mongodb.service';
import * as bcrypt from 'bcrypt';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UserService {
  private readonly _db: IUserDao;
  constructor(
    readonly _mongoDbService: MongoDbService,
    // private readonly cloudinaryService: CloudinaryService,
  ) {
    this._db = _mongoDbService;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this._db.findOneByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        +process.env.HASH_SALT,
      );
      return await this._db.create(createUserDto);
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     const hash = await this.hashPassword(createUserDto.password);
  //     const newUser = await this._db.create({
  //       ...createUserDto,
  //       password: hash,
  //     });
  //     return newUser;
  //   } catch (error) {
  //     throw ErrorManager.createSignaturError(error.message);
  //   }
  // }

  async getAll(): Promise<Array<User>> {
    try {
      const results = await this._db.findAll();
      if (!results) throw new NotFoundException('Could not find any users');
      return results;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user = await this._db.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    try {
      const user = await this._db.update(id, updateUserDto);
      if (!user) throw new NotFoundException('User not found');
      return `User ${user.id} updated successfully`;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const user = await this._db.remove(id);
      if (!user) throw new NotFoundException('User not found');
      return `User ${user.id} deleted successfully`;
    } catch (error) {
      throw ErrorManager.createSignaturError(error.message);
    }
  }
}
