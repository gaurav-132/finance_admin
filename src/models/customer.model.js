import knex from "../config/db.js";

const addCustomerDB = async (customerObj) => {
    await knex("customers").insert(customerObj);
};

const applyFilters = (query, filterObj) => {};

const getCustomersDB = async (filterObj) => {
    const totalQuery = knex("customers").count("id as count");
    applyFilters(totalQuery, filterObj);

    const totalResult = await totalQuery.first();
    const total = totalResult.count;

    let customersQuery = knex("customers").select("*");

    if (filterObj.limit) {
        customersQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        customersQuery.offset(filterObj.offset);
    }

    const customers = await customersQuery;

    return { customers, total };
};

const loanRequestDb = async (loanRequestObj) => {
    await knex("loans").insert(loanRequestObj);
};


const applyGetLoanRequestsFilter = (query, filterObj) => {
    if (filterObj.customerName) {
        query.where('customers.firstName', 'like', `%${filterObj.customerName}%`);
    }
};

const getLoanRequestDb = async (filterObj) => {
    console.log('Filter Object:', filterObj);

    // Initialize queries
    let loanRequestsQuery = knex('loans')
        .select(
            'loans.*', 
            'customers.firstName', 
            'customers.lastName', 
            'customers.workLocation',
            'customers.aadhaarNumber',
            'customers.panNumber',
            'customers.mobileNumber',
            'customers.occupation',
            'customers.permanentAddress',
            'customers.currentAddress',
            'employees.name as requestedThroughName'
        )
        .leftJoin('customers', 'customers.id', '=', 'loans.customerId')
        .leftJoin('employees', 'employees.id', '=', 'loans.requestedThrough')
        .where('loans.status', filterObj.loanStatus);

    const totalQuery = knex('loans')
        .count('loans.id as count')
        .leftJoin('customers', 'customers.id', '=', 'loans.customerId')
        .where('loans.status', filterObj.loanStatus);

    // Apply filters
    applyGetLoanRequestsFilter(loanRequestsQuery, filterObj);
    applyGetLoanRequestsFilter(totalQuery, filterObj);

    // Execute total query
    const totalResult = await totalQuery.first();
    const total = totalResult ? totalResult.count : 0; // Handle case where totalResult might be null

    // Apply pagination and limit
    if (filterObj.limit) {
        loanRequestsQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        loanRequestsQuery.offset(filterObj.offset);
    }

    // Execute loanRequestsQuery
    const loanRequests = await loanRequestsQuery;

    // Add tax calculations
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

        await knex('loans').where('id', actionObj.id).update({
            status: actionObj.action,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            daysLeft,
            totalAmount: actionObj.totalAmount,
            interest: actionObj.tax,
        })
    }else if(actionObj.action === 2){
        await knex('loans').where('id', actionObj.id).update({
            status: actionObj.action,
        })
    }
}


const saveDailyCollectionDb = async (formData) => {
    const [collectionId] = await knex('daily_collections').insert(formData);
    return collectionId;
};


const checkValidCustomerDb = async(customerId) => {
    const customer = await knex('customers').where('id',customerId).first();
    return customer;
}

const checkValidLoanDb = async(loanId) => {
    const loan = await knex('loans').where('id',loanId).first();
    return loan;
}



export { 
    addCustomerDB, 
    getCustomersDB,
    loanRequestDb,
    getLoanRequestDb,
    dispatchActionDb,
    saveDailyCollectionDb,
    checkValidCustomerDb,
    checkValidLoanDb,
};
