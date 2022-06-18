import "./App.css";
import React from "react";
import PDFFile from "./components/PDFFile";
import FormCalculate from "./components/form/form";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <FormCalculate
              setDatos={setDatos}
              datos={datos}
              setLoading={setLoading}
            />
          }
        />
        {!loading && <Route path="/template" element={<PDFFile />} />}
      </Routes>
    </div>
  );
};

export default App;
