import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const errorHandlerLoader = (app) => {
    app.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
        } else {
            res.status(500).json(new ApiResponse(500, null, err.message));
        }
    });
};

export default errorHandlerLoader;
