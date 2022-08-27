const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
module.exports.GetLookuplam= async (event) => {
    const params = {
        TableName: 'exam-schedule-table-dev',
        /* Item properties will depend on your application concerns */
        Key: {
            PK: 'Lookup',
            SK: `Lookup_${event.pathParameters.id}`
        }
    }
    try {
        const { Item } = await docClient.get(params).promise()
        if (Item) {
            const { branch,department,examType } = Item;
            return { branch,department,examType }
        } else {
            return 'not able to get data'
        }
    } catch (err) {
        console.log(error);
        return error
    }
};