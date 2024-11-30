import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser } from "./Auth.interface";
import config from "../../config";
import bcryptJs from 'bcryptjs';
import { createToken } from "./Auth.utils";
import UserModel from "../User/User.model";

const loginUser = async (payload: TLoginUser) => {
    const user = await UserModel.findOne({ email: payload.email });
    if (user?.isBlocked) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is blocked , Please contact admin');
    }
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    } else {

      if (!payload.password) {
        throw new  AppError(httpStatus.NOT_FOUND, 'Password is required');
      }
  
      if (payload.password) {
        const isPasswordMatched = await bcryptJs.compare(
          payload.password,
          user.password,
        );
  
        if (!isPasswordMatched) {
          throw new AppError(httpStatus.NOT_FOUND, 'Password Incorrect!');
        }
        const jwtPayload = {
          name: user.name,
          email: user.email,
          role: user.role,
          _id: user._id,
         
        };
    
        const accessToken = createToken(
          jwtPayload,
          config.jwt_access_secret as string,
          config.jwt_access_expires_in as string,
        );
    
        const refreshToken = createToken(
          jwtPayload,
          config.jwt_refresh_secret as string,
          config.jwt_refresh_expires_in as string,
        );
    
        return {
          accessToken,
          refreshToken,
        };
        
      }

 

    }
  
  };


  export const AuthServices = {
    loginUser,
  }
