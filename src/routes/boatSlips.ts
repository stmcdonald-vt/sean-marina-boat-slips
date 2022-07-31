import { Router } from "express";
import { getBoatSlips } from "../controllers/getBoatSlipsController";
import { postBoatSlip } from "../controllers/postBoatSlipConroller";
import { putBoatSlip } from "../controllers/putBoatSlipController";
import { postBoatSlipsSchema } from "../schema/postBoatSlipsSchema";
import { putBoatSlipsSchema } from "../schema/putBoatSlipSchema";
export const boatSlipRouter = Router();

boatSlipRouter.get("/", async (req, res) => {
  res.status(200).json(await getBoatSlips());
});

boatSlipRouter.post("/", async (req, res) => {
  const { error } = postBoatSlipsSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const payload = await postBoatSlip(req.body.vesselName);
  if ("statusCode" in payload) {
    res.status(payload.statusCode).json(payload);
    return;
  }
  res.status(200).json(payload);
});

boatSlipRouter.put("/:slipNumber/vacate", async (req, res) => {
  const { error } = putBoatSlipsSchema.validate(req.params.slipNumber);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const payload = await putBoatSlip(parseInt(req.params.slipNumber));
  if (payload.Message) {
    res.status(payload.statusCode).json(payload);
    return;
  }
  res.status(204).send();
});
