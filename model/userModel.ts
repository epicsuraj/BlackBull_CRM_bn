import { model, Schema } from "mongoose";

interface User {
  username: string;
  email: string;
  profileImage: string;
  mobile: number;
  password: string;

  state: string;
  city: string;
  postalCode: string;
}

const UserSchema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  profileImage: { type: String },
  mobile: { type: Number},
  password: { type: String, required: true },
  state: { type: String },
  city: { type: String },
  postalCode: { type: String },
});

export default model<User>("user", UserSchema);
