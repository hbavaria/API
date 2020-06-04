import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
describe("Initiating a performance test", () => {
  it("Successfully retrieves an authToken, logs in to OeWeb, and initiates a performance test", async () => {
    let authResp = await fetch(
      `${process.env.DELTA_DIAGNOSTICS_API_URL}/auth/token`
    );
    expect(authResp.ok).toEqual(
      true,
      "The fetch request for an authToken should be successful. Please ensure that the DeltaDiagnostics API, the AuthToken Service, and DeltaVLive are all running"
    );
    let authJson = await authResp.json();
    let expectedKeys = [
      "authenticationToken",
      "address",
      "returnUrl",
      "OpHubInstanceID"
    ];
    let keysFromAuthResp = Object.keys(authJson);
    for (var i = 0; i < expectedKeys.length; i++) {
      expect(keysFromAuthResp).toContain(
        expectedKeys[i],
        "The response should contain an authenticationToken, address, returnUrl, and an OpHubInstanceID"
      );
    }
    let loginResp = await fetch(
      `${process.env.DELTA_DIAGNOSTICS_API_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(authJson),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    expect(loginResp.ok).toEqual(
      true,
      "The login response should be successful"
    );
    let cookieString = loginResp.headers.get("Set-Cookie");
    expect(cookieString).toBeDefined(
      "A cookie should be retrieved after logging in"
    );

    var configFile = require("./perfTestConfig/basicTest.json");
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
    let perfResp = await fetch(
      `${process.env.DELTA_DIAGNOSTICS_API_URL}/performance/test/init`,
      {
        body: JSON.stringify(postBody),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieString
        }
      }
    );
    expect(perfResp.ok).toEqual(
      true,
      "A performance test should be successfully started"
    );
  });
});
