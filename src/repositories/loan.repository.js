import { 
    getActiveLoansDb,
    fixLoanDb,
    updateDaysLeftDb,
    adjustLoanBalanceDb,
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

export {
    getActiveLoansService,
    fixLoanService,
    updateDaysLeftService,
    adjustLoanBalanceService,
}