import express from 'express';
import { boatSlipRouter } from './routes/boatSlips';
const app = express();
const port = 8080;
app.use("/boat-slips", boatSlipRouter);


export const server = app.listen(port);