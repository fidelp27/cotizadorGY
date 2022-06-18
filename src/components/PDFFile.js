import React, { useEffect, useState } from "react";
import { asesores, promociones } from "../data";
import { useNavigate } from "react-router-dom";

import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  pdfViewer: {
    height: "100vh",
    width: "100%",
  },
  container: {
    height: "100vh",
    width: "100%",
  },

  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 45,
    display: "flex",
    flexDirection: "column",
    border: 2,
    borderBottomColor: "red",
    borderLeftColor: "red",
    borderRightColor: "blue",
    borderTopColor: "blue",
  },
  image: {
    width: 90,
    height: 50,
  },
  containerDate: {
    display: "flex",
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    marginRight: 10,
    textAlign: "right",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 15,
  },

  montos: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 15,
    lineHeight: 1.3,
  },

  text: {
    fontSize: 12,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: 700,
  },
  opciones: {
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 15,
  },
  costo: {
    fontSize: 15,
    textAlign: "justify",
    fontWeight: 700,
    marginBottom: 15,
  },

  boxPrice: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
  },
  pagos: {
    width: 280,
    fontSize: 12,
  },
  cuotas: {
    fontSize: 10,
    marginTop: 10,
    marginLeft: 15,
    lineHeight: 1.1,
  },
  ahorroContainer: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 25,
    marginLeft: 12,
    transform: "rotate(-2)",
  },
  ahorroImage: {
    width: 22,
    height: 22,
    textAlign: "center",
  },
  ahorroAmount: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    marginLeft: 10,
    color: "red",
  },
  nota: {
    fontSize: 8,
    lineHeight: 1.5,
    marginTop: 10,
  },
  asesor: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
    lineHeight: 1.5,
  },
});

const PDFFile = () => {
  const [cost, setCost] = useState("");
  const [comercialCost, setComercialCost] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [average, setAverage] = useState("");
  const navigate = useNavigate();

  const volver = () => {
    return navigate("/");
  };

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
    asesor,
    iva,
    uno,
    tres,
    seis,
  } = datos;

  const promocion = promociones.filter((elem) => elem.nombre === promo);
  const asesor_res = asesores.filter((elem) => elem.nombre === asesor);
  const hora = new Date().toLocaleDateString();

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
    if (iva === false && promo === "Garantía Especial") {
      setComercialCost(
        Math.ceil((average + expensas) * (años * 12) * 0.06) + alquiler
      );
    } else if (iva === true && promo === "Garantía Especial") {
      setComercialCost(
        Math.ceil((average + expensas) * (años * 12) * 0.06 * 1.21 + alquiler)
      );
    } else if (iva === true && años === 1) {
      setComercialCost(Math.ceil((average + expensas) * 1.3 * 1.21));
    } else if (iva === false && años === 1) {
      setComercialCost(Math.ceil((average + expensas) * 1.3));
    } else if (iva === false) {
      setComercialCost(Math.ceil((average + expensas) * (años * 12) * 0.06));
    } else if (iva === true) {
      setComercialCost(
        Math.ceil((average + expensas) * (años * 12) * 0.06 * 1.21)
      );
    }
  }, [alquiler, average, años, expensas, iva, promo]);

  useEffect(() => {
    if (tipo_alquiler === "vivienda" && promo === "Garantía Especial") {
      setCost(Math.ceil((alquiler + expensas) * (años * 12) * 0.06) + alquiler);
    } else if (tipo_alquiler === "vivienda" && años === 1) {
      setCost(Math.ceil((alquiler + expensas) * 1.3));
    } else if (tipo_alquiler === "vivienda") {
      setCost(Math.ceil((alquiler + expensas) * (años * 12) * 0.06));
    }
  }, [tipo_alquiler, alquiler, expensas, años, promo]);

  return (
    <>
      <button
        onClick={() => volver()}
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 0, 0, 0.278)",
          border: "none",
          borderRadius: "5px",
          padding: "10px",
          letterSpacing: "2px",
          cursor: "pointer",
          color: "white",
        }}
      >
        Nueva cotización
      </button>
      <PDFViewer style={styles.pdfViewer}>
        <Document title="Cotización de garantía">
          <Page style={styles.body} size="A4">
            <View>
              <Image
                src="https://i.imgur.com/Z0w4GsW.png"
                style={styles.image}
              />
            </View>
            <View style={styles.containerDate}>
              <Text style={styles.date}>{hora} </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Cotización</Text>
            </View>
            <View style={styles.montos}>
              <Text style={styles.text}>
                Alquiler: ${alquiler.toLocaleString("es-AR")}
              </Text>
              <Text style={styles.text}>
                Expensas: ${expensas.toLocaleString("es-AR")}
              </Text>
              <Text style={styles.text}>
                Tiempo: {años > 1 ? años + " años" : años + " año"}
              </Text>

              {tipo_alquiler === "comercial" && (
                <>
                  <Text style={styles.text}>Ajuste: {porcentajeAjuste}%</Text>
                  <Text style={styles.text}>Tipo de ajuste: {tipoAjuste}</Text>
                </>
              )}
              {iva === true && <Text style={styles.text}>IVA: 21% </Text>}
            </View>

            <Text style={styles.costo}>
              Costo: $
              {tipo_alquiler === "vivienda"
                ? cost.toLocaleString("es-AR")
                : comercialCost.toLocaleString("es-AR")}
            </Text>

            <Text style={styles.opciones}>Opciones de pago</Text>
            {React.Children.toArray(
              promocion.map((elem) => {
                return (
                  <>
                    {/* 1 pago */}
                    {uno && (
                      <View style={styles.boxPrice}>
                        <Text style={styles.pagos}>
                          1 pago {elem.unPago * 100}% off: $
                          {tipo_alquiler === "vivienda"
                            ? Math.ceil(
                                cost * (1 - elem.unPago)
                              ).toLocaleString("es-AR")
                            : Math.ceil(
                                comercialCost * (1 - elem.unPago)
                              ).toLocaleString("es-AR")}
                        </Text>
                        {/* 1 pago Ahorro */}
                        <View style={styles.ahorroContainer}>
                          <Image
                            src="https://i.imgur.com/TCcXrha.png"
                            style={styles.ahorroImage}
                          />
                          <Text style={styles.ahorroAmount}>
                            {" "}
                            $
                            {tipo_alquiler === "vivienda"
                              ? (
                                  cost - Math.ceil(cost * (1 - elem.unPago))
                                ).toLocaleString("es-AR")
                              : (
                                  cost -
                                  Math.ceil(
                                    comercialCost -
                                      comercialCost * (1 - elem.unPago)
                                  )
                                ).toLocaleString("es-AR")}
                          </Text>
                        </View>
                      </View>
                    )}
                    {/* 3 pagos */}
                    {tres && (
                      <View style={styles.boxPrice}>
                        <View>
                          <Text style={styles.pagos}>
                            3 cuotas sin interés + {elem.tresPagos * 100}% off:
                            $
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  cost * (1 - elem.tresPagos)
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  comercialCost * (1 - elem.tresPagos)
                                ).toLocaleString("es-AR")}
                          </Text>
                          <Text style={styles.cuotas}>
                            3 cuotas de:$
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  (cost * (1 - elem.tresPagos)) / 3
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  (comercialCost * (1 - elem.tresPagos)) / 3
                                ).toLocaleString("es-AR")}
                          </Text>
                        </View>
                        {/* 3 pagos ahorro*/}
                        <View style={styles.ahorroContainer}>
                          {elem.tresPagos > 0 && (
                            <>
                              <Image
                                src="https://i.imgur.com/TCcXrha.png"
                                style={styles.ahorroImage}
                              />

                              <Text style={styles.ahorroAmount}>
                                $
                                {tipo_alquiler === "vivienda"
                                  ? (
                                      cost -
                                      Math.ceil(cost * (1 - elem.tresPagos))
                                    ).toLocaleString("es-AR")
                                  : (
                                      cost -
                                      Math.ceil(
                                        comercialCost -
                                          comercialCost * (1 - elem.tresPagos)
                                      )
                                    ).toLocaleString("es-AR")}
                              </Text>
                            </>
                          )}
                        </View>
                      </View>
                    )}
                    {/* 6 cuotas */}
                    {seis && (
                      <View style={styles.boxPrice}>
                        <View>
                          <Text style={styles.pagos}>
                            6 cuotas sin interés + {elem.seisPagos * 100}% off:
                            $
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  cost * (1 - elem.seisPagos)
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  comercialCost * (1 - elem.seisPagos)
                                ).toLocaleString("es-AR")}
                          </Text>
                          <Text style={styles.cuotas}>
                            25% primera cuota: $
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  cost * (1 - elem.seisPagos) * 0.25
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  comercialCost * (1 - elem.seisPagos) * 0.25
                                ).toLocaleString("es-AR")}
                          </Text>
                          <Text style={styles.cuotas}>
                            4 cuotas sin interés: $
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  (cost * (1 - elem.seisPagos) * 0.75) / 4
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  (comercialCost *
                                    (1 - elem.seisPagos) *
                                    0.75) /
                                    4
                                ).toLocaleString("es-AR")}
                          </Text>
                          <Text style={styles.cuotas}>
                            5 cuotas sin interés: $
                            {tipo_alquiler === "vivienda"
                              ? Math.ceil(
                                  (cost * (1 - elem.seisPagos) * 0.75) / 5
                                ).toLocaleString("es-AR")
                              : Math.ceil(
                                  (comercialCost *
                                    (1 - elem.seisPagos) *
                                    0.75) /
                                    5
                                ).toLocaleString("es-AR")}
                          </Text>
                        </View>
                        {/* 6 cuotas ahorro*/}
                        <View style={styles.ahorroContainer}>
                          {elem.seisPagos > 0 && (
                            <>
                              <Image
                                src="https://i.imgur.com/TCcXrha.png"
                                style={styles.ahorroImage}
                              />

                              <Text style={styles.ahorroAmount}>
                                $
                                {tipo_alquiler === "vivienda"
                                  ? (
                                      cost -
                                      Math.ceil(cost * (1 - elem.seisPagos))
                                    ).toLocaleString("es-AR")
                                  : (
                                      cost -
                                      Math.ceil(
                                        comercialCost -
                                          comercialCost * (1 - elem.seisPagos)
                                      )
                                    ).toLocaleString("es-AR")}
                              </Text>
                            </>
                          )}
                        </View>
                      </View>
                    )}
                    <View>
                      <Text style={styles.nota}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.{" "}
                      </Text>
                    </View>
                    <View>
                      {React.Children.toArray(
                        asesor_res.map((elem) => {
                          return (
                            <>
                              <View style={styles.asesor}>
                                <Text>{elem.nombre} </Text>
                                <Text>{elem.cargo} </Text>
                                <Text>{elem.email} </Text>
                                <Text>+54 9 1130350918 </Text>
                              </View>
                            </>
                          );
                        })
                      )}
                    </View>
                  </>
                );
              })
            )}
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};

export default PDFFile;
