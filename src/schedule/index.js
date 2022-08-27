const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
"use strict";

module.exports.GetSemesterSchedulelam= async (event) => {
    const params = {
      TableName: 'exam-schedule-table-dev',
      Key: {
          PK: `typeScheduleDetails#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}`,
          SK: `sem#${event.queryStringParameters.sem}`
          
      }
  }
  try {
      const { Item } = await docClient.get(params).promise()
      if (Item) {
          const {courseCode,date,session,subjectName} = Item;
          return { courseCode,date,session,subjectName}
      } else {
          return 'not able to get data'
      }
  } catch (err) {
      console.log(error);
      return error
  }
  };

  module.exports.GetSemesterLabSchedulelam= async (event) => {
    const params = {
      TableName: 'exam-schedule-table-dev',
      Key: {
          PK: `typeScheduleLabDetails#${event.queryStringParameters.branch}#${event.queryStringParameters.dept}`,
          SK: `sem#${event.queryStringParameters.sem}`
          
      }
  }
  try {
      const { Item } = await docClient.get(params).promise()
      if (Item) {
          const {courseCode,date,session,subjectName} = Item;
          return { courseCode,date,session,subjectName}
      } else {
          return 'not able to get data'
      }
  } catch (err) {
      console.log(error);
      return error
  }
};