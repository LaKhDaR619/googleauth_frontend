import "./App.css";

import { useReducer, createContext, useEffect } from "react";

import {
  IAuthContext,
  authReducer,
  initialState as reducerInitialState,
} from "./state/authReducer";

import { BrowserRouter as Router } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register/Register";
import { fethWithToken } from "./shared/helpers";
import GoogleCallback from "./components/GoogleCallback";
import Header from "./components/Header";

export const authContext = createContext<IAuthContext>({} as IAuthContext);

function App() {
  const [auth, authDispatch] = useReducer(authReducer, reducerInitialState);

  const checkAuth = async () => {
    try {
      const res = await fethWithToken("/auth/check", { method: "GET" });
      if (res.status === 200) authDispatch({ type: "login" });
      else authDispatch({ type: "logout" });
    } catch (err) {
      authDispatch({ type: "logout" });
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (auth.isLoading) return <h1>Loading...</h1>;

  return (
    <authContext.Provider value={{ auth, authDispatch }}>
      <Header />
      <Router>
        <ProtectedRoute
          path="/"
          exact
          Component={Main}
          condition={false}
          redirectTo="/login"
        />
        <ProtectedRoute
          path="/login"
          Component={Login}
          condition={!auth.loggedIn}
          redirectTo="/main"
          exact
        />
        <ProtectedRoute
          path="/register"
          Component={Register}
          condition={!auth.loggedIn}
          redirectTo="/main"
          exact
        />
        <ProtectedRoute
          path="/google/callback"
          Component={GoogleCallback}
          condition={!auth.loggedIn}
          redirectTo="/main"
          exact
        />
        <ProtectedRoute
          path="/main"
          Component={Main}
          condition={auth.loggedIn}
          redirectTo="/login"
          exact
        />
      </Router>
    </authContext.Provider>
  );
}

export default App;
