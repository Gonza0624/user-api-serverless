"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getAllUsers = async () => {
  const params = {
    TableName: "users",
  };

  try {
    const result = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener todos los usuarios" }),
    };
  }
};
