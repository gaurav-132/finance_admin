import { getNewLoansTodayDb } from "../models/loan.model.js";
import { addLocationDB, getLocationsDB, getTopLocationsDB } from "../models/location.model.js";

const addLocationService = async (locationObj) => {
  await addLocationDB(locationObj);
};

const getLocationsService = async (filterObj) => {
  const { locations, total } = await getLocationsDB(filterObj);

  return { locations, total };
};

const getTopLocationsService = async (limit) => {
  const topLocations = await getTopLocationsDB(limit);

  return topLocations;
};


export { addLocationService, getLocationsService , getTopLocationsService};
