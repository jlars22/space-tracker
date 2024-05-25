import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { TbHistory, TbLiveView } from "react-icons/tb";
import HistoricPage from "./components/HistoricPage";
import LivePage from "./components/LivePage";
import TopBar from "./components/TopBar";

export default function App() {
  const links = [
    {
      label: "Live",
      path: "/",
      component: <LivePage />,
      logo: <TbLiveView />,
    },
    {
      label: "History",
      path: "/historiy",
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
