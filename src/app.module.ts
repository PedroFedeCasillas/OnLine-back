import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    UsersModule,
    PostModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
