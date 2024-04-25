import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from '../cloudinary.response';
import * as streamifier  from 'streamifier';
import axios from 'axios';
import Jimp from 'jimp';
@Injectable()
export class CloudinaryService {
  private readonly MAX_SIZE = 10485760;

  async uploadFromURL(imageUrl: string): Promise<CloudinaryResponse> {
    const Token = process.env.CURRENT_ACCESS_TOKEN;
    // Descargar la imagen de la URL
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: { Authorization: `Bearer ${Token}` },
    });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Subir el buffer a Cloudinary
    return this.uploadToCloudinary(imageBuffer);
  }

  // Puedes mantener tu método 'uploadFile' si todavía lo necesitas
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    this.compressImageIfNeeded(file);
    return this.uploadToCloudinary(file.buffer);
  }

  // Puedes mantener tu método 'uploadFile' si todavía lo necesitas
  async uploadFile2(imageBuffer: Buffer): Promise<CloudinaryResponse> {
    return this.uploadToCloudinary(imageBuffer);
  }

  private uploadToCloudinary(imageBuffer: Buffer): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        (error: CloudinaryResponse, result: CloudinaryResponse) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        },
      );
      streamifier.createReadStream(imageBuffer).pipe(stream);
    });
  }

  async compressImageIfNeeded(file: Express.Multer.File): Promise<Buffer> {
    if (file.size > this.MAX_SIZE) {
      const image = await Jimp.read(file.buffer);
      await image
        .resize(1024, Jimp.AUTO) // Ajusta el tamaño según necesidad
        .quality(80); // Ajusta la calidad

      return await image.getBufferAsync(Jimp.MIME_JPEG);
    } else {
      return file.buffer;
    }
  }
}
