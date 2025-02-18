import express from 'express';
import loadAll from './loaders/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { __dirname, resolve } from './config/pathUtils.js';
import scheduleJobs from './crons/index.js';

// dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config('../.env');


const app = express();

loadAll(app);

scheduleJobs();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
