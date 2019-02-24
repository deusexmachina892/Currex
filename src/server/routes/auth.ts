import { Router, Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { IVerifyOptions } from "passport-local";

const request = require("express-validator");
const router = Router();

router.get('/auth', (req: Request, res: Response) => {
    if(req.user){
        return res.redirect('/');
    }
    // show login page
});

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });
  
    const errors: any = req.validationErrors();
  
    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/login");
    }
  
    passport.authenticate("local", (err: Error, user, info: IVerifyOptions) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash("errors", info.message);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        req.flash("success", "Success! You are logged in." );
        res.redirect(req.session.returnTo || "/");
      });
    })(req, res, next);
  };

  /**
 * GET /logout
 * Log out.
 */
export let logout = (req: Request, res: Response) => {
    req.logout();
    res.redirect("/");
  };