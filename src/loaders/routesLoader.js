import { authRoutes } from "../api/routes/auth.routes.js";
import { employeeRoutes } from "../api/routes/employee.routes.js";
import { userRoutes } from "../api/routes/user.routes.js";
import { customerRoutes } from "../api/routes/customer.routes.js";
import { locationRoutes } from "../api/routes/location.routes.js";
import { dashboardRoutes } from "../api/routes/dashboard.routes.js";

const routesLoader = (app) => {
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/employees", employeeRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/customers", customerRoutes);
  app.use("/api/v1/locations", locationRoutes);
  app.use("/api/v1/dashboard", dashboardRoutes);
};

export default routesLoader;
