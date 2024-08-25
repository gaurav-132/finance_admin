import { addLocationDB, getLocationsDB } from "../models/location.model.js";

const addLocationService = async (locationObj) => {
  await addLocationDB(locationObj);
};

const getLocationsService = async (filterObj) => {
  const { locations, total } = await getLocationsDB(filterObj);

  return { locations, total };
};

export { addLocationService, getLocationsService };
