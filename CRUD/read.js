const dynamoose = require("dynamoose");
const hittaSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});
const hittasModel = dynamoose.model("hittas", hittaSchema);
exports.handler = async (event) => {

  console.log(event, event.pathParameters);

  try {
    if (event.pathParameters) {
      let peopleData = await peopleData.query('id').contains(event.pathParameters.id).exec();

    } else {

      peopleData = await hittasModel.scan().all().exec();
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(peopleData)
    };
    return response;

  } catch (e) {
    console.log(e);

    const response = {
      statusCode: 500,
      body: JSON.stringify(e),

    };
    return response;

  }
};
