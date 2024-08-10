import express from 'express';
import { validate } from '../middleware/validate.middleware.js';
import { verifyJwt } from '../middleware/auth.middleware.js';
import { employeeDetailsSchema } from '../validators/employee.validator.js';
import { upload } from '../middleware/multer.middleware.js';
import { updateEmp } from '../controllers/employee.controller.js';


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

export { router as employeeRoutes};
