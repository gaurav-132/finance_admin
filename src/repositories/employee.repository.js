import { addEmployee, findEmployeeById, updateEmployee } from "../models/employee.model.js";

const createEmployee = async(empObj) => {
    await addEmployee(empObj);
}

const updateEmpService = async(empId, empObj) => {
    await updateEmployee(empObj, empId);
}

const findEmpByIdService = async(empId) => {
    return findEmployeeById(empId);
}

export {
    createEmployee,
    updateEmpService,
    findEmpByIdService,

}