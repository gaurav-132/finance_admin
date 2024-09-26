import { getLoanRequests } from "../api/controllers/customer.controller.js";
import { 
    addCustomerDB, 
    getCustomersDB,
    loanRequestDb, 
    getLoanRequestDb,
    dispatchActionDb,
    saveDailyCollectionDb,
    checkValidCustomerDb,
    checkValidLoanDb,
    getCollectionTodayDb,
    getCustomerDetailsDb,
    getTransactionsDB,
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

const saveDailyCollectionService = async(formData) => {
    return await saveDailyCollectionDb(formData);
}

const checkValidCustomerService = async(customerId) => {
    await checkValidCustomerDb(customerId);
}

const checkValidLoanService = async(loanId) => {
    await checkValidLoanDb(loanId);
}

const getCollectionTodayService = async () => {
    return await getCollectionTodayDb();
};

const getCustomerDetailsService = async (customerId) => {
    return await getCustomerDetailsDb(customerId);
};

const getTransactionsService = async ({ limit, page, offset, name, location, date }) => {
    // Create a filter object to pass to the DB function
    const filterObj = {
      limit,
      page,
      offset,
      name,
      location,
      date,
    };
  
    const { transactions, total } = await getTransactionsDB(filterObj);
  
    return {
      transactions,
      total,
    };
  };


export { 
    createCustomerService, 
    getCustomersService,
    loanRequestService,
    getLoanRequestsService,
    dispatchActionService,
    saveDailyCollectionService,
    checkValidCustomerService,
    checkValidLoanService,
    getCollectionTodayService,
    getCustomerDetailsService,
    getTransactionsService
};
