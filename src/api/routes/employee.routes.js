import express from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { verifyJwt } from '../middleware/auth.middleware.js';
import { employeeDetailsSchema, employeeMonthlySalarySchema,  } from '../validators/employee.validator.js';
import { upload } from '../middleware/multer.middleware.js';
import { updateEmp, updateMonthlySalary , getEmployees} from '../controllers/employee.controller.js';


const router = express.Router();

router.route('/update-details').post(verifyJwt,
    upload.fields(
        [
            {
                name: "check",
                maxCount: 1,
            },
            {
                name: "markSheet",
                maxCount: 1,
            },
            {
                name: 'photo',
                maxCount: 1,
            } 
        ]
    ),
    validate(employeeDetailsSchema), 
    updateEmp
);

router.route('/update-monthly-salary').post(verifyJwt, validate(employeeMonthlySalarySchema),updateMonthlySalary);

router.route('/get-employees').post(verifyJwt,getEmployees);

export { router as employeeRoutes};
