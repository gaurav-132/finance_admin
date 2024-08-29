import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  addLocationService,
  getLocationsService,
} from "../../repositories/location.repository.js";

const createLocation = asyncHandler(async (req, res, next) => {
  const { locationName } = req.body;

  await addLocationService({ locationName });

  return res
    .status(201)
    .json(new ApiResponse(201, "Location Created Successfully"));
});

const getLocations = asyncHandler(async (req, res, next) => {
  let { limit, page } = req.body;

  const offset = (page - 1) * limit;

  const { total, locations } = await getLocationsService({
    limit,
    page,
    offset,
  });

  const data = {
    locations,
    limit,
    page,
    total,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Locations Fetched Successfully"));
});

export { createLocation, getLocations };
