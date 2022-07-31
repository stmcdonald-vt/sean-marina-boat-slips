import { Request } from "express";
import IBoatSlip from "../interfaces/iBoatSlip";
import IStatus from "../interfaces/iStatus";
import { readVacantBoatSlips, writeBoatSlip } from "./dynamoController";

export const postBoatSlip = async (vesselName: string) => {
  let payload: IStatus | Partial<IBoatSlip>;
  const vacantBoatSlips = (await readVacantBoatSlips()) || [];
  if (!vacantBoatSlips.length) {
      payload = {
          statusCode: 409,
          Message: "There are no available boat slips.",
      };
      return payload;
  }

  const firstVacantSlipNumber: string = vacantBoatSlips[0] || "";
  if (!firstVacantSlipNumber) {
      payload = {
        statusCode: 500,
        Message: "Something went wrong!"
      }
      return payload;
  }
  writeBoatSlip({
      slipNumber: parseInt(firstVacantSlipNumber),
      vesselName: vesselName,
      vacant: false,
  });
  payload = {
      slipNumber: parseInt(firstVacantSlipNumber),
  };
}