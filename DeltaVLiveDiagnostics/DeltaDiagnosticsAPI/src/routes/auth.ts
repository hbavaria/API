import express from "express";
import fetch from "node-fetch";
const router = express.Router();

/**
 * @api {get} /auth/token Get auth token for OeWeb
 * @apiName GetAuthToken
 * @apiGroup Authentication
 *
 * @apiSuccess {String} authenticationToken Authentication Token for OeWeb.
 * @apiSuccess {String} address  Session Address.
 * @apiSuccess {String} returnUrl  The url to redirect to.
 * @apiSuccess {String} OpHubInstanceID  DeltaV Live Instance ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     { authenticationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSU5URVJOLUpPU0gtREVWXFxkdmFkbWluIiwiQWRkcmVzcyI6Ik9lQXBwbGljYXRpb25TZXJ2aWNlLzIiLCJPcEh1YkNvbnRleHRJZCI6IjdjZTE4MzBlLTVkOTgtNGY4NC1iZjIwLTZhZGM0ZGZiYjU3MCIsIm5iZiI6MTU3NjI1NDEzNSwiZXhwIjoxODkyNDc4MTM1LCJpc3MiOiJpbnRlcm4tam9zaC1kZXYiLCJhdWQiOiJpbnRlcm4tam9zaC1kZXYifQ.NGDG3rI_Fbo1GJwd-1yQDhQ2uz6QLyVDObDldlX6LQI',
 *       address: 'OeApplicationService/2',
 *       returnUrl: '',
 *       OpHubInstanceID: '7ce1830e-5d98-4f84-bf20-6adc4dfbb570'
 *     }
 *
 * @apiError AuthTokenRetrievalFailed The auth token could not be retrieved.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "AuthTokenRetrievalFailed"
 *     }
 */
router.get("/token", async (req, res) => {
  try {
    let authResp = await fetch(`${process.env.AUTH_TOKEN_URL}`);
    if (authResp.ok) {
      res.status(200).send(await authResp.json());
    } else {
      res.status(500).send({ error: "AuthTokenRetrievalFailed" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * @api {post} /auth/login Login to OeWeb with json token
 * @apiName LoginToOeWeb
 * @apiGroup Authentication
 *
 * @apiParam (Request Body) {String} authenticationToken Authentication Token for OeWeb.
 * @apiParam (Request Body) {String} address  Session Address.
 * @apiParam (Request Body) {String} returnUrl  The url to redirect to.
 * @apiParam (Request Body) {String} OpHubInstanceID  DeltaV Live Instance ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "authentication": "Success!"
 *     }
 *
 * @apiError LoginFailed Could not login to OeWeb.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "LoginFailed"
 *     }
 */
router.post("/login", async (req, res) => {
  try {
    let loginResp = await fetch(
      `${process.env.OE_WEB_SERVER_URL}/Account/LoginWithJsonToken`,
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (loginResp.ok) {
      let oeWebCookie = loginResp.headers.get("Set-Cookie");
      res.set({ "Set-Cookie": oeWebCookie });
      res.status(200).send({ authentication: "Success!" });
    } else {
      res.status(500).send({ error: "LoginFailed" });
    }
  } catch (error) {
    console.log(error);
  }
});

export = router;
