import { writeBoatSlip } from '../src/controllers/dynamoController';
import Environment from '../src/enums/envEnum';
import IBoatSlip from '../src/interfaces/iBoatSlip';
import { config } from 'dotenv';

config();

export const seedFromJSON = async (data: IBoatSlip[], env: Environment = Environment.PROD) => {
  for (let item of data) {
    await writeBoatSlip(item, env);
  }
}