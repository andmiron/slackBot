const { App } = require("@slack/bolt");
const fetch = require("node-fetch");
const checkIssue = require("./jira");

require("dotenv").config();

const app = new App({
   token: process.env.SLACK_BOT_TOKEN,
   signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
   const port = process.env.PORT;

   await app.start(port);
   console.log(`Slack bot is running on port ${port}`);
})();

// listening to messages from a user
app.message(/comment ([[a-zA-Z]+-?\d+) [\s\S]*/gi, async ({ message, say }) => {
   const action = message.text.split(" ")[0];
   const issueKeyInput = message.text.split(" ")[1];
   const userMessage = message.text.split(" ").slice(2).join(" ");

   const isIssueExist = await checkIssue(issueKeyInput);
   console.log(isIssueExist);

   // const issuePromise = await fetch(
   //   `https://and-miron.atlassian.net/rest/api/3/issue/${issueKeyInput}`,
   //   {
   //     method: "GET",
   //     headers: {
   //       Authorization: `Basic ${Buffer.from(
   //         `sylneyshii@gmail.com:${process.env.JIRA_API_TOKEN}`
   //       ).toString("base64")}`,
   //       Accept: "application/json",
   //     },
   //   }
   // );

   // const issueDataText = await issuePromise.text();
   // const issueData = JSON.parse(issueDataText);
   // const issueKey = issueData.key;

   // if (!issueKey) {
   //   return await say(`It seems that this issue does not exist!`);
   // }

   //  const commentBodyData = `{
   //   "body": {
   //     "content": [
   //       {
   //         "content": [
   //           {
   //             "text": "${userMessage}",
   //             "type": "text"
   //           }
   //         ],
   //         "type": "paragraph"
   //       }
   //     ],
   //     "type": "doc",
   //     "version": 1
   //   }
   // }`;

   //  fetch(
   //     `https://and-miron.atlassian.net/rest/api/3/issue/${issueKey}/comment`,
   //     {
   //        method: "POST",
   //        headers: {
   //           Authorization: `Basic ${Buffer.from(
   //              `sylneyshii@gmail.com:${process.env.JIRA_API_TOKEN}`
   //           ).toString("base64")}`,
   //           Accept: "application/json",
   //           "Content-Type": "application/json",
   //        },
   //        body: commentBodyData,
   //     }
   //  )
   //     .then(
   //        async () =>
   //           await say(
   //              `Your comment has been successfuly added to issue ${issueKey}`
   //           )
   //     )
   //     .catch(async (err) => await say(`An error occured: ${err}`));
});
