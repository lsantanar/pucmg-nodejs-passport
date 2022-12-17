import passport from "passport";
import cookieSession from "cookie-session";
import { Strategy as GithubStrategy } from "passport-github2";
import { urls } from "../constants.js";

export function initializeStrategies(app) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(
        new GithubStrategy(
            {
                clientID: "Iv1.3eda5ce8d1216bf5",
                clientSecret: "b92f76145f55003e226cca1267ecac1521b6f6d5",
                callbackURL: `${urls.application}/auth/login/github/callback`,
            },
            function (accessToken, refreshToken, profile, done) {
                return done(null, profile);
            }
        )
    );

    app.use(
        cookieSession({
            name: "github-auth-session",
            keys: ["key1", "key2"],
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
}