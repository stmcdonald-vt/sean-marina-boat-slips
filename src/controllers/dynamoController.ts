import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { config } from "dotenv";
import Environment from "../enums/envEnum";
import IBoatSlip from "../interfaces/iBoatSlip";

config();

const client = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION });
console.log(process.env.DB_TABLE);
let TABLE_NAME: string = process.env.DB_TABLE || "seans-marina-boat-slip-db";

export const readBoatSlips = async (env: Environment = Environment.PROD) => {
  if (env === Environment.TEST) {
    TABLE_NAME = process.env.TEST_DB_TABLE || "seans-marina-boat-slip-db";
  }
  const params = {
    TableName: TABLE_NAME,
    ConsistentRead: true
  }
  const boatSlips = await client.scan(params);
  return boatSlips.Items;
};

export const readVacantBoatSlips = async (env: Environment = Environment.PROD) => {
  if (env === Environment.TEST) {
    TABLE_NAME = process.env.TEST_DB_TABLE || "seans-marina-boat-slip-db";
  }

  const params = {
    TableName: TABLE_NAME,
    IndexName: "isVacant-slipNumber-index"
  }
  const vacantBoatSlips = await client.scan(params);
  return vacantBoatSlips.Items?.map((item) => item.slipNumber.N);
}

export const writeBoatSlip = async (record: IBoatSlip, env: Environment = Environment.PROD) => {
  if (env === Environment.TEST) {
    TABLE_NAME = process.env.TEST_DB_TABLE || "seans-marina-boat-slip-db";
  }
  
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'slipNumber': {N: record.slipNumber.toString()},
      ...(record.vesselName && {'vesselName': {S: record.vesselName}}),
      ...(record.vacant && {'isVacant': {S: "x"}})
    }
  }
  return await client.putItem(params);
};
