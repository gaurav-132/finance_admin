import { addEmployee, findEmployeeById, getEmployeeDetailsDb, getEmployeesData, getGroupedCollectionsDb, updateEmployee, updateEmployeeSalary } from "../models/employee.model.js";

const createEmployee = async(empObj) => {
    await addEmployee(empObj);
}

const updateEmpService = async(empId, empObj) => {
    await updateEmployee(empObj, empId);
}

const findEmpByIdService = async(empId) => {
    return await findEmployeeById(empId);
}

const updateEmpSalaryService = async(empSalaryObj) => {
    return await updateEmployeeSalary(empSalaryObj);
}

const getEmployeesService = async(filterObj) => {
    return await getEmployeesData(filterObj);
}

const getGroupedCollectionsService = async () => {
    return await getGroupedCollectionsDb();
};

const getEmployeeDetailsService = async (employeeId) => {
    return await getEmployeeDetailsDb(employeeId);
};

export {
    createEmployee,
    updateEmpService,
    findEmpByIdService,
    updateEmpSalaryService,
    getEmployeesService,
    getGroupedCollectionsService,
    getEmployeeDetailsService
}