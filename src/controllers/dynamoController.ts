import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { config } from "dotenv";
import IBoatSlip from "../interfaces/iBoatSlip";

const client = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION });

const TABLE_NAME: string = "seans-marina-boat-slip-db";

export const readBoatSlips = async () => {
  const params = {
    TableName: TABLE_NAME,
    ConsistentRead: true
  }
  const boatSlips = await client.scan(params);
  return boatSlips.Items;
};

export const readVacantBoatSlips = async () => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "isVacant-slipNumber-index"
  }
  const vacantBoatSlips = await client.scan(params);
  return vacantBoatSlips.Items?.map((item) => item.slipNumber.N);
}

export const writeBoatSlip = async (record: IBoatSlip) => {
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
