import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./Auth.services";

const loginUser = asyncHandler(async (req, res) => {
 
  const result = await AuthServices.loginUser(req.body);

  if (!result) {

  return sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message: 'User not found!',
    data: {},
  });
   
  }
 
  const { refreshToken, accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});


export const AuthController = {
  loginUser,
};