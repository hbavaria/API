const request = require("request");
const fetch = require("node-fetch");
const now = require("performance-now");
var opHubId = "";
var cookieString = "";

async function getAuthToken() {
  try {
    let authResp = await fetch("http://localhost:4000/auth/token");
    let json = await authResp.json();
    opHubId = json.OpHubInstanceID;
    return json;
  } catch (error) {
    console.log(error);
  }
}

async function loginToOeWeb(authJson) {
  console.log(authJson);
  try {
    let loginResp = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      body: authJson,
      headers: {
        "Content-Type": "application/json"
      }
    });
    cookieString = loginResp.headers.get("Set-Cookie");

    return loginResp;
  } catch (error) {
    console.log(error);
  }
}

async function getAllPerfTests() {
  try {
    let allPerfTestResp = await fetch(
      "http://localhost:4000/performance/test/all",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString
        }
      }
    );
    console.log(await allPerfTestResp.json());
  } catch (error) {
    console.log(error);
  }
}

async function runPerformanceTestFromConfigFile() {
  var configFile = require("../test_configs/testConfig.json");
  let settings = {
    numIterations: configFile.settings.numIterations,
    iterationDelay: configFile.settings.iterationDelay,
    testDelay: configFile.settings.testDelay
  };
  let tests = [];
  for (var i = 0; i < configFile.tests.length; i++) {
    let testItem = {
      displayName: configFile.tests[i].displayName,
      parameterDtos: configFile.tests[i].parameterDtos,
      id: configFile.tests[i].itemId
    };
    tests.push(testItem);
  }
  let postBody = {
    settings,
    tests
  };
  try {
    let perfResp = await fetch("http://localhost:4000/performance/test/init", {
      body: JSON.stringify(postBody),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString
      }
    });
    console.log(await perfResp.json());
  } catch (error) {
    console.log(error);
  }
}

async function testScript() {
  let authJson = await getAuthToken();
  await loginToOeWeb(JSON.stringify(authJson));
  await runPerformanceTestFromConfigFile();
}

try {
  testScript();
} catch (error) {
  console.log(error);
}
