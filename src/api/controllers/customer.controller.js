import {
  createCustomerService,
  getCustomersService,
  loanRequestService,
  getLoanRequestsService,
  dispatchActionService,
  saveDailyCollectionService,
  checkValidCustomerService,
  checkValidLoanService,
  getCustomerDetailsService,
} from "../../repositories/customer.repository.js";
import { adjustLoanBalanceService } from "../../repositories/loan.repository.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import moment from "moment-timezone";

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

  console.log(req.body);

  await loanRequestService({ customerId, loanAmount, check });

  return res.status(201).json(
    new ApiResponse(201, {
      message: "Loan request submitted successfully!",
    })
  );
});

const getCustomers = asyncHandler(async (req, res, next) => {
  let { limit, page } = req.body;

  const offset = (page - 1) * limit;

  const { customers, total } = await getCustomersService({
    limit,
    page,
    offset,
  });

  const data = {
    customers,
    total,
    page,
    limit,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Customers Fetched Successfully"));
});

const getLoanRequests = asyncHandler(async (req, res) => {
  const { page, limit, customerName, loanStatus, locationId } = req.body;

  const offset = (page - 1) * limit;

  const filterObj = { page, limit, customerName, loanStatus, locationId };

  const { loanRequests, total } = await getLoanRequestsService(filterObj);

  return res.status(201).json(
    new ApiResponse(201, {
      page,
      limit,
      total,
      loanRequests,
    })
  );
});

const dispatchAction = asyncHandler(async (req, res) => {
  let message;

  const { action, id, tax, totalAmount } = req.body;
  console.log("Before Service Call", { action, id, tax, totalAmount });

  await dispatchActionService({ action, id, tax, totalAmount });

  if (action == 1) {
    message = "Loan Request Approved Successfully!";
  } else {
    message = "Loan Request Rejected Successfully!";
  }

  return res.status(201).json(
    new ApiResponse(201, {
      message,
    })
  );
});

const addDailyCollection = asyncHandler(async (req, res, next) => {
  const { customerId, loanId, date, amount, paymentMode } = req.body;
  const user = req.user;

  const formData = {
    customerId,
    loanId,
    date: moment(date).format("YYYY-MM-DD"),
    amount,
    paymentMode,
    collectedBy: user.id,
  };

  const checkCustomer = checkValidCustomerService(customerId);

  if (!checkCustomer) {
    throw new ApiError(404, "Please select a valid customer");
  }

  const checkLoan = checkValidLoanService(loanId);

  if (!checkLoan) {
    throw new ApiError(404, "Process this activity for a valid loan");
  }

  const collectionId = await saveDailyCollectionService(formData);

  if (collectionId) {
    await adjustLoanBalanceService(collectionId);
  }

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Daily collection added successfully!",
    })
  );
});

const getCustomerDetailsController = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customerData = await getCustomerDetailsService(customerId);

  return res.status(200).json(new ApiResponse(200, customerData, "Customer details fetched successfully"));
});

export {
  createCustomer,
  loanRequest,
  getCustomers,
  getLoanRequests,
  dispatchAction,
  addDailyCollection,
  getCustomerDetailsController
};
