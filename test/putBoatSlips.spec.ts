import { assert} from "chai";
import { describe, it, beforeEach } from "mocha";
import { server } from "../src/server";
import { seedFromJSON } from '../seed/seedData'
import fullBoatSlips from '../seed/fullBoatSlips.json'
const request = require('supertest')

describe("Boat Slip Vacate PUT Route", () => {
    beforeEach(done => setTimeout(done, 1500));
    it("Returns a 204 status code if boat slip was previously occupied.", async () => {
        await seedFromJSON(fullBoatSlips.boatSlips);
        const response = await request(server).put("/boat-slips/1/vacate");
        assert.equal(response.status, 204);
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
