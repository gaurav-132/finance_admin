import express from 'express';
import cors from 'cors';


const middlewareLoader = (app) => {
    app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    }));
    app.use(express.json({ limit: '1000mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1000mb' }));
    app.use(express.static('public'));
};

export default middlewareLoader;
