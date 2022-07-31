import { putBoatSlip } from '../src/controllers/boatSlipsController';
import IBoatSlip from '../src/interfaces/iBoatSlip';


export const seedFromJSON = async (data: IBoatSlip[]) => {
  for (let item of data) {
    putBoatSlip(item);
  }
}