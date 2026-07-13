import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../model/username.model.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new ApiError(401, "Unauthorised request");

    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(payload?._id).select(
      "-password -refreshToken",
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});
