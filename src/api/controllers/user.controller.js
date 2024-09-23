import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import {
    findUser,
    insertGetId,
    getUser,
    getUsersService,
    deleteUserService,
} from "../../repositories/user.repository.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../../utils/apiResponse.js";
import { generateTokenService } from "../../security/auth/auth.service.js";
import { createEmployee } from "../../repositories/employee.repository.js";

const addUser = asyncHandler(async (req, res, next) => {
    
    const { firstName, lastName, mobile, password, isAdmin, isActive } = req.body;

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
        .json(
            new ApiResponse(
                200, 
                createdUser, 
                "User registered successfully!"
            )
        );
    
});

const login = asyncHandler(async (req, res, next) => {
    const { mobile, password } = req.body;

    if (!(mobile || password)) {
      throw new ApiError(400, "mobile or password is required");
    }

    const user = await findUser(mobile);
    console.log(user);

    if (!user) {
      throw new ApiError(402, "User does not exist or invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(402, "Wrong Password, Please input correct password.");
    }

    if (user.isActive === 0) {
      throw new ApiError(402, "You have been blocked by admin.");
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
});

const getUsers = asyncHandler(async(req,res) => {
    let { page, limit, name } = req.body;
    
    const offset = (page - 1) * limit;

    const { users, total } = await getUsersService({page, limit, name, offset});

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    users,
                    page,
                    limit,
                    total
                },
                "Users fetched successfully"
            )
        );

})

const deleteUserController = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await getUser(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await deleteUserService(userId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export { addUser, login, getUsers, deleteUserController };
