import { Application } from "express";
import { check } from "express-validator/check";
import TestController from "../controllers/TestController";
import AuthController from "../controllers/AuthController";

const API_BASE = process.env.API_BASE;

export default function initApi(app: Application) {
  app.get(API_BASE + "/test", TestController.test);

  app.post(API_BASE + "/login", [
    check("email")
      .exists()
      .isEmail().withMessage("Must be an email")
      .trim()
      .normalizeEmail(),
    check("password", "Passwords must be at least 8 characters long")
      .exists()
      .isLength({ min: 8 })
  ], AuthController.login);
  
  app.post(API_BASE + "/signup", AuthController.signup);
}
