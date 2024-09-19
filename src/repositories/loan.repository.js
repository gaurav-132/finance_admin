import { 
    getActiveLoansDb,
    fixLoanDb,
    updateDaysLeftDb,
    adjustLoanBalanceDb,
    getNewLoansTodayDb,
    getLoanDetailsDb,
} from '../models/loan.model.js'


const getActiveLoansService = async() => {
    return await getActiveLoansDb(); 
};

const fixLoanService = async (loanId) => {
    await fixLoanDb(loanId);
};

const updateDaysLeftService = async (loan) => {
    await updateDaysLeftDb(loan);
};

const adjustLoanBalanceService = async (collectionId) => {
    await adjustLoanBalanceDb(collectionId);
}

const getNewLoansTodayService = async () => {
    return await getNewLoansTodayDb();
  };

const getLoanDetailsService = async (loanId) => {
    return await getLoanDetailsDb(loanId);
};

export {
    getActiveLoansService,
    fixLoanService,
    updateDaysLeftService,
    adjustLoanBalanceService,
    getNewLoansTodayService,
    getLoanDetailsService
}