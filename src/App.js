import Login from "./components/pages/Login";
import Notify from "./components/pages/Notify";
import NotifyList from "./components/pages/NotifyList";
import NofityList from "./components/pages/NotifyList";
import Onboard from "./components/pages/Onboard";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/notify_list" element={<NotifyList />} />
      <Route path="/notify/:id" element={<Notify />} />
    </Routes>
  );
}

export default App;
