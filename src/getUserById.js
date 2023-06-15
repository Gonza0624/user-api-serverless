"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.getUser = async (event) => {
  const userId = event.pathParameters.id;
  const params = {
    TableName: "users",
    Key: { id: userId },
  };

  try {
    const result = await dynamodb.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener el usuario" }),
    };
  }
};
