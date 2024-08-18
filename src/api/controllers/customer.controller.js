import {
  createCustomerService,
  getCustomersService,
} from "../../repositories/customer.repository.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

const createCustomer = asyncHandler(async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
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
      .json(new ApiResponse(200, data, "Customers Fetched Successfully"));
  } catch (error) {
    next(error);
  }
});

export { createCustomer, getCustomers };
