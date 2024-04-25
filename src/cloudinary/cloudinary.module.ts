import { Module } from '@nestjs/common';
import { CloudinaryService } from './services/cloudinary.service';
import { CloudinaryController } from './controllers/cloudinary.controller';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
