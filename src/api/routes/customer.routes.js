import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

import {
    createCustomer,
    loanRequest,
    getCustomers,
    getLoanRequests,
    dispatchAction,
    addDailyCollection,
    getCustomerDetailsController,
    getLoanDetailsController,
    getTransactions,
} from "../controllers/customer.controller.js";

import { customerSchema, collectionSchema } from "../validators/customer.validator.js";

const router = express.Router();

router.route("/create-customer").post( verifyJwt, validate(customerSchema),createCustomer);

router.route("/raise-loan-request").post(verifyJwt, loanRequest);
router.route("/get-loan-requests").post(verifyJwt, getLoanRequests);
router.route('/get-loan/:loanId').post( getLoanDetailsController);
router.route("/dispatch-action").post(verifyJwt, dispatchAction);

router.route("/get-customers").post(getCustomers);
router.route("/get-customer/:customerId").post(verifyJwt,getCustomerDetailsController);
router.route("/add-daily-collection").post( validate(collectionSchema) , addDailyCollection);
router.route("/transactions").post(getTransactions);


export { router as customerRoutes };
