const { expect } = require("chai");
const JiraClient = require("./index.js");
const settings = JSON.parse(require("fs").readFileSync("settings.json"));

describe(`tests.test.js`, function () {
    let jira;
    let testUserKey;

    it(`checking settings`, async function () {
        testUserKey = settings.testUser || settings.testConnection.basic_auth.username;
        expect(testUserKey.length > 0).to.deep.equal(true);
    });

    it(`connect to Jira`, async function () {
        jira = new JiraClient(settings.testConnection);
        expect(typeof jira.issue.getIssue).to.deep.equal("function");
    });

    it(`issue.getIssue`, async function () {
        const r = await jira.issue.getIssue({ issueKey: settings.testIssue });
        expect(r.key).to.deep.equal(settings.testIssue);
    });

    it(`user.getUser`, async function () {
        const r = await jira.user.getUser({ username: testUserKey });
        expect(r.key.toLowerCase()).to.deep.equal(testUserKey.toLowerCase());
    });
});
