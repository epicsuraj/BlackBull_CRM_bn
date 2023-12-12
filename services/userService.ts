import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import user from "../model/userModel"
require("dotenv").config();
interface IUser {
  username: string;
  email: string;
  profileImage: any;
  mobile: string;
  password?: string;
  state: string;
  city: string;
  postalCode: Number;
}
export const signJWT = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as any, {
      expiresIn: "24h",
    });
  };

export const loginService = async (email: string, password: string) => {
    try {
      const users = await user.findOne({ email });
      console.log("user",{users})
      if (!users) throw new Error("User not found");
  
      if (!users.password) throw new Error("User not found");
  
      const isMatch = await bcrypt.compare(password, users.password);
      if (!isMatch) throw new Error("Invalid credentials");
  
      const payload = {
        user: {
          id: users._id,
          username: users.username,
          email: users.email,
          mobile: users.mobile,
          password: users.password,
          state: users.state,
          city: users.city,
          postalCode: users.postalCode,
        },
      };
  
      const token = signJWT(payload);
  
      return token;
    } catch (error) {
      throw new Error(`Error Login user: ${error.message}`);
    }
  };

  export const registerUserService=async(iuser: IUser)=>{
try{
  const users = await user.findOne({ email: iuser.email });
  if (users) throw new Error("User already exists");
  if (!iuser.email || !iuser.password || !iuser.username)throw new Error("Please fill all fields");
  const hashedPassword = await bcrypt.hash(iuser.password, 10);

    const newUser = new user({
      ...iuser,
      password: hashedPassword,
    });
    console.log("newUser", newUser);
    const createdUser = await newUser.save();
    console.log("Line no 53", createdUser);
    return createdUser;

}catch (error) {
    throw new Error(`Error Register user: ${error.message}`);
  }
  }