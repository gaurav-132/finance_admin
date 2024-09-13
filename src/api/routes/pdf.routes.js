import express from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { generateDailyReport } from "../controllers/pdf.controller.js";

const router = express.Router();

router
    .route("/daily-report")
    .get(generateDailyReport);

export {router as pdfRoutes};