import express from 'express';
import loadAll from './loaders/index.js';
import dotenv from 'dotenv';
import path from 'path';
import { __dirname, resolve } from './config/pathUtils.js';

dotenv.config({ path: path.resolve(__dirname, '../.env') });


const app = express();

loadAll(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
