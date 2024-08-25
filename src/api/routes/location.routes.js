import express from "express";
import { validate } from "../middleware/validate.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { addLocationSchema } from "../validators/location.validator.js";

import {
  createLocation,
  getLocations,
} from "../controllers/location.controller.js";

const router = express.Router();

router
  .route("/add-location")
  .post(verifyJwt, validate(addLocationSchema), createLocation);

router.route("/get-locations").post(verifyJwt, getLocations);

export { router as locationRoutes };
