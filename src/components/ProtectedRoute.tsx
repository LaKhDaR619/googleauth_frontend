//import { PageHeader } from "antd";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  Component: React.FC;
  condition: boolean;
  redirectTo: string;
}

const ProtectedRoute: React.FC<Props> = ({
  Component,
  condition,
  redirectTo,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (condition) return <Component {...rest} {...props} />;
        else return <Redirect to={redirectTo} />;
      }}
    />
  );
};

export default ProtectedRoute;
