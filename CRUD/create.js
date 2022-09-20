'use strict';

const dynamoose = require('dynamoose');

const hittaSchema = new dynamoose.Schema({
  "id": String,
  "Name": String,
  "Phone": String
});

const hittaModel = dynamoose.model('hitta', hittaSchema);

exports.handler = async (event) => {

  const hitta = {
    id: event.queryStringParameters.id,
    Name: event.queryStringParameters.Name,
    Phone: event.queryStringParameters.Phone,
  };

  try {
    let newhitta = await hittaModel.create(hitta);
    const response = {
      statusCode: 200,
      body: JSON.stringify(newhitta),
    }
    return response;
  } catch (error) {

    const response = {
      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the Hitta table'))
    };
    return response;


  }
};
