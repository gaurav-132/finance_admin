import {  getActiveLoansService, getNewLoansTodayService } from "../../repositories/loan.repository.js";  // Reusing your existing service to fetch active loans
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import knex from "../../config/db.js";  // Assuming you are using knex for database interactions
import moment from 'moment-timezone';
import { getTopLocationsService } from "../../repositories/location.repository.js";
import { getCollectionTodayService } from "../../repositories/customer.repository.js";

// Controller to handle dashboard data
const getDashboardData = asyncHandler(async (req, res) => {

    const activeLoans = await getActiveLoansService();
    console.log(activeLoans);
    
    const totalLoans = activeLoans.length;

    let totalLoanAmount = 0;
    let totalPendingAmount = 0;

    activeLoans.forEach((loan) => {
        totalLoanAmount += parseFloat(loan.loanAmount || 0);
        totalPendingAmount += parseFloat((loan.loanAmount || 0) - (loan.amountPaid || 0));
    });

    const collectionsToday = await getCollectionTodayService();
    const totalCollectionToday = collectionsToday  
    
    // const totalCollectionToday = collectionsToday[0].totalCollectionToday || 0;

    const NewLoans = await getNewLoansTodayService();
    const totalNewLoans = NewLoans.length;

    const topLocations = await getTopLocationsService(3);  

    return res.status(200).json(new ApiResponse(200, {
        totalCollectionToday,
        totalLoans,
        totalLoanAmount,
        totalPendingAmount,
        totalNewLoans,
        topLocations
    }, "Data fetched successfully"));
});



export {
    getDashboardData,
    
};
