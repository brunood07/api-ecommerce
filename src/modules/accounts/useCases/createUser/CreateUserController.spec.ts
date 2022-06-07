import request from "supertest";

import { app } from "@shared/infra/http/app";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Create user controller", () => {
  it("Should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users/")
      .send({
        username: makeid(7),
        email: makeid(4) + "@getPrismaClient.com",
        password: makeid(6),
      });

    expect(response.status).toBe(200);
  });
});
