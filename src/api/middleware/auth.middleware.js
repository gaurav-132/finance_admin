import { ApiError } from "../../utils/apiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import { getUser } from "../../repositories/user.repository.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "").trim();


    if (!token) {
        throw new ApiError(401, "Unauthorized Request!");
    }

    try {

        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) return  reject(err);
                resolve(decoded);
            });
        });



        const user = await getUser(decodedToken?.userId);

        if (!user) {
            throw new ApiError(401, "Invalid Access Token!");
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            next(new ApiError(401, "Token Expired"));
        } else {
            next(new ApiError(401, "Invalid Access Token"));
        }
    }
});
