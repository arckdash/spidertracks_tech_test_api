import 'reflect-metadata';

import { json, urlencoded } from 'express';
import ApiServer from './apiServer';

// Middlewares
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';

// Bundles
import Customers from './bundles/customers';

//===============================  CORS  ===============================//
// Configuring CORS Settings
const allowedOrigins = process.env.ALLOW_ORIGINS || '';
const whitelist = allowedOrigins.split(',').map((item) => item.trim());

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

//===============================  Api Server Initialisation  ===============================//

const apiServer = new ApiServer({
    port: process.env.PORT ? Number(process.env.PORT) : 6000,
    middlewares: [
        morgan(function (tokens, req, res) {
            return [
                tokens.method(req, res),
                tokens.url(req, res),
                tokens.status(req, res),
                tokens.res(req, res, 'content-length'),
                '-',
                tokens['response-time'](req, res),
                'ms',
            ].join(' ');
        }),
        cors(corsOptions),
        cookieParser(),
        json(),
        urlencoded({ extended: true }),
        helmet(),
        compression(),
    ],
    controllers: [...Customers.controllers],
});

// Run App.
apiServer.listen();
