import { getLoanRequests } from "../api/controllers/customer.controller.js";
import { 
    addCustomerDB, 
    getCustomersDB,
    loanRequestDb, 
    getLoanRequestDb,
    dispatchActionDb,
} from "../models/customer.model.js";

const createCustomerService = async (customerObj) => {
    await addCustomerDB(customerObj);
};

const getCustomersService = async (filterObj) => {
  const { customers, total } = await getCustomersDB(filterObj);

  return { customers, total };
};

const loanRequestService = async(loanRequestObj) => {
    await loanRequestDb(loanRequestObj);
}

const getLoanRequestsService = async(filterObj) => {
    return await getLoanRequestDb(filterObj);
}

const dispatchActionService = async(actionObj) => {
    await dispatchActionDb(actionObj);
}

export { 
    createCustomerService, 
    getCustomersService,
    loanRequestService,
    getLoanRequestsService,
    dispatchActionService,
};
