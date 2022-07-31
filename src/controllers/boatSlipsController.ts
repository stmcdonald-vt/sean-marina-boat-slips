import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { config } from "dotenv";

const client = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION });

const TABLE_NAME: string = "seans-marina-boat-slip-db";

export const getBoatSlips = async () => {
  const params = {
    TableName: TABLE_NAME
  }
  const boatSlips = await client.scan(params);
  return boatSlips.Items;
};

export const putBoatSlip = async (slipNumber : number, vesselName : string) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'slipNumber': {N: slipNumber.toString()},
      'vesselName': {S: vesselName}
    }
  }
  return await client.putItem(params);
};

export const getVacantBoatSlips = async (vesselName: string) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "isVacant-slipNumber-index",  
  }
  const vacantBoatSlips = await client.scan(params);
  return vacantBoatSlips.Items;
}

