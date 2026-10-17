import ApiError from "../../common/utils/ApiError.js";
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

export { register };
