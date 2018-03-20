import * as Bluebird from 'bluebird';
import db from '../database/models';
import { UserInstance } from '../database/models/user';

export function getUserById(userId: number): Bluebird<UserInstance> {
  return db.user.findById(userId)
    .then((response) => response)
    .catch((errors) => errors);
}

export function getUserByEmail(userEmail: string): Bluebird<UserInstance> {
  return db.user.findAll({
    where: {
      email: userEmail
    }
  })
    .then((response) => response)
    .catch((errors) => errors);
}
