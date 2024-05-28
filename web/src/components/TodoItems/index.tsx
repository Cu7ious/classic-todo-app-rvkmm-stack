import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AppContext } from "~/appState";
import { apiDesc, apiURL } from "~/utils";
import { filterItems } from "~/utils";
import TodoItemBox from "./TodoItem";

const list = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const preDataState = css`
  padding: 22px 0;
  text-align: center;
`;

export default function TodoItems() {
  const state = useContext(AppContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<apiDesc[]>(`${apiURL}/todos`);
        // console.log(response.data);
        state.setState && state.setState({ ...state, items: response.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function updateContent(id: string, content: string) {
    try {
      const response = await axios.put<apiDesc>(`${apiURL}/todos/${id}`, { content });
      const updatedIdx = state.items.findIndex(itm => itm._id === id);
      const updatedItems = state.items;
      updatedItems[updatedIdx] = { ...response.data, editing: false };
      state.setState({ ...state, items: updatedItems });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error);
        // setError(error.message);
      } else {
        console.log("Unexpected Error:", error);
        // setError("An unexpected error occurred");
      }
    } finally {
      // ??? pushNotification("Item was saved")
    }
  }

  async function updateResolved(id: string, resolved: boolean) {
    try {
      const response = await axios.put<apiDesc>(`${apiURL}/todos/${id}`, { resolved });
      const updatedIdx = state.items.findIndex(itm => itm._id === id);
      const updatedItems = state.items;
      updatedItems[updatedIdx] = { ...response.data, editing: false };
      state.setState({ ...state, items: updatedItems });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error);
        // setError(error.message);
      } else {
        console.log("Unexpected Error:", error);
        // setError("An unexpected error occurred");
      }
    } finally {
      // ??? pushNotification("Item was saved")
    }
  }

  async function deleteItem(id: string) {
    let response;
    try {
      response = await axios.delete<apiDesc>(`${apiURL}/todos/${id}`);
    } catch (error) {
      response = error;
      if (axios.isAxiosError(error)) {
        console.log("Axios Error:", error);
        // setError(error.message);
      } else {
        console.log("Unexpected Error:", error);
        // setError("An unexpected error occurred");
      }
    } finally {
      // ??? pushNotification("Item was saved")
    }
    return response;
  }

  function editItem(id: string, e: any) {
    const items = state.items;
    const itemIdx = state.items.findIndex(item => item._id === id);
    items[itemIdx].content = e.target.value;
    state.setState && state.setState({ ...state, items });
  }

  // Explicitly defining the type guard for keyboard events
  const isKeyboardEvent = (
    event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>
  ): event is React.KeyboardEvent<HTMLInputElement> => {
    return (event as React.KeyboardEvent<HTMLInputElement>).key !== undefined;
  };

  function saveEditedItem(
    id: string,
    e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) {
    const items = state.items;
    const index = state.items.findIndex(item => item._id === id);

    if (isKeyboardEvent(e)) {
      if (e.code === "Escape") return;
      if (e.code === "Enter") {
        items[index].editing = false;
        updateContent(id, items[index].content);
      }
    } else {
      items[index].editing = false;
      updateContent(id, items[index].content);
    }
  }

  function removeItem(id: string) {
    deleteItem(id).then(res => {
      if ((res as any)?.status === 204) {
        const items = state.items;
        const index = state.items.findIndex(item => item._id === id);
        items.splice(index, 1);
        state.setState && state.setState({ ...state, items });
      }
    });
  }

  function setItemIsEditable(id: string) {
    const index = state.items.findIndex(item => item._id === id);
    state.items[index].editing = true;
    state.setState && state.setState({ ...state, items: state.items });
  }

  function toggleMarkAsDone(_id: string) {
    const toggledResolve = !state.items.filter(item => item._id === _id)[0].resolved;
    updateResolved(_id, toggledResolve);
  }

  if (loading) return <div css={preDataState}>Loading...</div>;
  // debugger;
  if (error) return <div css={preDataState}>Error: {error}</div>;

  return state.items.length > 0 ? (
    <ul css={list}>
      {filterItems(state.items, state.filter).map(item => (
        <TodoItemBox
          item={item}
          _id={item._id}
          key={item._id}
          actions={{
            editItem,
            saveEditedItem,
            setItemIsEditable,
            toggleMarkAsDone,
            removeItem,
          }}
        />
      ))}
    </ul>
  ) : null;
}
