import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { generateDailyReport } from "../controllers/pdf.controller.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.route("/daily-report").get(verifyJwt,generateDailyReport);
router.route("/dashboard-data").get(getDashboardData);

export {router as dashboardRoutes};