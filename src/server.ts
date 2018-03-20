import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import initApi from "./routes/api";
import AuthController from "./controllers/AuthController";

/**
 * The server.
 *
 * @class Server
 */
export default class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    // create expressjs application
    this.app = express();

    // configure application
    this.config();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // Add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    // Mount json form parser
    this.app.use(bodyParser.json());

    // Mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // Mount logger
    this.app.use(logger("dev"));

    // Mount cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));
   
    // Error handling
    this.app.use(errorHandler());

    // Initialize Authorization
    this.app.use(AuthController.initialize());

    // Catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      err.status = 404;
      next(err);
    });

    // Handle authenticated routes
    this.app.all(process.env.API_BASE + "/*", (req: express.Request, res: express.Response, next: any) => {
      if (req.path.includes(process.env.API_BASE + "/login") || req.path.includes(process.env.API_BASE + "/signup")) return next();

      return AuthController.authenticate((err: Error, user: any, info: any) => {
        if (err) return next(err);
        if (!user) {
          if (info.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Your token has expired. Please generate a new one" });
          } else {
            return res.status(401).json({ message: info.message });
          }
        }
        this.app.set("user", user);
        return next();
      })(req, res, next);
    });

    // Handle api routes
    initApi(this.app);
  }

}
