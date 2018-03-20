import * as express from "express";
import { getUserById } from "../queries/user";

class TestController {

  test(req: express.Request, res: express.Response) {
    getUserById(1)
      .then((response) => res.status(200).send({
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        created_at: response.created_at,
        updated_at: response.updated_at,
      }))
      .catch((errors) => res.status(500).send(errors));
  }

}

export default new TestController();
