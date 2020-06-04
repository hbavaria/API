import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../utils/auth/protected-route";
import DashboardPage from "./dashboard/DashboardPage";
import ApiTesterPage from "./apiTester/ApiTesterPage";
import Header from "./common/header/Header";
import NotFoundPage from "./NotFoundPage";
import AboutPage from "./about/AboutPage";
import ParameterTesterPage from "./parameterTester/ParameterTesterPage";
import * as appConstants from "../appConstants";
import PerformanceTesterPage from "./performanceTester/PerformanceTesterPage";
import Details from "./dashboard/DisplayDetailsControl/Details";
import ReferenceData from "./dashboard/DisplayDetailsControl/ReferenceData";
import Authenticator from "../utils/auth/Authenticator";
import PerformanceResultsPage from "./performanceResults/PerformanceResultsPage";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route
          exact
          path={appConstants.AUTHENTICATOR_PAGE_LINK}
          component={Authenticator}
        />
        <ProtectedRoute
          path={appConstants.DASHBOARD_PAGE_LINK}
          component={DashboardPage}
        />
        <ProtectedRoute
          path={appConstants.API_TESTER_PAGE_LINK}
          component={ApiTesterPage}
        />
        <ProtectedRoute
          path={appConstants.PARAMETER_TESTER_PAGE_LINK}
          component={ParameterTesterPage}
        />
        <ProtectedRoute
          path={appConstants.PERFORMANCE_TESTER_PAGE_LINK}
          component={PerformanceTesterPage}
        />
        <Route
          path={appConstants.DISPLAY_DETAILS_PAGE_LINK}
          component={Details}
        />
        <Route
          path={appConstants.REFERENCE_DATA_PAGE_LINK}
          component={ReferenceData}
        />
        <Route
          path={appConstants.PERFORMANCE_RESULTS_PAGE_LINK}
          component={PerformanceResultsPage}
        />
        <Route path={appConstants.ABOUT_PAGE_LINK} component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
