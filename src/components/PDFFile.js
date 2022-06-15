import React, { useEffect, useState } from "react";
import { promociones } from "../data";

import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const PDFFile = ({ tiempo, setLoading }) => {
  const [cost, setCost] = useState("");
  const [average, setAverage] = useState("");

  const datos = localStorage.getItem("datos")
    ? JSON.parse(localStorage.getItem("datos"))
    : "";

  const {
    alquiler,
    expensas,
    años,
    tipo_alquiler,
    tipoAjuste,
    porcentajeAjuste,
    promo,
    // asesor,
    iva,
  } = datos;

  const promocion = promociones.filter((elem) => elem.nombre === promo);

  // useEffect(() => {

  // }, [porcentajeAjuste, alquiler, tiempo, tipo_alquiler, setAverage]);

  useEffect(() => {
    const calculateAverage = () => {
      if (tipo_alquiler === "comercial") {
        let arrayAjustes = [];

        for (let i = 0; i < tiempo - 1; i++) {
          arrayAjustes[0] = alquiler;
          arrayAjustes.push(arrayAjustes[i] * (porcentajeAjuste / 100 + 1));
        }
        setAverage(Math.ceil(arrayAjustes.reduce((a, b) => a + b / tiempo, 0)));
      }
    };
    calculateAverage();

    if (tipo_alquiler === "vivienda") {
      setCost((alquiler + expensas) * (años * 12) * 0.06);
    } else if (tipo_alquiler === "comercial" && iva === false) {
      // Puede ir la promesa: que se ejecute el costo luego de la función calculateAverage
      setCost((average + expensas) * (años * 12) * 0.06);
    } else if (tipo_alquiler === "comercial" && iva === true) {
      setCost((average + expensas) * (años * 12) * 0.06 * 1.21);
    }
  }, [
    alquiler,
    average,
    años,
    cost,
    porcentajeAjuste,
    tipo_alquiler,
    expensas,
    iva,
    setAverage,
    tiempo,
  ]);
  console.log(average);
  console.log(cost);
  return (
    <Document>
      <Page style={styles.body} size="A4">
        <Text>Cotización</Text>
        <Text>Alquiler: {alquiler}</Text>
        <Text>Expensas: {expensas}</Text>
        <Text>Tiempo: {años} años</Text>
        {tipo_alquiler === "comercial" && (
          <>
            <Text>Ajuste: {porcentajeAjuste}%</Text>
            <Text>Tipo de ajuste: {tipoAjuste}</Text>
          </>
        )}
        {iva === true && <Text>IVA: 21% </Text>}

        <Text>Opciones de pago</Text>
        <Text>Costo: {cost}</Text>
        {React.Children.toArray(
          promocion.map((elem) => {
            return (
              <>
                <Text>
                  1 pago {elem.unPago * 100}% off: $
                  {Math.ceil(cost * (1 - elem.unPago))}
                </Text>
                <Text>
                  3 cuotas sin interés + {elem.tresPagos * 100}% off: $
                  {Math.ceil(cost * (1 - elem.tresPagos))}
                </Text>
                <Text>
                  3 cuotas de: {Math.ceil(cost * (1 - elem.tresPagos)) / 3}
                </Text>
                <Text>
                  6 cuotas sin interés + {elem.seisPagos * 100}% off: $
                  {Math.ceil(cost * (1 - elem.seisPagos))}
                </Text>
                <Text>
                  25% primera cuota:
                  {Math.ceil(cost * (1 - elem.seisPagos) * 0.25)}
                </Text>
                <Text>
                  4 cuotas sin interés:
                  {Math.ceil((cost * (1 - elem.seisPagos) * 0.75) / 4)}
                </Text>
                <Text>
                  5 cuotas sin interés:
                  {Math.ceil((cost * (1 - elem.seisPagos) * 0.75) / 5)}
                </Text>
              </>
            );
          })
        )}
      </Page>
    </Document>
  );
};

export default PDFFile;
