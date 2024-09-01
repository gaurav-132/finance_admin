import { getActiveLoansService, fixLoanService, updateDaysLeftService } from '../../repositories/loan.repository.js';
import moment from 'moment-timezone';

const trackLoan = async () => {
    try {
        const loans = await getActiveLoansService();
        for (const loan of loans) { 
            await performLoanOperation(loan);
        }
        return;
        console.log('Loan tracking completed successfully');
    } catch (error) {
        console.error('Error in trackLoan:', error);
    }
};

const performLoanOperation = async (loan) => {
    const today = moment(); // Current date as a moment object

    // Use ISO date strings for comparison
    const loanStartDate = moment(loan.startDate).format('YYYY-MM-DD');
    const loanEndDate = moment(loan.endDate).format('YYYY-MM-DD');
    const currentDate = today.format('YYYY-MM-DD');

    if (currentDate >= loanStartDate && currentDate <= loanEndDate && loan.daysLeft > 0) {
        await updateDaysLeftService(loan);
    }else if (loanEndDate < currentDate && loan.totalAmount > loan.amountPaid) {
        let remainingAmount = parseFloat(loan.totalAmount - loan.amountPaid).toFixed(2);
        await fixLoanService(loan.id);
    }
};



export { trackLoan };
