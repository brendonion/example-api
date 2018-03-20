import * as express from "express";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserInstance } from "../database/models/user";
import { getUserByEmail } from "../queries/user";

class Auth {

  public initialize = () => {
    //passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback) => {
    return passport.authenticate(
      "jwt", 
      { session: false, failWithError: true },
      callback
    );
  }

  private genToken = (user: UserInstance): Object => {
    const expires = moment().utc().add({ days: 7 }).unix();
    const token = jwt.encode({
      exp: expires,
      email: user.email
    }, process.env.JWT_SECRET);

    return {
      token: "JWT " + token,
      expires: moment.unix(expires).format(),
      user_id: user.id
    };
  }

  public signup = async (req: express.Request, res: express.Response) => {
    // TODO: signup
  }

  public login = async (req: express.Request, res: express.Response) => {
    try {
      // req.checkBody("email", "Invalid email").notEmpty();
      // req.checkBody("password", "Invalid password").notEmpty();

      // TODO -> check if email and password exists

      // let errors = req.validationErrors();
      // if (errors) throw errors;

      let user = await getUserByEmail(req.body.email);

      if (user === null) throw "User not found";

      //let success = await user.comparePassword(req.body.password);
      //if (success === false) throw "";

      res.status(200).json(this.genToken(user));
    } catch (err) {
      res.status(401).json({ message: "Invalid credentials", errors: err });
    }
  }

  // private getStrategy = (): Strategy => {
  //   const params = {
  //     secretOrKey: process.env.JWT_SECRET,
  //     jwtFromRequest: ExtractJwt.fromAuthHeader(),
  //     passReqToCallback: true,
  //   };

  //   return new Strategy(params, (req, payload: any, done) => {
  //     User.findOne({ "username": payload.username }, (err, user) => {
  //       /* istanbul ignore next: passport response */
  //       if (err) {
  //           return done(err);
  //       }
  //       /* istanbul ignore next: passport response */
  //       if (user === null) {
  //           return done(null, false, { message: "The user in the token was not found" });
  //       }

  //       return done(null, { _id: user._id, username: user.username });
  //     });
  //   });
  // }

}

export default new Auth();
