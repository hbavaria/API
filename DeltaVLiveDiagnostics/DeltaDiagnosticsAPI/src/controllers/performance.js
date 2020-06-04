import { PerformanceTesterAutomated } from "../performance-utils/PerformanceTesterAutomated";
import { PerformanceTesterLive } from "../performance-utils/PerformanceTesterLive";
import { PerformanceTest } from "../performance-utils/PerformanceTest";
import { WebSocketMessenger } from "../performance-utils/WebSocketMessenger";
import stats from "statsjs";
const { body, validationResult, header, query } = require("express-validator");
let ResultModel = require("../models/performance/Result");
const WebSocket = require("ws");
const shortid = require("shortid");

let performanceRefToIdMap = new Map();

exports.initPerformanceTesterAutomated = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { tests, settings } = req.body;
    let authCookie = req.headers.cookie;

    let perfTests = [];
    for (var i = 0; i < tests.length; i++) {
      let perfTest = new PerformanceTest(
        tests[i].parameterDtos,
        tests[i].displayName,
        tests[i].id,
        settings
      );
      perfTests.push(perfTest);
    }

    let performanceTester = new PerformanceTesterAutomated(
      perfTests,
      authCookie
    );

    let id = shortid.generate();
    performanceRefToIdMap.set(id, performanceTester);
    res.status(200).send({ performanceTestId: id });
    await performanceTester.initTestsAsync();
    performanceRefToIdMap.delete(id);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorReport: err });
    return next(err);
  }
};

exports.initPerformanceTesterLive = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { tests, settings } = req.body;
    let authCookie = req.headers.cookie;

    let perfTests = [];
    for (var i = 0; i < tests.length; i++) {
      let perfTest = new PerformanceTest(
        tests[i].parameterDtos,
        tests[i].displayName,
        tests[i].id,
        settings
      );
      perfTests.push(perfTest);
    }
    let authCookie = req.headers.cookie;

    if (req.body.socketId) {
      let io = req.app.locals.io;
      let wsMessenger = new WebSocketMessenger(req.body.socketId, io);
      let performanceTester = new PerformanceTesterLive(
        perfTests,
        authCookie,
        wsMessenger
      );
    } else {
      let performanceTester = new PerformanceTesterAutomated(
        perfTests,
        authCookie
      );
    }

    let id = shortid.generate();
    performanceRefToIdMap.set(id, performanceTester);
    res.status(200).send({ performanceTestId: id });
    await performanceTester.initTestsAsync();
    performanceRefToIdMap.delete(id);
  } catch (err) {
    console.log(err);
    res.status(500).send({ errorReport: err });
    return next(err);
  }
};

exports.cancelPerformanceTester = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    let { performanceTestId } = req.query;
    let performanceTest = performanceRefToIdMap.get(performanceTestId);
    if (performanceTest) {
      await performanceTest.cancelTests();
      performanceRefToIdMap.delete(performanceTestId);

      res.status(200).send({
        notification: "tests cancelled"
      });
    }
    res.status(400).send({
      notification: "No tests with that id available to cancel"
    });
  } catch (err) {
    res.status(500).send({ errorReport: err });
    return next(err);
  }
};

exports.getTestResults = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { testId, days } = req.query;

    let resultQuery = await ResultModel.find({
      $and: [
        { testId: { $in: req.query.testId } },
        {
          startDate: {
            $gte: new Date(
              new Date().getTime() - req.query.days * 24 * 60 * 60 * 1000
            )
          }
        }
      ]
    })
      .sort({ startDate: 1 })
      .lean()
      .exec();
    res.status(200).json(resultQuery);
  } catch (err) {
    res.status(500).send({ errorReport: err });
    return next(err);
  }
};

exports.getBoxPlotData = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }

    const { testId, days } = req.query;

    let resultQuery = await ResultModel.find({
      $and: [
        { testId: { $in: req.query.testId } },
        {
          startDate: {
            $gte: new Date(
              new Date().getTime() - req.query.days * 24 * 60 * 60 * 1000
            )
          }
        }
      ]
    })
      .sort({ startDate: 1 })
      .lean()
      .exec();
    let {
      avgParseJsonElapsedArr,
      avgGetJsonElapsedArr,
      avgSubscribeElapsedArr
    } = getArrays(resultQuery);
    let subStats = getStats(avgSubscribeElapsedArr);
    let parseJsonStats = getStats(avgParseJsonElapsedArr);
    let getJsonStats = getStats(avgGetJsonElapsedArr);
    let stats = {
      subscribeElapsed: subStats,
      parseJsonElapsed: parseJsonStats,
      getJsonElapsed: getJsonStats
    };
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).send({ errorReport: err });
    return next(err);
  }
};

function getArrays(resultQuery) {
  let parseArr = [];
  let subArr = [];
  let getArr = [];
  for (var i = 0; i < resultQuery.length; i++) {
    parseArr.push(resultQuery[i].avgParseJsonElapsed);
    subArr.push(resultQuery[i].avgSubscribeElapsed);
    getArr.push(resultQuery[i].avgGetJsonElapsed);
  }
  return {
    avgParseJsonElapsedArr: parseArr,
    avgSubscribeElapsedArr: subArr,
    avgGetJsonElapsedArr: getArr
  };
}

function getStats(arr) {
  let median = stats(arr).median();
  let q1 = stats(arr).q1();
  let q3 = stats(arr).q3();
  let outliers = stats(arr).findOutliers();
  let max = stats(arr).max();
  let min = stats(arr).min();
  return { median, q1, q3, outliers, max, min };
}

exports.validate = method => {
  switch (method) {
    case "initPerformanceTest": {
      return [
        body("tests", "no tests found").exists(),
        body("settings", "no settings found").exists(),
        header("Cookie", "no cookie found").exists()
      ];
    }
    case "testResult": {
      return [
        query("testId", "no testId param found").exists(),
        query("days", "no days param found").exists()
      ];
    }
    case "cancelPerformanceTest": {
      return [
        query("performanceTestId", "no performanceTestId param found").exists()
      ];
    }
  }
};
