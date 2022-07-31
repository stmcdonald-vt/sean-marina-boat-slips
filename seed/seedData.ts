import { writeBoatSlip } from '../src/controllers/dynamoController';
import IBoatSlip from '../src/interfaces/iBoatSlip';


export const seedFromJSON = async (data: IBoatSlip[]) => {
  for (let item of data) {
    writeBoatSlip(item);
  }
}