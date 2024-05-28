import { css } from "@emotion/react";
import React, { useContext } from "react";
import axios from "axios";

import { AppContext } from "~/appState";
import { apiDesc, apiURL, Filter, filterItems } from "~/utils";
import Filters from "./Filters";

const controlsCSS = css`
  padding: 20px;
  display: grid;
  line-height: 55px;
  text-align: center;
  grid-template-columns: 30% 40% 30%;
`;

const clearButton = css`
  background: none;
  outline: none;
  cursor: pointer;
  border: none;
  color: #bbb;
  font-size: 14px;
  text-align: right;
  padding: 0;
  transition: color 0.3s linear;

  &:hover {
    color: #3d4255;
    text-decoration: underline;
  }

  @media screen and (max-width: 500px) {
    font-size: 11px;
  }
`;

const remained = css`
  font-size: 14px;
  color: #bbb;
  text-align: left;

  @media screen and (max-width: 500px) {
    font-size: 11px;
  }
`;

async function clearCompletedItems(ids: string[]) {
  let response;
  try {
    response = await axios.put<apiDesc>(`${apiURL}/todos/delete-all`, { ids });
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
  return response;
}

export default function AppControls() {
  const state = useContext(AppContext);

  function clearAllCompleted() {
    const ids = state.items.filter(itm => itm.resolved).map(itm => itm._id);
    ids.length > 0 &&
      clearCompletedItems(ids).then(res => {
        if ((res as any)?.status === 200) {
          const items = state.items.filter(item => item.resolved !== true);
          state.setState({ ...state, items });
        }
      });
  }

  function renderRemained(items: any): React.ReactNode {
    const remainedItems = filterItems(items, Filter.REMAINED);
    return (
      <span css={remained}>
        {remainedItems.length} {remainedItems.length === 1 ? "item" : "items"} left
      </span>
    );
  }

  return state.items.length > 0 ? (
    <div css={controlsCSS}>
      {renderRemained(state.items)}
      <Filters />
      <button
        css={clearButton}
        onClick={clearAllCompleted}
      >
        Clear completed
      </button>
    </div>
  ) : null;
}
