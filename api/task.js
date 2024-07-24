import { ListenTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
 UpdateCommand,
 PutCommand,
 DynamoDBDocumentClient,
 ScanCommand,
 DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";
const client = new DynamDBClient({ region: "us-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

// Scan to fetch ALL data
export const fetchTasks = async () => {
 const command = new ScanCommand({
  // Alternative to an actual attribute name
  ExpressionAttributeNames: { "#name": "name" },
  // What returned
  ProjectionExpression: "id, #name, completed",
  TableName: "Tasks",
 });
 const response = await docClient.send(command);

 return response;
};

export const createTasks = async ({ name, completed }) => {
 const uuid = crypto.randomUUID();
 const command = new PutCommand({
  TableName: "Tasks",
  Item: {
   id: uuid,
   name,
   completed,
  },
 });
 const response = await docClient.send(command);

 return response;
};

export const updateTasks = async ({ id, name, completed }) => {
 const command = new UpdateCommand({
  TableName: "Tasks",
  // Let DynamoDB knows which item to be updated
  Key: {
   id,
  },
  ExpressionAttributeNames: { "#name": "name" },
  UpdateExpression: "set #name = :n, completed = :c",
  ExpressionAttributeValues: {
   ":n": name,
   ":c": completed,
  },
  ReturnValues: "ALL_NEW",
 });
 const response = await docClient.send(command);

 return respone;
};

export const deleteTasks = async (id) => {
 const command = new DeleteCommand({
  TableName: "Tasks",
  Key: {
   id,
  },
 });
 const response = await docClient.send(command);
 return response;
};
