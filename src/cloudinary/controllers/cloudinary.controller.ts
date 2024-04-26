import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { CloudinaryService } from '../services/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Cloudinary')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  //método para subir una imagen a Cloudinary
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Post('uploadurl')
  async uploadImageFromURL(@Body('url') imageUrl: string) {
    return this.cloudinaryService.uploadFromURL(imageUrl);
  }

  @Post('uploadbuffer')
  async uploadImageToCloudinary(@Body('imageBuffer') imageBuffer: Buffer) {
    if (!imageBuffer) {
      throw new BadRequestException(
        'No se proporcionó un buffer de imagen válido.',
      );
    }
    console.log('imageBuffer', imageBuffer);
    const uploadedImageUrl =
      await this.cloudinaryService.uploadFile2(imageBuffer);
    return { imageUrl: uploadedImageUrl };
  }

}
