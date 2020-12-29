import { Dispatch } from "react";

type Actions =
  // if we already have a token we don't set it
  | { type: "login" }
  | {
      type: "logout";
    }
  | { type: "set_error"; error: string }
  | { type: "clear_error" };

interface State {
  loggedIn: boolean;
  isLoading: boolean;
  error: string;
}

export interface IAuthContext {
  auth: State;
  authDispatch: Dispatch<Actions>;
}

export const initialState: State = {
  loggedIn: false,
  isLoading: true,
  error: "",
};

export const authReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "login":
      return { ...state, loggedIn: true, isLoading: false };
    case "logout":
      localStorage.removeItem("auth");
      return {
        ...state,
        loggedIn: false,
        isLoading: false,
      };
    case "set_error":
      return {
        ...state,
        error: action.error,
      };
    case "clear_error":
      return { ...state, error: "" };
    default:
      return state;
  }
};
