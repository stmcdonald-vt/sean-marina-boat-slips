import chai from "chai";
import {use, assert} from "chai";
import chaiHttp from "chai-http";
import { describe, it, beforeEach } from "mocha";
import { server } from "../src/server";

use(chaiHttp);

describe("Boat Slip Vacate PUT Route", () => {
    it("Returns a 204 status code if boat slip was previously occupied.", async () => {
        // fill the boat slips
        for (let i = 0; i < 3; i++) {
            console.log("filling boat");
            await chai
                .request(server)
                .post("/boat-slips")
                .send({ vesselName: `Test Vessel ${i}` });
        }
        const response = await chai.request(server).put("/boat-slips/1/vacate");
        assert.equal(response.status, 204);
    });

    it("Returns a 409 boat slip was already vacant", async () => {
        // vacate boat slip first
        await chai.request(server).put("/boat-slips/1/vacate");
        const response = await chai.request(server).put("/boat-slips/1/vacate");
        assert.equal(response.status, 409);
        assert.isObject(response.body);
        assert.property(response.body, "statusCode");
        assert.property(response.body, "Message");
    });
});
