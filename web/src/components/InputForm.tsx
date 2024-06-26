import { css } from "@emotion/react";
import { useContext, useState } from "react";
import { capitalize, TodoItem } from "~/utils";
import { saveAllResolved, createItem } from "~/API/todos";
import { AppContext } from "~/appState";

const InputBox = () => {
  const state = useContext(AppContext);
  const [inputValue, setInputValue] = useState("");
  const isEmpty = state.items.length === 0;

  function markAllAsResolved() {
    const ids = state.items.map(itm => itm._id);
    const resolved = !state.items.every(itm => itm.resolved);
    saveAllResolved(ids, resolved).then(() => {
      const items = state.items.map(itm => {
        itm.resolved = resolved;
        return itm;
      });
      state.setState({ ...state, items });
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createItem(capitalize(inputValue)).then(res => {
        const newItems = [...state.items];
        const newItem: TodoItem = { ...res.data, editing: false };
        newItems.push(newItem);
        state.setState({ ...state, items: newItems });
        setInputValue("");
      });
    } else if (e.key === "Escape") {
      setInputValue("");
    }
  };

  return (
    <div css={inputForm}>
      {!isEmpty && (
        <span
          css={control}
          onClick={markAllAsResolved}
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
