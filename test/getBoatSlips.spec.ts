import { assert, use } from "chai";
import { describe, it } from "node:test";
import { server } from "../src/server";
import IBoatSlip from "../src/interfaces/iBoatSlip";
const request = require('supertest');

describe("Boat Slip GET Route", () => {
    beforeEach(done => setTimeout(done, 1500));
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
