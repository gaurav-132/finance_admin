import knex from "../config/db.js";
import moment from 'moment-timezone';
import { ApiError } from "../utils/apiError.js";


const getActiveLoansDb = async () => {
    const loans = await knex('loans').where('status',1).select('*');
    return loans;
}   

const fixLoanDb = async (loanId) => {
    const loan = await knex('loans').where('id', loanId).first();

    if (!loan) {
        throw new ApiError(404,'Loan not found');
    }

    const tax = 0.10;

    // Calculate the fixed loan amount
    const fixedLoanAmount = parseFloat(loan.totalAmount - loan.amountPaid).toFixed(2);

    // Calculate the loan amount before tax
    const loanAmount = parseFloat(fixedLoanAmount / (1 + tax)).toFixed(2);

    // Calculate the tax amount
    const taxAmount = parseFloat(loanAmount * tax).toFixed(2);

    // Calculate the total amount after tax
    const totalAmountAfterTax = parseFloat(fixedLoanAmount * (1 + tax)).toFixed(2);

    // Update the existing loan
    await knex('loans').where('id', loan.id).update({
        'loanAmount': loanAmount,
        'totalAmount': totalAmountAfterTax,
        'status': 3,
        'remark': 'Loan fixed by system',
        'loanFixAmount': fixedLoanAmount,
    });

    // Define the start and end dates in UTC
    const currentDate = moment().tz('UTC');
    const startDate = currentDate.add(1, 'days');
    const endDate = currentDate.add(60, 'days');
  

    // Insert the new loan record
    await knex('loans').insert({
        'customerId': loan.customerId,
        'loanAmount': fixedLoanAmount,
        'interest': 10,
        'totalAmount': totalAmountAfterTax,
        'check': loan.check,
        'startDate': startDate.toISOString(),
        'endDate': endDate.toISOString(),
        'daysLeft': 60,
        'requestedThrough': loan.requestedThrough,
        'amountPaid': null,
        'remark': null,
        'loanFixAmount': null,
        'status': 1,
    });
}



const updateDaysLeftDb = async (loan) =>{
    await knex('loans').where('id', loan.id).update({
        'daysLeft': loan.daysLeft-1,
    });
}   

const adjustLoanBalanceDb = async (collectionId) => {
    const collection = await knex('daily_collections').where('id', collectionId).first();
    if (!collection) {
        throw new ApiError(404,'Collection not found');
    }
    
    // Fetch the loan details
    const loan = await knex('loans').where('id', collection.loanId).first();
    
    if (!loan) {
        throw new ApiError(404,'Loan not found');
    }

    const amountPaid = loan.amountPaid || 0;
    // Calculate the new amount paid
    let totalAmountPaid = parseFloat(amountPaid) + parseFloat(collection.amount);
    totalAmountPaid = parseFloat(totalAmountPaid.toFixed(2));
    
    // Update the loan's amount paid
    await knex('loans').where('id', loan.id).update({
        amountPaid: totalAmountPaid
    });


    // Check if the loan should be marked as settled
    if (totalAmountPaid >= loan.totalAmount) {
        await knex('loans').where('id', loan.id).update({
            status: 3
        });
    }
}

const getNewLoansTodayDb = async () => {
    const currentDate = new Date();
    const today = new Date(currentDate);
    today.setDate(currentDate.getDate() + 1);

    const formattedToday = today.toISOString().split('T')[0];

   
    
    
    return await knex("loans")
        .where('startDate', '>=', formattedToday)
        .andWhere('status', 1);  
};

const getLoanDetailsDb = async (loanId) => {
    const loan = await knex("loans")
        .select(
            "loans.id",
            "loans.customerId",
            "loans.loanAmount",
            "loans.amountPaid",
            "loans.totalAmount",
            "loans.startDate",
            "loans.endDate",
            "loans.daysLeft",
            "loans.status",
            "customers.aadhaarNumber",
            "customers.panNumber",
            "customers.firstName",
            "customers.lastName",
            "customers.mobileNumber",
            "customers.addedBy"

        )
        .leftJoin("customers","loans.customerId","customers.id")
        .where("loans.id",loanId)
        .first();

    if (!loan) {
        throw new Error("Loan not found");
    }

    const transactionLogs = await knex("daily_collections")
        .select("id", "date", "amount", "paymentMode","collectedBy")
        .where("loanId", loanId );

    return { ...loan, transactionLogs };
};


export {
    getActiveLoansDb,
    fixLoanDb,
    updateDaysLeftDb,
    adjustLoanBalanceDb,
    getNewLoansTodayDb,
    getLoanDetailsDb
}
