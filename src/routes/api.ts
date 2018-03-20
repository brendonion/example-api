import TestController from "../controllers/TestController";
import { Application } from "express";
import AuthController from "../controllers/AuthController";

const API_BASE = process.env.API_BASE;

export default function initApi(app: Application) {
  app.get(API_BASE + "/test", TestController.test);
  app.post(API_BASE + "/login", AuthController.login);
  app.post(API_BASE + "/signup", AuthController.signup);
}
