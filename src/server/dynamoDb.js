const AWS = require("aws-sdk");

let awsRegion = process.env.AWS_REGION;
let dynamoDbEventsTable = process.env.EVENTS_TABLE_NAME;

AWS.config.update({region: awsRegion});

const docClient = new AWS.DynamoDB.DocumentClient();

const getEventsForLocation = function (locationId, cb) {
    const params = {
        TableName: dynamoDbEventsTable,
        Key: {
            locationId: locationId
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:",
                JSON.stringify(err, null, 2));
            cb(null, "Failed to load events");
        } else {
            cb(data.Item);
        }
    });
};

module.exports = {
    getEventsForLocation
};
