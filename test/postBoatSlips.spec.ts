import chai from "chai";
import { assert, use } from "chai";
import { describe, it } from "node:test";
import { server } from "../src/server";
import { seedFromJSON } from '../seed/seedData';
import fullBoatSlips from '../seed/fullBoatSlips.json';
const request = require('supertest');

describe("Boat Slip POST Route", () => {
    beforeEach(done => setTimeout(done, 1500));
    it("Returns a slip number when available.", async () => {
        const response = await request(server)
            .post("/boat-slips")
            .send({ vesselName: "The Salty Spitoon" });
        assert.equal(response.status, 200);
        assert.isObject(response.body);
        assert.property(response.body, "slipNumber");
    });

    it("Returns a 409 when no vacant slips are ", async () => {
        await seedFromJSON(fullBoatSlips.boatSlips);
        const response = await request(server)
            .post("/boat-slips")
            .send({ vesselName: "The Salty Spitoon" });
        assert.equal(response.status, 409);
        assert.isObject(response.body);
        assert.property(response.body, "statusCode");
        assert.property(response.body, "Message");
    });
});
