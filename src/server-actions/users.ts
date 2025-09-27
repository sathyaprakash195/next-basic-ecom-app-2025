"use server";
import { connectToMongoDB } from "@/config/mongodb-config";
import { IUser } from "@/interfaces";
import UserModel from "@/models/user-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectToMongoDB();

export const registerUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : check if user already exists , if yes then throw error
    const userExists = await UserModel.findOne({ email: payload.email });
    if (userExists) throw new Error("User already exists with this email");

    // step 2 : hash the password
    const hashedPassword = await bcrypt.hash(payload.password!, 10);
    payload.password = hashedPassword;

    // step 3 : save the user to db
    await UserModel.create(payload);
    return { success: true, message: "User registered successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const loginUser = async (payload: Partial<IUser>) => {
  try {
    // step 1 : check if user exists , if not then throw error
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) throw new Error("User does not exist with this email");

    // step 2 : compare the password , if not match then throw error
    const isMatch = await bcrypt.compare(payload.password!, user.password!);
    if (!isMatch) throw new Error("Invalid password");

    // step 3 : generate JWT token with _id , email , give it to user
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return {
      success: true,
      message: "User logged in successfully",
      data: token,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const getLoggedInUser = async () => {
  try {
    // step 1 : get the token from cookies
    const cookieStore: any = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Invalid authentication");

    // step 2 : verify the token
    const decryptedData = jwt.verify(token, process.env.JWT_SECRET!);
    const { _id, email } = decryptedData as { _id: string; email: string };

    // step 3 : fetch the user from db using email
    const user = await UserModel.findOne({ email }).select("-password -__v");
    if (!user) throw new Error("User not found");
    return {
      success: true,
      message: "User fetched successfully",
      data: JSON.parse(JSON.stringify(user)),
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
