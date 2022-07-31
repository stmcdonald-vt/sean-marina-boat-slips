import { readBoatSlips } from './dynamoController'
import BoatSlipFactory from '../factories/boatSlipFactory';


export const getBoatSlips = async () => {
  const awsBoatSlips = await readBoatSlips();
  const boatSlips = awsBoatSlips?.map(
      (slip) => BoatSlipFactory.fromAWSItem(slip)
  );
  return boatSlips;
}