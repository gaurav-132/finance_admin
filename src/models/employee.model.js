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

export {
    addEmployee,
    updateEmployee,
    findEmployeeById,
}