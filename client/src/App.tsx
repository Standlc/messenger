import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatApp from "./ChatApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/:conversationId" element={<ChatApp />} />
      </Routes>
    </Router>
  );
};

export default App;
