import * as express from "express";
import * as jwt from "jwt-simple";
import * as passport from "passport";
import * as moment from "moment";
import * as bcrypt from "bcryptjs";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserInstance } from "../database/models/user";
import { getUserByEmail, createUser } from "../queries/user";

class AuthController {

  public initialize = () => {
    passport.use("jwt", this.getStrategy());
    return passport.initialize();
  }

  public authenticate = (callback) => {
    return passport.authenticate(
      "jwt", 
      { session: false, failWithError: true },
      callback
    );
  }

  public signup = (req: express.Request, res: express.Response) => {
    
    // TODO: validate req.body

    bcrypt.hash(req.body.password, 10, async (err: Error, hash: string) => {
      if (err) throw "An error occurred during signup";
      try {
        const newUser: UserInstance = await createUser(
          req.body.first_name,
          req.body.last_name,
          req.body.email,
          hash
        );
        const response: Object = {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ message: "An error occurred", errors: error });
      }
    });
  }

  public login = async (req: express.Request, res: express.Response) => {
    try {
      // TODO: validate email and password

      const user = await getUserByEmail(req.body.email);

      if (user === null) throw "User not found";

      bcrypt.compare(req.body.password, user.password, (error: Error, success: boolean) => {
        if (error) throw `An error occurred: ${error}`;
        if (!success) throw "Unsuccessful";
        res.status(200).json(this.genToken(user));
      });
    } catch (error) {
      res.status(401).json({ message: "Invalid credentials", errors: error });
    }
  }

  private genToken = (user: UserInstance): Object => {
    const expires = moment().utc().add({ days: 7 }).unix();
    const token = jwt.encode({
      exp: expires,
      id: user.id,
    }, process.env.JWT_SECRET);

    return {
      token: "JWT " + token,
      expires: moment.unix(expires).format(),
      id: user.id
    };
  }

  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeader(),
      passReqToCallback: true,
    };

    return new Strategy(params, async (req: express.Request, payload: any, done: any) => {
      try {
        const user = await getUserByEmail(payload.email);
        if (user === null) {
          return done(null, false, { message: "The user in the token was not found" });
        }
        return done(null, { id: user.id, email: user.email });
      } catch (error) {
        return done(error);
      }
    });
  }

}

export default new AuthController();
