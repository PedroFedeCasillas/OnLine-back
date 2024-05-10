import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { User } from 'src/users/entities/user.entity';


@Schema()
export class Posts extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  deletedAt: Date;

  @Prop({ type: 'ObjectId', ref: 'User' })
  userId: string; 

  @Prop({type: String})
  imageUrl: string;

}

export const PostSchema = SchemaFactory.createForClass(Posts);
