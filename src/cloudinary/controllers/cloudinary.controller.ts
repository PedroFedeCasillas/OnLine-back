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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Cloudinary')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Sube una imagen a Cloudinary',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen a subir',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Imagen cargada con éxito' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
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
  @ApiOperation({ summary: 'Carga una imagen a Cloudinary desde una URL' })
  @ApiResponse({ status: 201, description: 'Imagen cargada con éxito' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @ApiBody({
    description: 'URL de la imagen a cargar',
    required: true,
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          description: 'La URL de la imagen que se va a cargar a Cloudinary',
        },
      },
    },
  })
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
