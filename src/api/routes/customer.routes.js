import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customer.controller.js";
import { customerSchema } from "../validators/customer.validator.js";

const router = express.Router();

router
  .route("/create-customer")
  .post(verifyJwt, validate(customerSchema), createCustomer);

router.route("/get-customers").post(verifyJwt, getCustomers);

export { router as customerRoutes };
