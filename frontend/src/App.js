import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LivePage from "./components/LivePage";
import HistoricPage from "./components/HistoricPage";
import TopBar from "./components/TopBar";
import { TbLiveView } from "react-icons/tb";
import { TbHistory } from "react-icons/tb";

export default function App() {
  const links = [
    {
      label: "Live",
      path: "/",
      component: <LivePage />,
      logo: <TbLiveView />,
    },
    {
      label: "Historic",
      path: "/historic",
      component: <HistoricPage />,
      logo: <TbHistory />,
    },
  ];

  return (
    <Router>
      <TopBar links={links} />
      <Routes>
        {links.map((tab, index) => (
          <Route key={index} path={tab.path} element={tab.component} />
        ))}
      </Routes>
    </Router>
  );
}
