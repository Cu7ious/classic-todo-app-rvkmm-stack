import { TodoItem } from "~/utils";

export const apiURL = import.meta.env.VITE_API_URL;

export interface ApiDesc extends TodoItem {
  createdAt: Date;
  updatedAt: Date;
}
