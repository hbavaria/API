import express from "express";
let TestModel = require("../models/performance/Test");
const router = express.Router();
const performanceController = require("../controllers/performance");

/**
 * @api {post} /performance/test/init Initiate new performance test
 * @apiName InitPerformanceTest
 * @apiGroup Performance
 *
 * @apiParam (Request body) {json} tests Array of performance tests to run.
 * @apiParam (Request body) {json} settings Test settings.
 * @apiParam (Request body) {String} [socketId]  WebSocketId to send updates through (optional).
 * @apiHeader {String} Cookie OeWeb authentication cookie
 * @apiSuccess {String} performanceTestId  The id of the performance test that was initiated
 * @apiParamExample {json} Request Example Body:
 * {
 * "settings": {
 *   "numIterations": 5,
 *   "iterationDelay": 2000,
 *   "testDelay": 1000
 * },
 * "tests": [
 *   {
 *     "displayName": "Display1",
 *     "parameterDtos": [
 *       {
 *         "path": "PID_LOOP_4/PARAM1"
 *       }
 *     ],
 *     "id": "5dd2a17342e4cb4a646c3e53"
 *   }
 * ],
 * "socketId": "pK0vJaZYIaAojUByAAAB"
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        performanceTestId: "JzbsPkpA"
 *     }
 *
 */
router.post(
  "/test/init",
  performanceController.validate("initPerformanceTest"),
  performanceController.initPerformanceTesterLive
);

/**
 * @api {get} /performance/test/cancel Cancel a currently running performance test
 * @apiName CancelPerformanceTest
 * @apiGroup Performance
 * @apiParam (Query Param) {String} performanceTestId Id of the performance test to cancel.
 * @apiSuccess {String} performanceTestId  The id of the performance test that was initiated
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        notification: "tests cancelled"
 *     }
 *
 */
router.get(
  "/test/cancel",
  performanceController.validate("cancelPerformanceTest"),
  performanceController.cancelPerformanceTester
);

/**
 * @api {get} /performance/test/all Get all performance tests from the database, ordered from most recent to oldest
 * @apiName GetPerformanceTests
 * @apiGroup Performance
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *[
 * {
 *   "_id": "5dd2a17342e4cb4a646c3e53",
 *   "settings": {
 *     "numIterations": 5,
 *     "iterationDelay": 2000,
 *     "testDelay": 1000,
 *     "_id": "5df3e3145056c04f9c4ec30a"
 *   },
 *   "displayName": "Display1",
 *   "parameterDtos": [
 *     {
 *       "_id": "5df3e3145056c04f9c4ec30b",
 *       "path": "PID_LOOP_4/PARAM1"
 *     }
 *   ],
 *   "__v": 0
 * }
 *]
 *
 */
router.get("/test/all", async (req, res) => {
  try {
    let perfTests = await TestModel.find()
      .sort({ _id: -1 })
      .lean()
      .exec();
    res.status(200).json(perfTests);
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorReport: error });
  }
});

/**
 * @api {get} /performance/test/result Get all results for a given performance test ID in the past X days
 * @apiName GetPerformanceResults
 * @apiGroup Performance
 * @apiParam (Query Param) {String} testId Id of the performance test to cancel.
 * @apiParam (Query Param) {String} days The number of days to filter retrieval of data (i.e. 7 days to fetch the past week).
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 * [
 *  {
 *    "_id": "5df3e3145056c04f9c4ec30c",
 *     "lowSubscribeElapsed": 7.161000000007334,
 *    "highSubscribeElapsed": 126.75209999999788,
 *    "avgSubscribeElapsed": 51.89400000000023,
 *    "avgGetJsonElapsed": 8.300579799999833,
 *    "avgParseJsonElapsed": 0.08283960000262595,
 *    "startDate": "2019-12-13T19:14:20.496Z",
 *    "endDate": "2019-12-13T19:14:28.818Z",
 *    "testId": "5dd2a17342e4cb4a646c3e53",
 *    "iterations": [
 *      {
 *        "subscribeElapsed": 126.75209999999788,
 *        "getJsonElapsed": 24.61850100000447,
 *        "parseJsonElapsed": 0.11379899999883492,
 *        "displayJsonSize": "3.748 KB",
 *        "animationScriptSize": "1.412 KB",
 *        "eventScriptSize": "152 Bytes",
 *        "startDate": "2019-12-13T19:14:20.503Z",
 *        "endDate": "2019-12-13T19:14:20.662Z",
 *        "iterationNumber": 1,
 *        "displayErrors": [],
 *        "parameterErrors": []
 *      }
 *    ]
 *   }
 * ]
 *
 */
router.get(
  "/test/result",
  performanceController.validate("testResult"),
  performanceController.getTestResults
);

/**
 * @api {get} /performance/test/result Get all box plot data for a given performance test ID in the past X days
 * @apiName GetBoxPlotData
 * @apiGroup Performance
 * @apiParam (Query Param) {String} testId Id of the performance test to cancel.
 * @apiParam (Query Param) {String} days The number of days to filter retrieval of data (i.e. 7 days to fetch the past week).
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *{
 * "subscribeElapsed": {
 *   "median": 51.89400000000023,
 *   "q1": 51.89400000000023,
 *   "q3": 51.89400000000023,
 *   "outliers": [],
 *   "max": 51.89400000000023,
 *   "min": 51.89400000000023
 * },
 * "parseJsonElapsed": {
 *   "median": 0.08283960000262595,
 *   "q1": 0.08283960000262595,
 *   "q3": 0.08283960000262595,
 *   "outliers": [],
 *   "max": 0.08283960000262595,
 *   "min": 0.08283960000262595
 * },
 * "getJsonElapsed": {
 *   "median": 8.300579799999833,
 *   "q1": 8.300579799999833,
 *   "q3": 8.300579799999833,
 *   "outliers": [],
 *   "max": 8.300579799999833,
 *   "min": 8.300579799999833
 * }
 *}
 *
 */
router.get(
  "/test/result/boxplot",
  performanceController.validate("testResult"),
  performanceController.getBoxPlotData
);

export = router;
