import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { Posts } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Posts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<Posts> {
    return this.postService.create(createPostDto);
  }

  @Get()
  async getAll(): Promise<Posts[]> {
    return this.postService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePostDto) {
    return this.postService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }

  // @Post(':postId/users/:userId')
  // async addUserToPost(@Param('postId') postId: string, @Param('userId') userId: string) {
  //   return this.postService.addUserToPost(postId, userId);
  // }

}
