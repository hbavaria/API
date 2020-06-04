import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
describe("Authenticating to OeWeb via DeltaDiagnosticsAPI", () => {
  it("Successfully retrieves an authToken and logs in to OeWeb", async () => {
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
  });
});
