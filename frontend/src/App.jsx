import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTemplate from "./pages/CreateTemplate";
import DeleteTemplate from "./pages/DeleteTemplate";
import EditTemplate from "./pages/EditTemplate";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/webnovel/create" element={<CreateTemplate />} />
      <Route path="/webnovel/edit/:id" element={<EditTemplate />} />
      <Route path="/webnovel/delete/:id" element={<DeleteTemplate />} />
    </Routes>
  );
};

export default App;
