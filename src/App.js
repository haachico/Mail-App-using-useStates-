import { Routes, Route } from "react-router-dom";

import "./styles.css";
import Inbox from "./Pages/Inbox";
import Spam from "./Pages/Spam";
import Trash from "./Pages/Trash";
import Header from "./Components/Header";
import InboxDetail from "./Pages/InboxDetail";
import Home from "./Pages/Home";
import Error from "./Pages/Error";

export default function App() {
  return (
    <div className="App">
      <Header />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/spam" element={<Spam />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/inbox/details/:mailId" element={<InboxDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
