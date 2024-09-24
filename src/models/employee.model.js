import knex from '../config/db.js';

const addEmployee = async (empObj) => {
    await knex('employees').insert(empObj);
}

const updateEmployee = async (empObj, empId) => {
    await knex('employees').where('id', empId).update(empObj);
}

const findEmployeeById = async(empId) => {
    return await knex('employees').where('id', empId).first();
}

const updateEmployeeSalary = async(empSalaryObj) => {
    if(empSalaryObj.id){
        await knex('employees_monthly_salary').where('id', empSalaryObj.id).update(empSalaryObj);
    }else{
        await knex('employees_monthly_salary').insert(empSalaryObj);
    }
}

const applyFilters = async (query, filterObj) => {
    if (filterObj.allocatedLocationId) {
        await query.where('allocatedLocationId', filterObj.allocatedLocationId);
    }
    
    if (filterObj.employeeName) {
        await query.where('name', 'like', `%${filterObj.employeeName}%`);
    }
};

const getEmployeesData = async (filterObj) => {

    const totalQuery = knex('employees').count('id as count');
    await applyFilters(totalQuery, filterObj);
    const totalResult = await totalQuery.first();
    const total = totalResult.count; 

    
    let employeesQuery = knex('employees').select('*');
    await applyFilters(employeesQuery, filterObj);

    if (filterObj.limit) {
        await employeesQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        employeesQuery.offset(filterObj.offset);
    }

    const employees = await employeesQuery;

    return { employees, total };
};


const getGroupedCollectionsDb = async () => {
    // aggregation logic
};


export {
    addEmployee,
    updateEmployee,
    findEmployeeById,
    updateEmployeeSalary,
    getEmployeesData,
    getGroupedCollectionsDb
}