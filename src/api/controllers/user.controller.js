import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import {
  findUser,
  insertGetId,
  getUser,
} from "../../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../../utils/apiResponse.js";
import { generateTokenService } from "../../security/auth/auth.service.js";
import { createEmployee } from "../../repositories/employee.repository.js";

const addUser = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, mobile, password, isAdmin, isActive } =
      req.body;

    const existedUser = await findUser(mobile);

    if (existedUser) {
      throw new ApiError(409, "User Already Exist");
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const userId = await insertGetId({
      firstName,
      lastName,
      mobile,
      password: encryptPassword,
      isAdmin,
      isActive,
    });

    const createdUser = await getUser(userId);

    if (!createdUser) {
      throw new ApiError(500, "Internal Server Error");
    }

    console.log(cre);
    if (createdUser.isAdmin == 0) {
      const employee = await createEmployee({
        userId: createdUser.id,
        firstName,
        lastName,
        mobile,
        name: firstName + " " + lastName,
      });
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully!"));
  } catch (error) {
    next(error);
  }
});

const login = asyncHandler(async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    if (!(mobile || password)) {
      throw new ApiError(400, "mobile or password is required");
    }

    const user = await findUser(mobile);

    if (!user) {
      throw new ApiError(404, "User does not exist or invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(404, "Wrong Password, Please input correct password.");
    }

    if (user.isActive === 0) {
      throw new ApiError(401, "You have been blocked by admin.");
    }

    const token = await generateTokenService(user);

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          token,
        },
        "User logged in successfully"
      )
    );
  } catch (error) {
    next(error);
  }
});

export { addUser, login };
