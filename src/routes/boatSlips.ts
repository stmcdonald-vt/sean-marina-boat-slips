import { Router } from 'express';
import { getBoatSlips, putBoatSlip } from '../controllers/boatSlipsController';
export const boatSlipRouter = Router();


boatSlipRouter.get("/", (req, res) => {
    const boatSlips = getBoatSlips();
    res.status(200).json(boatSlips);
})

boatSlipRouter.post("/", (req, res) => {
  const boatSlips = getBoatSlips();
  res.send("Post Route");
})

boatSlipRouter.put("/:slip-number/vacate", (req, res) => {
  res.send("Put Route");
})