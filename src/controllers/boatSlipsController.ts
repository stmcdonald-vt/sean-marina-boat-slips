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

export const getVacantBoatSlips = async () => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "isVacant-slipNumber-index",  
  }
  const vacantBoatSlips = await client.scan(params);
  return vacantBoatSlips.Items?.map((item) => item.slipNumber.N);
}

export const putBoatSlip = async (slipNumber : string, vesselName : string = "", isVacant: boolean = false) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      'slipNumber': {N: slipNumber},
      ...(vesselName && {'vesselName': {S: vesselName}}),
      ...(isVacant && {'isVacant': {S: "x"}})
    }
  }
  return await client.putItem(params);
};
