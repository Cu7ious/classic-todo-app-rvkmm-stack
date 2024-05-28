import { css } from "@emotion/react";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "~/appState";
import { ThemeProvider } from "~/themeProvider";
import { TodoState } from "~/utils";

import AppControls from "./components/Controls";
import InputForm from "./components/InputForm";
import Header from "./components/Layout/Header";
import Panel from "./components/Layout/Panel";
import Sidebar from "./components/Layout/Sidebar";
import ThemeSwitcher from "./components/Layout/ThemeSwitcher";
import TodoItems from "./components/TodoItems";

export default function App() {
  const [state, setState] = useState<TodoState>(useContext<TodoState>(AppContext));
  const [activePanel, setActivePanel] = useState(false);

  function setActivePanelEffect(value: boolean) {
    document.body.classList.toggle("global-sidebar-is-active");
    setActivePanel(value);
  }

  // Global Sidebar
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.type === "keyup" && e.code === "Escape") {
        setActivePanelEffect(false);
      }
    }
    window.addEventListener("keyup", callback);
    return () => {
      window.removeEventListener("keyup", callback);
    };
  });

  return (
    <ThemeProvider>
      <Header setActivePanel={setActivePanelEffect} />
      <Sidebar
        activePanel={activePanel}
        setActivePanel={setActivePanelEffect}
      />
      <Panel />
      <ThemeSwitcher />
      <div css={todoApp}>
        <div css={appWrapper}>
          <AppContext.Provider value={{ ...state, setState }}>
            <InputForm />
            <TodoItems />
            <AppControls />
          </AppContext.Provider>
        </div>
      </div>
    </ThemeProvider>
  );
}

const todoApp = css`
  padding: 55px 0 0;
  display: block;
  text-align: center;

  @media screen and (max-width: 850px) {
    display: block;
    padding: 8px 5px;
  }

  @media screen and (max-width: 650px) {
    display: block;
    padding: 8px 5px;

    ul li {
      font-size: 20px !important;
    }
  }
`;

const appWrapper = css`
  display: inline-block;
  text-align: initial;
  min-width: 40vw;
  max-width: 60vw;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 850px) {
    min-width: 70vw;
  }

  @media screen and (max-width: 650px) {
    min-width: 96.5vw;
  }

  @media screen and (max-width: 400px) {
    min-width: 390px;
    width: 390px;
  }
`;
