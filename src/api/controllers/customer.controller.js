import {
    createCustomerService,
    getCustomersService,
    loanRequestService,
    getLoanRequestsService,
    dispatchActionService,
} from "../../repositories/customer.repository.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const createCustomer = asyncHandler(async (req, res, next) => {
    console.log(req);
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
        .json(new ApiResponse(200, "Customer Created Successfully"));
});

const loanRequest = asyncHandler(async (req, res) => {
    const { customerId, loanAmount, check } = req.body;

    console.log(req.body)

    await loanRequestService({ customerId, loanAmount, check });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    message:"Loan request submitted successfully!"
                },
            )
        )
});

const getCustomers = asyncHandler(async (req, res, next) => {
    try {
        const { total, limit, page } = req.body;

        const customers = await getCustomersService({
            total,
            limit,
            page,
        });

        const data = {
            customers,
            total: 2,
            page: 1,
        };

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    data, 
                    "Customers Fetched Successfully"
                )
            );
    } catch (error) {
        next(error);
    }
});

const getLoanRequests =  asyncHandler(async(req, res) => {
    const { page, limit, customerName} = req.body;

    const offset = (page - 1) * limit;
    
    const { loanRequests, total } = await getLoanRequestsService({ limit, page, offset, customerName });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    page,
                    limit,
                    total,
                    loanRequests,
                }
            )
        );
})

const dispatchAction = asyncHandler(async(req,res) => {

    let message;

    const { action, id, tax, totalAmount } = req.body;
    console.log("Before Service Call", {action, id, tax, totalAmount});

    await dispatchActionService({action, id, tax, totalAmount});

    if(action == 1){
        message = "Loan Request Approved Successfully!";
    }else{
        message = "Loan Request Rejected Successfully!";
    }


    return res  
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    message,
                }
            )
        );
});

export { 
    createCustomer, 
    loanRequest, 
    getCustomers,
    getLoanRequests, 
    dispatchAction,
};
