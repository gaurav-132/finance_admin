import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

import {
  createCustomer,
  loanReq,
  getCustomers,
} from "../controllers/customer.controller.js";
import { customerSchema } from "../validators/customer.validator.js";

const router = express.Router();

router
  .route("/create-customer")
  .post(verifyJwt, validate(customerSchema), createCustomer);

router.route("/raise-loan-request").post(verifyJwt, validate(), loanReq);

// router.route("/get-customers").post(verifyJwt, getCustomers);

export { router as customerRoutes };
