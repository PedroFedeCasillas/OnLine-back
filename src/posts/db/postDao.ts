import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Posts } from "../entities/post.entity";


export interface IPostDao {
  
  create(createPostDto: CreatePostDto): Promise<Posts>;

  findAll(): Promise<Posts[]>;

  findById(id: string): Promise<Posts>;

  update(id: string, updatePostDto: UpdatePostDto): Promise<Posts>;

  remove(id: string): Promise<Posts>;

  // addUserToPost(postId: string, userId: string): Promise<Posts>;
}