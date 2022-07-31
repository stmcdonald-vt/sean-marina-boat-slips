import { Request } from 'express';
import IBoatSlip from '../interfaces/iBoatSlip';
import IStatus from '../interfaces/iStatus';
import { writeBoatSlip, readVacantBoatSlips } from './dynamoController'

export const putBoatSlip = async (boatSlipToVacate: number): Promise<IStatus> => {
  let payload: IStatus;
  const vacantBoatSlips = (await readVacantBoatSlips()) || [];
  if (vacantBoatSlips.includes(boatSlipToVacate.toString())) {
      payload = {
        statusCode: 409,
        Message: `Boat slip ${boatSlipToVacate} is currently vacant`
      }
      return payload;
  }

  writeBoatSlip({slipNumber: boatSlipToVacate, vacant: true});
  payload = { statusCode: 204 };
  return payload;
}