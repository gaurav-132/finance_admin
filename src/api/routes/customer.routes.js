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
} from "../controllers/customer.controller.js";

import { customerSchema, collectionSchema } from "../validators/customer.validator.js";

const router = express.Router();

router
  .route("/create-customer")
  .post(verifyJwt, validate(customerSchema), createCustomer);

router.route("/raise-loan-request").post(verifyJwt, loanRequest);
router.route("/get-loan-requests").post(verifyJwt, getLoanRequests);
router.route("/dispatch-action").post(verifyJwt, dispatchAction);

router.route("/get-customers").post(verifyJwt, getCustomers);
router.route("/add-daily-collection").post(verifyJwt, validate(collectionSchema) , addDailyCollection);

export { router as customerRoutes };
