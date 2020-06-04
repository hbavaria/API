import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AUTHENTICATOR_PAGE_LINK } from "../../appConstants";
import auth from "./auth";

//if we are authenticated, render the component, else redirect to authenticator
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: AUTHENTICATOR_PAGE_LINK,
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
