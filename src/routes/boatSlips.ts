import { Router } from "express";
import BoatSlipFacotry from "../factories/boatSlipFactory";
import { getBoatSlips } from "../controllers/getBoatSlipsController";
import { post } from "superagent";
import { postBoatSlip } from "../controllers/postBoatSlipConroller";
import { putBoatSlip } from "../controllers/putBoatSlipController";
export const boatSlipRouter = Router();

boatSlipRouter.get("/", async (req, res) => {
    res.status(200).json(await getBoatSlips());
});

boatSlipRouter.post("/", async (req, res) => {
    const payload = await postBoatSlip(req);
    if (payload?.statusCode) {
        res.status(payload.statusCode).json(payload);
        return;
    }
    res.status(200).json(payload);
});

boatSlipRouter.put("/:slipNumber/vacate", async (req, res) => {
    const payload = await putBoatSlip(parseInt(req.params.slipNumber));
    if (payload.Message) {
        res.status(payload.statusCode).json(payload);
        return;
    } 
    res.status(204).send();
});
