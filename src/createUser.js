"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.createUser = async (event) => {
  const user = JSON.parse(event.body);
  const params = {
    TableName: "users",
    Item: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };

  try {
    await dynamodb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Usuario creado correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al crear el usuario" }),
    };
  }
};
