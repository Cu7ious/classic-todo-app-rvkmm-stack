import { css } from "@emotion/react";
import { useContext, useState } from "react";
import { apiDesc, apiURL, capitalize, TodoItem } from "~/utils";
import axios from "axios";

import { AppContext } from "~/appState";

const inputForm = css`
  display: inline-block;
  margin-top: 10px;
  width: 100%;
  color: #bbb;
  font: 16px monospace;
  box-shadow: inset 0 -4px 5px 0 rgba(0, 0, 0, 0.08);
  height: 55px;
`;

const control = css`
  position: absolute;
  margin-left: 20px;
  margin-top: 3px;
  font-size: 30px;
  display: inline-block;
  transition: color 0.3s linear;
  cursor: pointer;

  &:hover {
    color: #909090;
  }
`;

const input = css`
  outline: none;
  box-sizing: border-box;
  width: 100%;
  color: #3d4255;
  border: 0;
  height: 40px;
  padding: 0 0 0 62px;
  background: rgba(0, 0, 0, 0);
  font-size: 30px;
  font-weight: 100;
`;

const InputBox = () => {
  const state = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");

  const isEmpty = state.items.length === 0;

  async function createItem(content: string) {
    try {
      const response = await axios.post<apiDesc>(`${apiURL}/todos`, {
        content,
        resolved: false,
      });
      const newItems = state.items;
      const newItem = response.data;
      newItem.editing = false;
      newItems.push(response.data as TodoItem);
      state.setState({ ...state, items: newItems });
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

  async function markAllAsDone() {
    let response;
    try {
      const resolved = !state.items.every(itm => itm.resolved);
      response = await axios.put<apiDesc>(`${apiURL}/todos/update-all`, {
        ids: state.items.filter(itm => itm._id),
        update: { resolved },
      });
      const items = state.items.map(itm => {
        itm.resolved = resolved;
        return itm;
      });
      console.log(items);
      state.setState({ ...state, items });
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createItem(capitalize(inputValue));
      setInputValue("");
    } else if (e.key === "Escape") {
      setInputValue("");
    }
  };

  return (
    <div css={inputForm}>
      {!isEmpty && (
        <span
          css={control}
          onClick={markAllAsDone}
        >
          &#x025BE;
        </span>
      )}
      <input
        value={inputValue}
        autoFocus={true}
        css={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
      />
    </div>
  );
};

export default InputBox;
