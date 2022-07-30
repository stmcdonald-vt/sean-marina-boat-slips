import { assert } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "node:test";
import server from "../server";

chai.use(chaiHttp);

describe("Boat Slip GET Route", () => {
    it("Returns a 200 status code", async () => {
        const response = await chai.request(server).get("/boat-slips");
        assert.equal(response.status, 200);
    });

    it("Returns a list of boat slip objects", async () => {
        const response = await chai.request(server).get("/boat-slips");
        assert.isArray(response.body);
        response.body.forEach((boatSlip) => {
            assert.property(boatSlip, "slipNumber");
            assert.property(boatSlip, "vacant");
            assert.property(boatSlip, "string");
        });
    });
});
