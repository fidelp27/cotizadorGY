import React, { useEffect, useState } from "react";
import { promociones, tipoAlquiler } from "../data";

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

const PDFFile = () => {
  const [cost, setCost] = useState("");
  const [comercialCost, setComercialCost] = useState("");
  const [tiempo, setTiempo] = useState("");

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
    if (tipo_alquiler === "comercial") {
      if (tipoAjuste === "semestral") {
        setTiempo((años * 12) / 6);
      } else if (tipoAjuste === "trimestral") {
        setTiempo((años * 12) / 3);
      } else if (tipoAjuste === "cuatrimestral") {
        setTiempo((años * 12) / 4);
      } else if (tipoAjuste === "anual") {
        setTiempo((años * 12) / 12);
      }
    }
  }, [años, tipoAjuste, tipo_alquiler]);

  useEffect(() => {
    if (tipo_alquiler === "comercial") {
      let arrayAjustes = [];

      for (let i = 0; i < tiempo - 1; i++) {
        arrayAjustes[0] = alquiler;
        arrayAjustes.push(arrayAjustes[i] * (porcentajeAjuste / 100 + 1));
      }
      setAverage(Math.ceil(arrayAjustes.reduce((a, b) => a + b / tiempo, 0)));
    }
  }, [alquiler, average, porcentajeAjuste, tiempo, tipo_alquiler]);

  useEffect(() => {
    if (iva === false) {
      // Puede ir la promesa: que se ejecute el costo luego de la función calculateAverage
      setComercialCost((average + expensas) * (años * 12) * 0.06);
    } else if (iva === true) {
      setComercialCost((average + expensas) * (años * 12) * 0.06 * 1.21);
    }
  }, [average, años, expensas, iva]);

  useEffect(() => {
    if (tipo_alquiler === "vivienda") {
      setCost((alquiler + expensas) * (años * 12) * 0.06);
    }
  }, [tipo_alquiler, alquiler, expensas, años]);

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
        <Text>
          Costo: {tipo_alquiler === "vivienda" ? cost : comercialCost}
        </Text>
        {React.Children.toArray(
          promocion.map((elem) => {
            return (
              <>
                <Text>
                  1 pago {elem.unPago * 100}% off: $
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil(cost * (1 - elem.unPago))
                    : Math.ceil(comercialCost * (1 - elem.unPago))}
                </Text>
                <Text>
                  3 cuotas sin interés + {elem.tresPagos * 100}% off: $
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil(cost * (1 - elem.tresPagos))
                    : Math.ceil(comercialCost * (1 - elem.tresPagos))}
                </Text>
                <Text>
                  3 cuotas de:{" "}
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil((cost * (1 - elem.tresPagos)) / 3)
                    : Math.ceil((comercialCost * (1 - elem.tresPagos)) / 3)}
                </Text>
                <Text>
                  6 cuotas sin interés + {elem.seisPagos * 100}% off: $
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil(cost * (1 - elem.seisPagos))
                    : Math.ceil(comercialCost * (1 - elem.seisPagos))}
                </Text>
                <Text>
                  25% primera cuota:
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil(cost * (1 - elem.seisPagos) * 0.25)
                    : Math.ceil(comercialCost * (1 - elem.seisPagos) * 0.25)}
                </Text>
                <Text>
                  4 cuotas sin interés:
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil((cost * (1 - elem.seisPagos) * 0.75) / 4)
                    : Math.ceil(
                        (comercialCost * (1 - elem.seisPagos) * 0.75) / 4
                      )}
                </Text>
                <Text>
                  5 cuotas sin interés:
                  {tipo_alquiler === "vivienda"
                    ? Math.ceil((cost * (1 - elem.seisPagos) * 0.75) / 5)
                    : Math.ceil(
                        (comercialCost * (1 - elem.seisPagos) * 0.75) / 5
                      )}
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
