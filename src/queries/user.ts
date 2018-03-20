import * as Bluebird from "bluebird";
import * as bcrypt from "bcryptjs";
import db from "../database/models";
import { UserInstance } from "../database/models/user";

export function createUser(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
): Bluebird<UserInstance> {
  return db.user.create({
    first_name,
    last_name,
    email,
    password
  })
    .then((response) => response)
    .catch((error) => error);
}

export function getUserById(userId: number): Bluebird<UserInstance> {
  return db.user.findById(userId)
    .then((response) => response)
    .catch((error) => error);
}

export function getUserByEmail(userEmail: string): Bluebird<UserInstance> {
  return db.user.findOne({
    where: {
      email: userEmail
    },
    raw: true,
  })
    .then((response) => response)
    .catch((error) => error);
}
