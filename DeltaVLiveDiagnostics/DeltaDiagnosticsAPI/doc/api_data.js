define({ "api": [
  {
    "type": "get",
    "url": "/auth/token",
    "title": "Get auth token for OeWeb",
    "name": "GetAuthToken",
    "group": "Authentication",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "authenticationToken",
            "description": "<p>Authentication Token for OeWeb.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Session Address.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "returnUrl",
            "description": "<p>The url to redirect to.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "OpHubInstanceID",
            "description": "<p>DeltaV Live Instance ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{ authenticationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSU5URVJOLUpPU0gtREVWXFxkdmFkbWluIiwiQWRkcmVzcyI6Ik9lQXBwbGljYXRpb25TZXJ2aWNlLzIiLCJPcEh1YkNvbnRleHRJZCI6IjdjZTE4MzBlLTVkOTgtNGY4NC1iZjIwLTZhZGM0ZGZiYjU3MCIsIm5iZiI6MTU3NjI1NDEzNSwiZXhwIjoxODkyNDc4MTM1LCJpc3MiOiJpbnRlcm4tam9zaC1kZXYiLCJhdWQiOiJpbnRlcm4tam9zaC1kZXYifQ.NGDG3rI_Fbo1GJwd-1yQDhQ2uz6QLyVDObDldlX6LQI',\n  address: 'OeApplicationService/2',\n  returnUrl: '',\n  OpHubInstanceID: '7ce1830e-5d98-4f84-bf20-6adc4dfbb570'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthTokenRetrievalFailed",
            "description": "<p>The auth token could not be retrieved.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"AuthTokenRetrievalFailed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.ts",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/auth/token"
      }
    ]
  },
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login to OeWeb with json token",
    "name": "LoginToOeWeb",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "authenticationToken",
            "description": "<p>Authentication Token for OeWeb.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Session Address.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "returnUrl",
            "description": "<p>The url to redirect to.</p>"
          },
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "OpHubInstanceID",
            "description": "<p>DeltaV Live Instance ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"authentication\": \"Success!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "LoginFailed",
            "description": "<p>Could not login to OeWeb.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"error\": \"LoginFailed\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.ts",
    "groupTitle": "Authentication",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/auth/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/performance/test/cancel",
    "title": "Cancel a currently running performance test",
    "name": "CancelPerformanceTest",
    "group": "Performance",
    "parameter": {
      "fields": {
        "Query Param": [
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "performanceTestId",
            "description": "<p>Id of the performance test to cancel.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "performanceTestId",
            "description": "<p>The id of the performance test that was initiated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   notification: \"tests cancelled\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/performance.ts",
    "groupTitle": "Performance",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/performance/test/cancel"
      }
    ]
  },
  {
    "type": "get",
    "url": "/performance/test/result",
    "title": "Get all box plot data for a given performance test ID in the past X days",
    "name": "GetBoxPlotData",
    "group": "Performance",
    "parameter": {
      "fields": {
        "Query Param": [
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "testId",
            "description": "<p>Id of the performance test to cancel.</p>"
          },
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "days",
            "description": "<p>The number of days to filter retrieval of data (i.e. 7 days to fetch the past week).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n\"subscribeElapsed\": {\n  \"median\": 51.89400000000023,\n  \"q1\": 51.89400000000023,\n  \"q3\": 51.89400000000023,\n  \"outliers\": [],\n  \"max\": 51.89400000000023,\n  \"min\": 51.89400000000023\n},\n\"parseJsonElapsed\": {\n  \"median\": 0.08283960000262595,\n  \"q1\": 0.08283960000262595,\n  \"q3\": 0.08283960000262595,\n  \"outliers\": [],\n  \"max\": 0.08283960000262595,\n  \"min\": 0.08283960000262595\n},\n\"getJsonElapsed\": {\n  \"median\": 8.300579799999833,\n  \"q1\": 8.300579799999833,\n  \"q3\": 8.300579799999833,\n  \"outliers\": [],\n  \"max\": 8.300579799999833,\n  \"min\": 8.300579799999833\n}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/performance.ts",
    "groupTitle": "Performance",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/performance/test/result"
      }
    ]
  },
  {
    "type": "get",
    "url": "/performance/test/result",
    "title": "Get all results for a given performance test ID in the past X days",
    "name": "GetPerformanceResults",
    "group": "Performance",
    "parameter": {
      "fields": {
        "Query Param": [
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "testId",
            "description": "<p>Id of the performance test to cancel.</p>"
          },
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "days",
            "description": "<p>The number of days to filter retrieval of data (i.e. 7 days to fetch the past week).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n {\n   \"_id\": \"5df3e3145056c04f9c4ec30c\",\n    \"lowSubscribeElapsed\": 7.161000000007334,\n   \"highSubscribeElapsed\": 126.75209999999788,\n   \"avgSubscribeElapsed\": 51.89400000000023,\n   \"avgGetJsonElapsed\": 8.300579799999833,\n   \"avgParseJsonElapsed\": 0.08283960000262595,\n   \"startDate\": \"2019-12-13T19:14:20.496Z\",\n   \"endDate\": \"2019-12-13T19:14:28.818Z\",\n   \"testId\": \"5dd2a17342e4cb4a646c3e53\",\n   \"iterations\": [\n     {\n       \"subscribeElapsed\": 126.75209999999788,\n       \"getJsonElapsed\": 24.61850100000447,\n       \"parseJsonElapsed\": 0.11379899999883492,\n       \"displayJsonSize\": \"3.748 KB\",\n       \"animationScriptSize\": \"1.412 KB\",\n       \"eventScriptSize\": \"152 Bytes\",\n       \"startDate\": \"2019-12-13T19:14:20.503Z\",\n       \"endDate\": \"2019-12-13T19:14:20.662Z\",\n       \"iterationNumber\": 1,\n       \"displayErrors\": [],\n       \"parameterErrors\": []\n     }\n   ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/performance.ts",
    "groupTitle": "Performance",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/performance/test/result"
      }
    ]
  },
  {
    "type": "get",
    "url": "/performance/test/all",
    "title": "Get all performance tests from the database, ordered from most recent to oldest",
    "name": "GetPerformanceTests",
    "group": "Performance",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n[\n{\n  \"_id\": \"5dd2a17342e4cb4a646c3e53\",\n  \"settings\": {\n    \"numIterations\": 5,\n    \"iterationDelay\": 2000,\n    \"testDelay\": 1000,\n    \"_id\": \"5df3e3145056c04f9c4ec30a\"\n  },\n  \"displayName\": \"Display1\",\n  \"parameterDtos\": [\n    {\n      \"_id\": \"5df3e3145056c04f9c4ec30b\",\n      \"path\": \"PID_LOOP_4/PARAM1\"\n    }\n  ],\n  \"__v\": 0\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/performance.ts",
    "groupTitle": "Performance",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/performance/test/all"
      }
    ]
  },
  {
    "type": "post",
    "url": "/performance/test/init",
    "title": "Initiate new performance test",
    "name": "InitPerformanceTest",
    "group": "Performance",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "json",
            "optional": false,
            "field": "tests",
            "description": "<p>Array of performance tests to run.</p>"
          },
          {
            "group": "Request body",
            "type": "json",
            "optional": false,
            "field": "settings",
            "description": "<p>Test settings.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "socketId",
            "description": "<p>WebSocketId to send updates through (optional).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example Body:",
          "content": "{\n\"settings\": {\n  \"numIterations\": 5,\n  \"iterationDelay\": 2000,\n  \"testDelay\": 1000\n},\n\"tests\": [\n  {\n    \"displayName\": \"Display1\",\n    \"parameterDtos\": [\n      {\n        \"path\": \"PID_LOOP_4/PARAM1\"\n      }\n    ],\n    \"id\": \"5dd2a17342e4cb4a646c3e53\"\n  }\n],\n\"socketId\": \"pK0vJaZYIaAojUByAAAB\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Cookie",
            "description": "<p>OeWeb authentication cookie</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "performanceTestId",
            "description": "<p>The id of the performance test that was initiated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   performanceTestId: \"JzbsPkpA\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/performance.ts",
    "groupTitle": "Performance",
    "sampleRequest": [
      {
        "url": "http://localhost:4000/performance/test/init"
      }
    ]
  }
] });
