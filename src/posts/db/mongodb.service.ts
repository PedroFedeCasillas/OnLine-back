import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, mongo } from 'mongoose';
import { mongoExceptionHandler } from 'src/common/mongoExceptionHandler';
import { IPostDao } from './postDao';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Posts } from '../entities/post.entity';

@Injectable()
export class MongoDbService implements IPostDao {
  constructor(
    @InjectModel(Posts.name) private readonly _postModel: Model<Posts>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    try {
      const createPost = new this._postModel(createPostDto);
      await createPost.save();
      return createPost;
    } catch (error) {
      console.log('error', error);
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findAll(): Promise<Array<Posts>> {
    try {
      const results = await this._postModel.find().populate('userId').exec();
      return results;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async findById(id: string): Promise<Posts> {
    try {
      const post = await this._postModel.findById(id).populate('userId').exec();
      return post;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Posts> {
    try {
      const post = await this._postModel.findByIdAndUpdate(id, updatePostDto);
      return post;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  async remove(id: string): Promise<Posts> {
    try {
      const post = await this._postModel.findByIdAndDelete(id);
      return post;
    } catch (error) {
      if (error instanceof mongo.MongoError) mongoExceptionHandler(error);
      else throw error;
    }
  }

  // async addUserToPost(postId: string, userId: string): Promise<Posts> {
  //   try {
  //     const post = (await this._postModel.findById(postId));
  //     if (!post) {
  //       return null;
  //     }

  //     const userObjectId = new Types.ObjectId(userId);
  //     post.userId.push(userObjectId);
  //     await post.save();

  //     return post;
  //   } catch (error) {
  //     if (error instanceof mongo.MongoError) {
  //       mongoExceptionHandler(error);
  //     } else {
  //       throw error;
  //     }
  //   }
  // }
}
