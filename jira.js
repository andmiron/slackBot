const fetch = require("node-fetch");

const getComments = async function (issueKey) {
   return fetch(
      `https://and-miron.atlassian.net/rest/api/3/issue/${issueKey}`,
      {
         method: "GET",
         headers: {
            Authorization: `Basic ${Buffer.from(
               `sylneyshii@gmail.com:${process.env.JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
         },
      }
   )
      .then((response) => {
         return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
};

const checkIssue = async function (issueKey) {
   const issueData = fetch(
      `https://and-miron.atlassian.net/rest/api/3/issue/${issueKey}`,
      {
         method: "GET",
         headers: {
            Authorization: `Basic ${Buffer.from(
               `sylneyshii@gmail.com:${process.env.JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
         },
      }
   )
      .then((response) => response.text())
      .then((text) => JSON.parse(text))
      .catch((err) => err);
};

module.exports = checkIssue;
