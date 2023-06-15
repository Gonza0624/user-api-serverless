"use strict";

const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.updateUser = async (event) => {
  const userId = event.pathParameters.id;
  const updatedUser = JSON.parse(event.body);

  const params = {
    TableName: "users",
    Key: { id: userId },
    UpdateExpression: "set #name = :name, email = :email",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": updatedUser.name,
      ":email": updatedUser.email,
    },
  };

  try {
    await dynamodb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Usuario actualizado correctamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al actualizar el usuario" }),
    };
  }
};
