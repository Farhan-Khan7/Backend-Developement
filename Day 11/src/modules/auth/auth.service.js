import ApiError from "../../common/utils/ApiError.js";
import ApiResponse from "../../common/utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
  verifyRefreshToken,
} from "../../common/utils/jwt.utils.js";
import userModel from "./auth.model.js";

const register = async ({ name, email, password, role }) => {
  const isUserExist = userModel.findOne({ email });

  if (isUserExist) throw ApiError.conflict("This email is already exists");

  const userObj = await userModel.create({
    name,
    email,
    password,
    role,
  });

  return userObj;
};

const login = async ({ email, password }) => {
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) throw ApiError.unauthorized("Invalid email or Password");

  if (!user.isVerified) {
    throw ApiError.forbidden("Please verify your email before login");
  }

  const accessToken = generateAccessToken({ userId: user._id });
  const refreshToken = generateRefreshToken({ userId: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async ({ token }) => {
  if (!token) throw ApiError.unauthorized("Refresh Token missing");

  const decoded = verifyRefreshToken(token);

  const user = await userModel.findById(decoded.id).select("+refreshToken");

  if (!user) throw ApiError.unauthorized("User not found!");

  if (user.refreshToken !== hashToken(token))
    throw ApiError.unauthorized("Invalid Refresh Token");

  const accessToken = generateAccessToken({ id: user._id });
  const refreshToken = generateRefreshToken({ id: user._id });

  user.refreshToken = hashToken(refreshToken);
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

const logout = async ({ userId }) => {
  const user = await userModel.findById({ userId });

  if (!user) throw ApiError.unauthorized("User not found!");

  user.refreshToken = undefined;

  await user.save({ validateBeforeSave: false });
};
export { register };
