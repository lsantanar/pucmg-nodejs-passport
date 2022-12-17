import { Router } from "express";
import passport from "passport";

export const authRouter = Router();

authRouter.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/");
});

authRouter.get("/error", (req, res) => res.send("Unknown Error"));

authRouter.get("/login", (req, res) => {
    res.render("login");
})
authRouter.get(
    "/login/github",
    passport.authenticate("github", { scope: ["user:email"] })
);
authRouter.get(
    "/login/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth/error" }),
    function (req, res) {
        res.redirect("/");
    }
);

authRouter.get("/admin", ensureAuthenticated, function (req, res) {
    res.render("admin", { user: req.session.passport.user });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}