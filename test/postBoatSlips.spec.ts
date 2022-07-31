import chai from "chai";
import { assert, use } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "node:test";
import { server } from "../src/server";

use(chaiHttp);

describe("Boat Slip POST Route", () => {
    it("Returns a slip number when available.", async () => {
        const response = await chai
            .request(server)
            .post("/boat-slips")
            .send({ vesselName: "The Salty Spitoon" });
        assert.equal(response.status, 200);
        assert.isObject(response.body);
        assert.property(response.body, "slipNumber");
    });

    it("Returns a 409 when no vacant slips are ", async () => {
        // fill the boat slips
        for (let i = 0; i < 3; i++) {
            await chai
                .request(server)
                .post("/boat-slips")
                .send({ vesselName: `Test Vessel ${i}` });
        }
        const response = await chai
            .request(server)
            .post("/boat-slips")
            .send({ vesselName: "The Salty Spitoon" });
        assert.equal(response.status, 409);
        assert.isObject(response.body);
        assert.property(response.body, "statusCode");
        assert.property(response.body, "Message");
    });
});
