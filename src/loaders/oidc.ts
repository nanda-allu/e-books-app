import { Application } from 'express';
import session from 'express-session';
import { ExpressOIDC } from "@okta/oidc-middleware";
import request from "request-promise";
import { HttpError } from 'http-errors';

import config from "../config/config";
import { logger } from './logger';

// Instantiate OIDC
export const oidc = new ExpressOIDC(
    Object.assign({
        issuer: config.oktaConfig.issuer,
        client_id: config.oktaConfig.clientId,
        client_secret: config.oktaConfig.clientSecret,
        appBaseUrl: config.oktaConfig.baseUrl,
        scope: "openid profile email offline_access"
    })
);

export default (app: Application) => {

    const sessionOptions = {
        secret: 'this should be secure',
        resave: true,
        saveUninitialized: false
    };

    // session support is required to use ExpressOIDC
    app.use(session(sessionOptions));

    // ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
    app.use(oidc.router);

    // Verify user context and redirects accordingly
    app.get("/", (req: any, res) => {
        if (req.userContext) {
            res.render("login", {
                accessToken: req?.userContext?.tokens?.access_token,
            });
        } else {
            // req.userContext.userinfo lets us know, the logged-in status of the user
            res.send('Please <a href="/login">login</a> to get access');
        }
    });
    // Refresh token
    app.use(async (req: any, res, next) => {
        const userContext = req.userContext;
        if (!userContext) {
            next();
            return;
        }

        const tokens = userContext.tokens;
        if (!tokens) {
            next();
            return;
        }
        if (req?.userContext?.tokens?.expires_at > Date.now() / 1000) {
            next();
            return;
        }
        const token = btoa(
            `${config.oktaConfig.clientId}:${config.oktaConfig.clientSecret}`
        );
        return request({
            uri: `${config.oktaConfig.issuer}/v1/token`,
            json: true,
            method: "POST",
            headers: {
                authorization: `Basic ${token}`,
            },
            form: {
                redirect_uri: "http://localhost:3000",
                scope: "offline_access openid",
                refresh_token: tokens.refresh_token,
                grant_type: "refresh_token",
            },
        })
            .then((data: any) => {
                const newTokens = data;
                req.userContext.tokens.access_token =
                    newTokens.access_token;
                req.userContext.tokens.refresh_token =
                    newTokens.refresh_token;
                req.userContext.tokens.id_token = newTokens.id_token;
                req.userContext.tokens.scope = newTokens.scope;
                req.userContext.tokens.expires_at =
                    Math.floor(Date.now() / 1000) + newTokens.expires_in;
                next();
            })
            .catch((e) => {
                const httpError = new HttpError(`Exception while attempting to get refresh access token: ${e.message} `);
                logger.logAsError(httpError);
                next();
            });
    });
}