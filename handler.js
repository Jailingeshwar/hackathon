const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
"use strict";

module.exports.hello = async (event) => {
  return "successfull";
};


// module.exports.GetNewSchedulelam= async (event) => {
//   return "newSchedule page"

// };

// module.exports.GetExamSchedulelam= async (event) => {
//   return "Landing page"

// };
module.exports.GetSubjectslam= async (event) => {
  const params = {
    TableName: 'exam-schedule-table-dev',
    Key: {
        PK: 'type#subject',
        SK: `${event.queryStringParameters.dept}#${event.queryStringParameters.sem}`
        
    }
}
try {
    const { Item } = await docClient.get(params).promise()
    if (Item) {
        const {subjects} = Item;
        return { subjects }
    } else {
        return 'not able to get data'
    }
} catch (err) {
    console.log(error);
    return error
}

};
module.exports.PostNewSchedule = async (event) => {
  const body = JSON.parse(event.body)
  const params = {
    TableName: process.env.EXAM_SCHEDULE_TABLE,
    Item: {
      PK: "type#btech#eee",
      SK: `sem#${event.queryStringParameters.sem}`,
      courseCode: body.courseCode,
      subjectName: body.subjectName,
      date: body.date,
      session: body.session,
      subjects: body.subjects,
      lab:body.lab
    }
  }
  try {
    await docClient.put(params).promise();
    return 'New subject added to semester schedule';
  } catch (err) {
    return err;
  }
};
module.exports.deleteSchedulelam = async (event) => {
  const params = {
    TableName: process.env.EXAM_SCHEDULE_TABLE,
    Key: {
      PK: `typeScheduleDetails#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}`,
      SK: `sem#${event.queryStringParameters.sem}`,
    }
  }
  try {
    await docClient.delete(params).promise();
    return 'semester schedule deleted successfully';

  } catch (error) {
    console.log(error);
    return error;
  }
};


    