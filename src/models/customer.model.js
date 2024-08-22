import knex from "../config/db.js";

const addCustomerDB = async (customerObj) => {
    await knex("customers").insert(customerObj);
};

const getCustomersDB = async (FilterObj) => {
    const customers = await knex("customers");
    return customers;
};

const loanRequestDb = async (loanRequestObj) => {
    await knex("loan_requests").insert(loanRequestObj);
};


const applyGetLoanRequestsFilter = (query, filterObj) => {
    if (filterObj.customerName) {
        query.where('customers.firstName', 'like', `%${filterObj.customerName}%`);
    }
};

const getLoanRequestDb = async (filterObj) => {
    let loanRequestsQuery = knex('loan_requests')
        .select(
            'loan_requests.*', 
            'customers.firstName', 
            'customers.lastName', 
            'customers.workLocation',
            'customers.aadhaarNumber',
            'customers.panNumber',
            'customers.mobileNumber',
            'customers.occupation',
            'customers.permanentAddress',
            'customers.currentAddress',
            'customers.workLocation',
            'employees.name as requestedThroughName'
        )
        .leftJoin('customers', 'customers.id', '=', 'loan_requests.customerId')
        .leftJoin('employees', 'employees.id', '=', 'loan_requests.requestedThrough')
        .where('loan_requests.isApproved', 0);

    const totalQuery = knex('loan_requests').count('loan_requests.id as count')
        .leftJoin('customers', 'customers.id', '=', 'loan_requests.customerId')
        .where('loan_requests.isApproved', 0);

    applyGetLoanRequestsFilter(loanRequestsQuery, filterObj);
    applyGetLoanRequestsFilter(totalQuery, filterObj);

    const totalResult = await totalQuery.first();
    const total = totalResult.count;

    if (filterObj.limit) {
        loanRequestsQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        const offset = (filterObj.page - 1) * filterObj.limit;
        loanRequestsQuery.offset(offset);
    }

    const loanRequests = await loanRequestsQuery;

    const taxRate = 10; 

    loanRequests.forEach((request) => {
        request.taxInPercentage = `${taxRate}%`;
        request.taxRate = parseFloat(taxRate.toFixed(2));
        const totalAmountAfterTax = request.loanAmount + (request.loanAmount * taxRate / 100);
    
        request.totalAmountAfterTax = parseFloat(totalAmountAfterTax.toFixed(2));
    });

    return { loanRequests, total };
};


const dispatchActionDb = async (actionObj) => {
    console.log("Hello db")
    const currentDate = new Date();

    if(actionObj.action === 1){
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() + 1);

        const endDate = new Date(currentDate);
        endDate.setDate(currentDate.getDate() + 60);
    
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];

        const daysLeft = 60;

        console.log('actionOb', actionObj);

        await knex('loan_requests').where('id', actionObj.id).update({
            isApproved: actionObj.action,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            daysLeft,
            isApproved: actionObj.action, 
            totalAmount: actionObj.totalAmount,
            interest: actionObj.tax,
        })
    }else if(actionObj.action === 2){
        await knex('loan_requests').where('id', actionObj.id).update({
            isApproved: actionObj.action,
        })
    }
}

export { 
    addCustomerDB, 
    getCustomersDB,
    loanRequestDb,
    getLoanRequestDb,
    dispatchActionDb,
};
