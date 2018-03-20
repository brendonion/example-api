import * as request from "supertest";
import { app } from "../../index";

describe("TestController", () => {

  describe("api/test", () => {

    it("responds with json", () => {
      request(app)
        .get("api/test")
        .expect("Content-Type", "/json/")
        .expect(200);
    });

  });

});
