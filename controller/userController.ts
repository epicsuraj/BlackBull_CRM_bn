import { Request,Response } from "express";
import {loginService,registerUserService} from "../services/userService"

export const handleUserRegisterController=async(req:Request,res:Response)=>{
    try{
        const {
            username,
            email,
            mobile,
            profileImage,
            password,
            state,
            city,
            postalCode,
          } = req.body;
          const payload = {
            username,
            email,
            profileImage:profileImage===null? "":profileImage,
            mobile,
            password,
            state,
            city,
            postalCode,
          };
          console.log("payload ",payload)
          const user = await registerUserService(payload);
      res.status(200).json({ user });
    }catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export const userLoginController=async(req:Request,res:Response)=>{
try{
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 72 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production",
      })
      .status(200);

    return res.json({
      success: true,
      message: "Login successful",
      data: token,
    });

}catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}