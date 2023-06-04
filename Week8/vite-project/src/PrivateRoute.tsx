import { Route, Redirect, RouteProps } from "wouter";
import { ReactElement, useEffect } from "react";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}): ReactElement => {
  let auth = sessionStorage.getItem("auth");
  sessionStorage.setItem("path", location.pathname);
  useEffect(() => {
    auth = sessionStorage.getItem("auth");
  }, [auth]);
  return (
    <Route
      {...rest}
      component={(props) =>
        auth == "true" ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
