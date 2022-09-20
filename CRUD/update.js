const dynamoose = require("dynamoose");
const hittaSchema = new dynamoose.Schema({

  "id": String,
  "Name": String,
  "Phone": String

});
const hittasModel = dynamoose.model("hittas", hittaSchema);

exports.handler = async (event) => {

  let updatePeople;


  try {
    let str = event.body.toString();
    let json = JSON.parse(str);

    let newhitta = {
      body: json
    };

    updatePeople = await hittasModel.update({
      id: event.pathParameters.id.toString(),
      Name: newhitta.body.name,
      Phone: newhitta.body.Phone
    });
    const response = {
      statusCode: 200,
      body: JSON.stringify(updatePeople),

    };
    return response;

  } catch (error) {
    const response = {

      statusCode: 500,
      body: JSON.stringify(new Error('Could not read from the hitta table')),
    };
    return response;
  }
};
