import { createContext } from "react";
import { Filter, TodoState } from "~/utils";

export const defaultState: TodoState = {
  filter: Filter.ALL,
  allDone: false,
  items: [],
  setState: () => {},
};

export const AppContext = createContext<TodoState>({
  ...defaultState
});