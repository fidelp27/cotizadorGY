import "./App.css";
import React from "react";
import PDFFile from "./components/PDFFile";
import FormCalculate from "./components/form/form";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

const App = () => {
  // const [cost, setCost] = useState("");
  // const [average, setAverage] = useState("");
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return datos;
  }, []);

  // useEffect(() => {
  //   if (datos?.tipo_alquiler === "comercial") {
  //     if (datos?.tipoAjuste === "semestral") {
  //       setTiempo((datos?.años * 12) / 6);
  //     } else if (datos?.tipoAjuste === "trimestral") {
  //       setTiempo((datos?.años * 12) / 3);
  //     } else if (datos?.tipoAjuste === "cuatrimestral") {
  //       setTiempo((datos?.años * 12) / 4);
  //     } else if (datos?.tipoAjuste === "anual") {
  //       setTiempo((datos?.años * 12) / 12);
  //     }
  //   }
  // }, [datos?.años, datos?.tipoAjuste, datos?.tipo_alquiler]);

  // // useEffect(() => {
  // //   if (datos?.tipo_alquiler === "comercial") {
  // //     let arrayAjustes = [];

  // //     for (let i = 0; i < tiempo - 1; i++) {
  // //       arrayAjustes[0] = datos?.alquiler;
  // //       arrayAjustes.push(
  // //         arrayAjustes[i] * (datos?.porcentajeAjuste / 100 + 1)
  // //       );
  // //     }
  // //     setAverage(Math.ceil(arrayAjustes.reduce((a, b) => a + b / tiempo, 0)));
  // //   }
  // // }, [datos?.porcentajeAjuste, datos?.alquiler, tiempo, datos?.tipo_alquiler]);

  // useEffect(() => {
  //   if (datos?.tipo_alquiler === "vivienda") {
  //     setCost((datos?.alquiler + datos?.expensas) * (datos?.años * 12) * 0.06);
  //     localStorage.setItem("cost", cost);
  //   } else if (datos?.tipo_alquiler === "comercial" && datos?.iva === false) {
  //     setCost((average + datos?.expensas) * (datos?.años * 12) * 0.06);
  //     localStorage.setItem("cost", cost);
  //   } else if (datos?.tipo_alquiler === "comercial" && datos?.iva === true) {
  //     setCost((average + datos?.expensas) * (datos?.años * 12) * 0.06 * 1.21);
  //     localStorage.setItem("cost", cost);
  //   }
  // }, [
  //   average,
  //   cost,
  //   datos?.alquiler,
  //   datos?.años,
  //   datos?.expensas,
  //   datos?.iva,
  //   datos?.tipo_alquiler,
  // ]);
  return (
    <div className="App">
      <PDFDownloadLink document={<PDFFile />} fileName="FORM">
        {({ loading }) =>
          loading ? <button>loading</button> : <button>Download</button>
        }
      </PDFDownloadLink>
      <Routes>
        <Route
          path="/"
          element={
            <FormCalculate setDatos={setDatos} setLoading={setLoading} />
          }
        />
        {!loading && <Route path="/template" element={<PDFFile />} />}
      </Routes>
    </div>
  );
};

export default App;
