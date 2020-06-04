const TSConsoleReporter = require("jasmine-ts-console-reporter");

jasmine.getEnv().clearReporters(); //clear default console reporter
jasmine.getEnv().addReporter(new TSConsoleReporter());
