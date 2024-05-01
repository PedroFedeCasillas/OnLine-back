import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';


@Schema()
export class Posts extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  deletedAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({type: String})
  imageUrl: string;

}

export const PostSchema = SchemaFactory.createForClass(Posts);
