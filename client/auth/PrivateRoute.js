import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";
//so the zzprop is named "comonent", but it will renamed into "Comonentx" (zzTmy), then it will be inside the zzrednerprop!
const PrivateRoute = ({ component: Componentx, ...rest }) => (
  // really a zzrenderprops! https://reactjs.org/docs/render-props.html
  <Route
    {...rest}
    render={fromRouteAPI_props =>
      // zzrenderprops, but the zzcallback zzfunction we passed it, has parameter from zzrouter = props
      // if go into zzroute zzsourcecode, then can see more "zzrouteprops" stuff, but zzDoesNotUnderstand zzdifficult zztypescript ((ℹ️ zzpp._08._y20.0217-2250))
      // also strange - https://reacttraining.com/react-router/web/example/auth-workflow
      // does NOT talk anything about "Component" import from react.. zzQ ((ℹ️ zzpp._08._y20.0217-2255 ))

      auth.isAuthenticated() ? (
        <Componentx {...fromRouteAPI_props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            // so this is how we pass to zzsignin so that he can zzredirect back! ((❇️ zzppp._08._y20.0223-2130))
            state: { from: fromRouteAPI_props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
