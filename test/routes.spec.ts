import { assert } from "chai";
import { describe, it, before } from "mocha";
import { server } from "../src/server";
import { seedFromJSON } from "../seed/seedData";
import fullBoatSlips from "../seed/fullBoatSlips.json";
import starter from "../seed/starter.json";
import Environment from "../src/enums/envEnum";
import IBoatSlip from "../src/interfaces/iBoatSlip";
const request = require("supertest");

describe("Boat Slip GET Route", () => {
  before(async () => {
    return seedFromJSON(starter.boatSlips, Environment.TEST);
  });
  it("Returns a 200 status code", async () => {
    const response = await request(server).get("/boat-slips");
    assert.equal(response.status, 200);
  });

  it("Returns a list of boat slip objects", async () => {
    const response = await request(server).get("/boat-slips");
    assert.isArray(response.body);

    response.body.forEach((boatSlip: IBoatSlip) => {
      assert.isObject(boatSlip);
    });
  });
});

describe("Boat Slip POST Route - Input Validation", () => {
  it("Requires an object in the body", async () => {
    const response = await request(server)
      .post("/boat-slips")
      .send("notAnObject");
    assert.equal(response.status, 400);
  });
  it("Only allows vesselName", async () => {
    const response = await request(server)
      .post("/boat-slips")
      .send({
        vesselName: "Goo Lagoon",
        otherProp: "shouldn't be here"
      });
    assert.equal(response.status, 400);
  });
  it("Requires vesselName to be a non-empty string", async () => {
    const response = await request(server)
      .post("/boat-slips")
      .send({
        vesselName: ""
      });
    assert.equal(response.status, 400);
  });
});

describe("Boat Slip POST Route - All Vacant", () => {
  before(async () => {
    return seedFromJSON(starter.boatSlips, Environment.TEST);
  });
  it("Returns a slip number when available.", async () => {
    const response = await request(server)
      .post("/boat-slips")
      .send({ vesselName: "The Salty Spitoon" });
    assert.equal(response.status, 200);
    assert.isObject(response.body);
    assert.property(response.body, "slipNumber");
  });
});

describe("Boat Slip POST Route - All Full", () => {
  before(async () => {
    return seedFromJSON(fullBoatSlips.boatSlips, Environment.TEST);
  });
  it("Returns a 409 when no slips are vacant", async () => {
    const response = await request(server)
      .post("/boat-slips")
      .send({ vesselName: "The Salty Spitoon" });
    assert.equal(response.status, 409);
    assert.isObject(response.body);
    assert.property(response.body, "statusCode");
    assert.property(response.body, "Message");
  });
});

describe("Boat Slip PUT Route - Input Validation", () => {
  it("Requires ID to be a number", async () => {
    const response = await request(server)
      .put("/boat-slips/b/vacate")
    assert.equal(response.status, 400);
  });
  it("Requires ID to be larger than 1", async () => {
    const response = await request(server)
      .put("/boat-slips/0/vacate")
    assert.equal(response.status, 400);
  });
  it("Requires ID to be less than 3", async () => {
    const response = await request(server)
      .put("/boat-slips/4/vacate")
    assert.equal(response.status, 400);
  });
});

describe("Boat Slip Vacate PUT Route", () => {
  before(async () => {
    return seedFromJSON(starter.boatSlips, Environment.TEST);
  });
  it("Returns a 409 boat slip was already vacant", async () => {
    // vacate boat slip first
    await request(server).put("/boat-slips/1/vacate");
    const response = await request(server).put("/boat-slips/1/vacate");
    assert.equal(response.status, 409);
    assert.isObject(response.body);
    assert.property(response.body, "statusCode");
    assert.property(response.body, "Message");
  });
});

describe("Boat Slip Vacate PUT Route", () => {
  before(async () => {
    return seedFromJSON(fullBoatSlips.boatSlips, Environment.TEST);
  });
  it("Returns a 204 status code if boat slip was previously occupied.", async () => {
    const response = await request(server).put("/boat-slips/1/vacate");
    assert.equal(response.status, 204);
  });
});
