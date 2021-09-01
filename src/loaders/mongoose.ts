import mongoose from "mongoose";
import config from "../config/config";
import { logger } from "./logger";

export default async () => {
  const dbUri = config.databaseURL;
  logger.logAsInfo("Started connecting to DB")
  await mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, () => {
      logger.logAsInfo("Connected to the database");
    });
}