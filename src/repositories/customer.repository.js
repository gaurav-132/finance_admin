import { addCustomerDB } from "../models/customer.model.js";

const createCustomerService = async (customerObj) => {
  await addCustomerDB(customerObj);
};

export { createCustomerService };
