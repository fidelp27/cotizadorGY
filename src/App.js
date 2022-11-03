import './App.css';
import React from 'react';
import PDFFile from './components/PDFFile';
import FormCalculate from './components/form/form';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Error404 from './components/error404/error404';
import PDFFileML from './components/PDFFileML';

const App = () => {
  const [datos, setDatos] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<FormCalculate setDatos={setDatos} datos={datos} />}
        />
        <Route path="/template" element={<PDFFile />} />
        <Route path="/templateML" element={<PDFFileML />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
