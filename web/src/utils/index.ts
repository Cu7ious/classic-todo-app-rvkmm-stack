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

  // Type guard for keyboard events
  export const isKeyboardEvent = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ): event is React.KeyboardEvent<HTMLInputElement> => {
    return (event as React.KeyboardEvent<HTMLInputElement>).key !== undefined;
  };