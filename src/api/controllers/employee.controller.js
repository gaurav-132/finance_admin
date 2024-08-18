import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { findEmpByIdService,
    updateEmpSalaryService, 
    updateEmpService,
    getEmployeesService
} from "../../repositories/employee.repository.js";


const updateEmp = asyncHandler(async(req, res, next) => {
    const { empId, aadhaarNo, panNo, allocatedLocationId } = req.body;

    const markSheet = req.files?.markSheet[0].path;
    const check = req.files?.check[0].path;
    const photo = req.files?.photo[0].path;

    const checkEmpExist = await findEmpByIdService(empId);

    if(!checkEmpExist){
        throw new ApiError(401, "Invalid request employee does not exist");
    }

    await updateEmpService(empId, {aadhaarNo, panNo, check, markSheet,photo, allocatedLocationId});

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                message: "Employee Details updated successfully!",
            }
        )
    );
});

const updateMonthlySalary = asyncHandler(async(req, res, next) => {
    const {id, empId, month, year, paid, paidAmount, advanceAmountTaken, totalMonthlyExpense } = req.body;

    const checkEmpExist = await findEmpByIdService(empId);

    if(!checkEmpExist){
        throw new ApiError(401, "Invalid request employee does not exist");
    }

    await updateEmpSalaryService({id, empId, month, year, paid, paidAmount, advanceAmountTaken, totalMonthlyExpense });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Employee salary updated successfully!"
        )
    );
});

const getEmployees = asyncHandler(async(req, res, next) => {

    let { page, limit, allocatedLocationId, employeeName } = req.body;
    
    const offset = (page - 1) * limit;

    const { employees, total } = await getEmployeesService({ page, limit, offset, allocatedLocationId, employeeName });


    return res.status(200).json(
        new ApiResponse(
            200,
            {
                employees,
                page,
                limit,
                total
            },
            "Employees fetched successfully!"
        )
    );
});


export {
    updateEmp,
    updateMonthlySalary,
    getEmployees
}