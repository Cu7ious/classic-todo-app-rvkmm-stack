import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
// import { createContext, Dispatch, useContext, useEffect, useReducer, useState } from "react";
// import axios from "axios";
// import { apiURL } from "./utils";

export enum THEME {
  WORKDAY_BLUE = "WORKDAY_BLUE",
  ANGULAR_RED = "ANGULAR_RED",
  NODE_GREEN = "NODE_GREEN",
}

interface ThemeColorsData {
  MAIN_COLOR: string;
  MAIN_COLOR_DARK: string;
}

// async function getUserTheme() {
//   let response;
//   try {
//     response = await axios.get(`${apiURL}/theme`);
//     // console.log(response.data);
//   } catch (error) {
//     response = error;
//     if (axios.isAxiosError(error)) {
//       // setError(error.message);
//     } else {
//       // setError("An unexpected error occurred");
//     }
//   } finally {
//     // setLoading(false);
//   }
//   return response;
// }

// async function saveUserTheme(appTheme: THEME) {
//   let response;
//   try {
//     response = await axios.post(`${apiURL}/theme`, { appTheme });
//     console.log(response.data);
//   } catch (error) {
//     response = error;
//     if (axios.isAxiosError(error)) {
//       // setError(error.message);
//     } else {
//       // setError("An unexpected error occurred");
//     }
//   } finally {
//     // setLoading(false);
//   }
//   return response;
// }

interface ThemeColors {
  [propName: string]: ThemeColorsData;
}

export const THEME_COLORS: ThemeColors = {
  WORKDAY_BLUE: { MAIN_COLOR: "#0165c7", MAIN_COLOR_DARK: "#014d98" },
  ANGULAR_RED: { MAIN_COLOR: "#dd0130", MAIN_COLOR_DARK: "#a50023" },
  NODE_GREEN: { MAIN_COLOR: "#026e00", MAIN_COLOR_DARK: "#012d00" },
};

interface AppTheme {
  appTheme: THEME;
}
type ThemeAction = { type: "SWITCH_APP_THEME"; payload: THEME };

type InitialState = { appTheme: THEME };
const initialState: InitialState = { appTheme: THEME.WORKDAY_BLUE };

type ThemeContextType = [AppTheme, Dispatch<ThemeAction>];
export const ThemeContext = createContext<ThemeContextType>([initialState, () => false]);

function reducer(state: AppTheme, action: ThemeAction) {
  switch (action.type) {
    case "SWITCH_APP_THEME":
      return { ...state, appTheme: action.payload };
    default:
      return state;
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const contextValue = useReducer(reducer, initialState);
  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const contextValue = useContext(ThemeContext);
  return contextValue;
};
