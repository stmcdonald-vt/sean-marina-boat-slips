import { putBoatSlip } from '../src/controllers/boatSlipsController';
import data from './data.json';

export const seedData = async () => {
  for(let item of data.boatSlips) {
    putBoatSlip(item.slipNumber.toString(), "", true);
  }
}

seedData();