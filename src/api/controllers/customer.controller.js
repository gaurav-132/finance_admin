import { createCustomerService } from "../../repositories/customer.repository.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const createCustomer = asyncHandler(async (req, res, next) => {

    const {
        aadhaarNumber,
        panNumber,
        chequePhoto,
        firstName,
        lastName,
        mobileNumber,
        occupation,
        permanentAddress,
        currentAddress,
        workLocation,
        addedBy,
    } = req.body;

    await createCustomerService({
        aadhaarNumber,
        panNumber,
        chequePhoto,
        firstName,
        lastName,
        mobileNumber,
        occupation,
        permanentAddress,
        currentAddress,
        workLocation,
        addedBy,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                "Customer Created Successfully"
            )
        );

});


const loanReq = asyncHandler(async(req, res) => {
    const { customerId, loanAmount,check } = req.body;
    await loanReqService();
})

export { createCustomer, loanReq };
