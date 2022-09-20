'use strict';

const dynamoose = require("dynamoose");
const hittaSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});

const hittasModel = dynamoose.model("hittas", hittaSchema);

exports.handler = async (event) => {

  const id = event.pathParameters.id;

  try {
    let hittaToDelete = await hittasModel.get(id);
    await hittasModel.delete(id);

    const response = {
      statusCode: 200,
      body: JSON.stringify(`${hittaToDelete.Name} was successfully deleted`),
    }
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not delete the Hitta from the table')),
    }
    return response;
  }
};
