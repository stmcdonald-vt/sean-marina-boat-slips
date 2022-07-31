import { Router } from "express";
import BoatSlipFacotry from "../factories/boatSlipFactory";
import {
    getBoatSlips,
    putBoatSlip,
    getVacantBoatSlips,
} from "../controllers/boatSlipsController";
export const boatSlipRouter = Router();

boatSlipRouter.get("/", async (req, res) => {
    const awsBoatSlips = await getBoatSlips();
    const boatSlips = awsBoatSlips?.map(
        (slip) => BoatSlipFacotry.fromAWSItem(slip)
    );
    res.status(200).json(boatSlips);
});

boatSlipRouter.post("/", async (req, res) => {
    const vacantBoatSlips = (await getVacantBoatSlips()) || [];
    if (!vacantBoatSlips.length) {
        const payload = {
            statusCode: 409,
            Message: "There are no available boat slips.",
        };
        res.status(409).json(payload);
        return;
    }

    const firstVacantSlipNumber: string = vacantBoatSlips[0] || "";
    if (!firstVacantSlipNumber) {
        res.status(500).send();
        return;
    }
    putBoatSlip({
        slipNumber: parseInt(firstVacantSlipNumber),
        vesselName: req.body.vesselName,
        vacant: false,
    });
    const payload = {
        slipNumber: firstVacantSlipNumber,
    };
    res.status(200).json(payload);
});

boatSlipRouter.put("/:slipNumber/vacate", async (req, res) => {
    const vacantBoatSlips = (await getVacantBoatSlips()) || [];
    const boatSlipToVacate: string = req.params.slipNumber;
    if (vacantBoatSlips.includes(boatSlipToVacate)) {
        const payload = {
            statusCode: 409,
            Message: `Boat slip ${boatSlipToVacate} is currently vacant`,
        };
        res.status(409).json(payload);
        return;
    }
    putBoatSlip({
      slipNumber: parseInt(boatSlipToVacate),
      vacant: true});
    res.status(204).send();
});
