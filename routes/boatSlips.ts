import { Router } from 'express';
export const boatSlipRouter = Router();

boatSlipRouter.get("/", (req, res) => {
  res.send("Get Route");
})

boatSlipRouter.post("/", (req, res) => {
  res.send("Post Route");
})

boatSlipRouter.put("/:slip-number/vacate", (req, res) => {
  res.send("Put Route");
})