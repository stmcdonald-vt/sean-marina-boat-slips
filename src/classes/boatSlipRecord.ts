import IBoatSlip from '../interfaces/iBoatSlip'
import { AttributeValue } from '@aws-sdk/client-dynamodb';

export default class BoatSlipRecord {
  boatSlip: IBoatSlip;

  constructor(boatSlip: IBoatSlip) {
    this.boatSlip = boatSlip;
  }

  static fromAWSItem(record: Record<string, AttributeValue>) {
    let awsSlipNumber: number;
    let awsVesselName: string | undefined;
    let awsVacant: boolean = false;

    if (!record.slipNumber.N) {
      throw new TypeError("Slip Number cannont be undefined");
    }
    awsSlipNumber = parseInt(record.slipNumber.N);
  
    if (record.vesselName) {
      awsVesselName = record.vesselName.S;
    }
    
    if (record.isVacant) {
      // if it exists it's vacant
      awsVacant = true;
    }

    const newBoatSlip: IBoatSlip = {
      slipNumber: awsSlipNumber,
      vesselName: awsVesselName,
      vacant: awsVacant
    }

    return new BoatSlipRecord(newBoatSlip);
  }
}