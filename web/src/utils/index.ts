export const apiURL = import.meta.env.VITE_API_URL;

export enum Filter {
  ALL = "all",
  REMAINED = "remained",
  COMPLETED = "completed",
}

export interface TodoState {
  allDone: boolean;
  filter: Filter;
  items: TodoItem[];
  setState: (props: any) => void;
}

export interface TodoItem {
  _id: string;
  content: string;
  resolved: boolean;
  editing?: boolean;
}

export interface apiDesc extends TodoItem {
  createdAt: Date;
  updatedAt: Date;
}

export function capitalize (text: string): string {
  return text.trim()
    .replace(
      text.charAt(0),
      text.charAt(0).toUpperCase()
    );
}

export function filterItems(items: TodoItem[], filter: string): TodoItem[] {
  switch (filter) {
    case Filter.REMAINED:
      return items.filter(item => item.resolved === false)
    case Filter.COMPLETED:
      return items.filter(item => item.resolved === true)
    default:
      return items;
  }
}
