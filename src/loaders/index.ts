import { Application } from "express";
import initMongoose from "../loaders/mongoose";
import initOIDC from "../loaders/oidc";
import { logger } from "./logger";
import initExpress from "../loaders/express";

export default async (app: Application) => {
    logger.logAsInfo("Initiated Loaders");
    initOIDC(app);
    await initMongoose();
    initExpress(app);
};
