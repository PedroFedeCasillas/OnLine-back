import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Posts } from 'src/posts/entities/post.entity';

@Schema()
export class User extends Document {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  age: number;

  // @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }] })
  // posts: Posts[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ default: Date.now })
  deletedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
