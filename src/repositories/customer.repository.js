import { addCustomerDB, getCustomersDB } from "../models/customer.model.js";

const createCustomerService = async (customerObj) => {
  await addCustomerDB(customerObj);
};

const getCustomersService = async (filterObj) => {
  const { customers, total } = await getCustomersDB(filterObj);

  return { customers, total };
};

export { createCustomerService, getCustomersService };
