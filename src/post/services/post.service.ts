import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPostDao } from '../db/postDao';
import { MongoDbService } from '../db/mongodb.service';

@Injectable()
export class PostService {
  private readonly _db: IPostDao
  constructor(
    readonly _mongoDbService: MongoDbService,
  ) {
    this._db = _mongoDbService
  }

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    try {
      const createPost = this._db.create(createPostDto);
      return createPost;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<Array<Posts>> {
    try {
      const results = await this._db.findAll();
      if (!results) throw new NotFoundException('Could not find any posts');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string): Promise<Posts> {
    try {
      const results = await this._db.findById(id);
      if (!results) throw new NotFoundException('Posts not found');
      return results;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<string> {
    try {
      const posts = await this._db.update(
        id,
        updatePostDto,
      );
      if (!posts) throw new NotFoundException('Posts not found');
      return `Post ${posts.id} updated successfully`;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const post = await this._db.remove(id);
      if (!post) throw new NotFoundException('Post not found');
      return `Post ${post.id} deleted successfully`;
    } catch (error) {
      throw error;
    }
  }
}
