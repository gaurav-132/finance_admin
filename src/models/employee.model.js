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

export {
    addEmployee,
    updateEmployee,
    findEmployeeById,
    updateEmployeeSalary,
}