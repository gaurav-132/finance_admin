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

const applyFilters = (query, filterObj) => {
    if (filterObj.allocatedLocationId) {
        query.where('allocatedLocationId', filterObj.allocatedLocationId);
    }
    
    if (filterObj.employeeName) {
        query.where('name', 'like', `%${filterObj.employeeName}%`);
    }
};

const getEmployeesData = async (filterObj) => {

    const totalQuery = knex('employees').count('id as count');
    applyFilters(totalQuery, filterObj);
    const totalResult = await totalQuery.first();
    const total = totalResult.count; 

    
    let employeesQuery = knex('employees').select('*');
    applyFilters(employeesQuery, filterObj);

    if (filterObj.limit) {
        employeesQuery.limit(filterObj.limit);
    }

    if (filterObj.page && filterObj.limit) {
        const offset = (filterObj.page - 1) * filterObj.limit;
        employeesQuery.offset(offset);
    }

    const employees = await employeesQuery;

    return { employees, total };
};



export {
    addEmployee,
    updateEmployee,
    findEmployeeById,
    updateEmployeeSalary,
    getEmployeesData,
}