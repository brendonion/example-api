import * as express from "express";
import { getUserById } from "../queries/user";

class TestController {

  test(req: express.Request, res: express.Response) {
    getUserById(1)
      .then((response) => res.status(200).send(response))
      .catch((errors) => res.status(500).send(errors));
  }

}

export default new TestController();
