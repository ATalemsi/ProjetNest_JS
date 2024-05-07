import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
enum role  {
    admin = "ADMIN",
    engenner = "ENGINNER",
    intern = "INTREN"
}
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: role;
}
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({unique:true})
  email: string;

  @Prop({required:true})
  password :string;

  @Prop()
  role: role;
}

export const UserSchema = SchemaFactory.createForClass(User);