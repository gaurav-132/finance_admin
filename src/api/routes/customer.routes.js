import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { createCustomer, loanReq } from "../controllers/customer.controller.js";
import { customerSchema } from "../validators/customer.validator.js";

const router = express.Router();

router.route("/create-customer").post(verifyJwt, validate(customerSchema), createCustomer);

router.route("/raise-loan-request").post(verifyJwt, validate(), loanReq);

export { router as customerRoutes };
