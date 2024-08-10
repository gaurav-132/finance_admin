import { authRoutes } from "../api/routes/auth.routes.js";
import { employeeRoutes } from "../api/routes/employee.routes.js";
import { userRoutes } from "../api/routes/user.routes.js";

const routesLoader = (app) => {
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/employees', employeeRoutes);
    app.use('/api/v1/auth', authRoutes);
};

export default routesLoader;