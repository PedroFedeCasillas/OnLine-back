import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { IPostDao } from '../db/postDao';
import { MongoDbService } from '../db/mongodb.service';
import { CloudinaryService } from 'src/cloudinary/services/cloudinary.service';

@Injectable()
export class PostService {
  private readonly _db: IPostDao
  constructor(
    readonly _mongoDbService: MongoDbService,
    private readonly cloudinaryService: CloudinaryService,
  ) {
    this._db = _mongoDbService
  }

  // async addOne(createPostDto: CreatePostDto, imageFile: Express.Multer.File): Promise<Posts> {
  //   try {
  //     console.log('Contenido del archivo en PostService:', imageFile);
  //     // Subir la imagen a Cloudinary y obtener la URL
  //     const cloudinaryResponse = await this.cloudinaryService.uploadFile(imageFile);
  //     const imageUrl = cloudinaryResponse.url;
  //     // Construir el objeto CreatePostDto con la URL de la imagen
  //     const finalPostData = {
  //       ...createPostDto,
  //       imageUrl: imageUrl,
  //     };
  //     // Crear el post en la base de datos
  //     const createdPost = await this._db.create(finalPostData);
  //     return createdPost;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

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

  // async addUserToPost(postId: string, userId: string): Promise<Posts> {
  //   return this._db.addUserToPost(postId, userId);
  // }
  

}