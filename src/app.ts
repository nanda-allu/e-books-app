// To use @DECORATORS
import "reflect-metadata";

import express from "express";

import initLoaders from "./loaders/index";

const app = express();

async function initApplication() {
    await initLoaders(app);
}
console.log("Updated log file")
initApplication();
module.exports = app;
