import express, { Application, Response, Request, NextFunction } from "express";
import cors from "cors";
import uuid from "node-uuid";
import cls from "continuation-local-storage";

import config from "../config/config";
import { logger } from "../loaders/logger";
import initRoutes from "../api/routes/app-routes";

const apiRequest = cls.createNamespace("apiRequest");

const port = config.port as any;
const host = config.host;

export default (app: Application) => {

    logger.logAsInfo("Express Initiated");
    // Parses incoming requests with JSON payloads
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cors());
    app.set("view engine", "ejs");

    //Append routes to the application
    initRoutes(app);

    // Append transaction-ID to each request
    app.use((req: Request, res: Response, next: NextFunction) => {
        apiRequest.run(() => {
            apiRequest.set("transactionId", uuid.v1());
            next();
        });
    });
    let xport: any = process.env.PORT;
    if (xport === null || xport === "") {
        xport = 8080;
    }
    console.log(xport)
    app.listen(xport, host, () => {
        logger.logAsInfo(`Server listing at http://${host}:${xport}`);
    });
}