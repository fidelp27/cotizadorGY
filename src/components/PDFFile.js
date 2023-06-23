import React, { useEffect, useState } from 'react';
import { asesores, promociones } from '../data';
import { useNavigate } from 'react-router-dom';

import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Link,
  Font,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';

Font.register({
  family: 'Raleway',
  fonts: [
    {
      src: 'http://fonts.gstatic.com/s/raleway/v27/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaooCPNLA3JC9c.ttf',
    },
    {
      src: 'http://fonts.gstatic.com/s/raleway/v27/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVs9pYCPNLA3JC9c.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'http://fonts.gstatic.com/s/raleway/v27/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4TbMPrQVIT9c2c8.ttf',
      fontWeight: 'light',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  pdfViewer: {
    height: '90vh',
    width: '90%',
    position: 'absolute',
    left: '4%',
    top: '7%',
  },
  container: {
    height: '100vh',
    width: '100%',
  },

  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 46,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Raleway',
  },
  containerimage: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 50,
  },
  containerDate: {
    display: 'flex',
  },
  date: {
    fontSize: 12,
    marginRight: 10,
  },
  titleContainer: {
    display: 'flex',
    marginTop: 30,
  },
  title: {
    fontSize: 15,
    marginBottom: 15,
    fontWeight: 1000,
    color: 'rgb(30,53,121)',
  },

  montos: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  text: {
    fontSize: 10,
    marginRight: 40,
    lineHeight: 2.3,
    color: 'rgb(70,70,70)',

    fontWeight: 500,
  },

  costo: {
    fontSize: 11,
    marginBottom: 15,
    fontWeight: 500,
    color: '#fff',
    letterSpacing: '1px',
  },
  price: {
    fontSize: 14,
    fontWeight: 1000,
    marginLeft: 2,
    marginBottom: 20,
    color: '#fff',
  },
  opciones: {
    fontSize: 12,
    fontWeight: 1000,
    marginBottom: 5,
    color: 'rgb(30,53,121)',
  },
  opcionesTDC: {
    fontSize: 8,
    fontWeight: 1000,
    marginBottom: 15,
    color: 'rgb(212,15,20)',
  },

  boxPrice: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  costocontainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '5px',
    marginBottom: '12',
  },
  costo_gy: {
    fontSize: 10,
  },
  price_gy: {
    fontSize: 10,
    marginLeft: 5,
  },
  pagos: {
    width: 400,
    fontSize: 12,
    borderBottom: '1px solid #bebebe',
  },
  percentage: {
    fontSize: 12,
    marginBottom: 1,
    fontWeight: 800,
    color: 'rgb(70,70,70)',
  },
  cuotaText: {
    fontSize: 9,
    fontWeight: 700,
    color: 'rgb(70,70,70)',
  },

  cuotaTextMP: {
    fontSize: 11,
    marginBottom: 5,
    fontWeight: 700,
    color: 'rgb(70,70,70)',
  },
  containerAmount: {
    display: 'flex',
    position: 'absolute',
    top: 23,
    right: 85,
    alignItems: 'bottom',
    fontWeight: 1000,
  },
  containerAmountThree: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    right: 85,
    alignItems: 'bottom',
    fontWeight: 1000,
  },
  containerAmountSix: {
    display: 'flex',
    position: 'absolute',
    top: 10,
    bottom: 10,
    right: 85,
    alignItems: 'bottom',
    fontWeight: 1000,
  },
  amount: {
    fontSize: 12,
    fontWeight: 1000,
    color: 'rgb(40,40,40)',
  },
  amountquarter: {
    fontSize: 13,
    fontWeight: 1000,
    color: 'rgb(40,40,40)',
    marginTop: 0,
  },
  amountSix: {
    fontSize: 14,
    fontWeight: 1000,
    marginLeft: 85,
    color: 'rgb(40,40,40)',
  },
  cuotasText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'rgb(70,70,70)',
    marginTop: 10,
  },
  cuotasTextThree: {
    display: 'flex',
    flexDirection: 'row',
    color: 'rgb(70,70,70)',
  },
  cuotasTextMP: {
    display: 'flex',
    flexDirection: 'row',
  },
  cincoCuotas: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 10,
    position: 'absolute',
    top: 30,
    right: 85,
    fontWeight: 500,
  },
  containerNota: {
    marginTop: 30,
    marginBottom: 20,
  },
  seisText: {
    fontSize: 10,
    fontWeight: 500,
    color: 'rgb(70,70,70)',
    marginLeft: 5,
  },
  nota: {
    fontSize: 16,
    fontWeight: 1000,
    color: 'rgb(30,53,121)',
  },
  containerNotaChange: {
    width: '50%',
    marginTop: 20,
    lineHeight: 1.4,
    position: 'absolute',
    bottom: 90,
    left: 45,
  },
  notaChange: {
    fontSize: 7,
    fontWeight: 500,
  },
  asesor: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 9,
    lineHeight: 1.2,
    marginTop: 10,
    fontWeight: 500,
    color: 'rgb(70,70,70)',
  },
  name: {
    fontSize: 10,
    fontWeight: 600,
    color: 'black',
  },
  infoGeneral: {
    width: '40%',
    position: 'absolute',
    marginLeft: 45,
    bottom: 35,
    lineHeight: 1.4,
    fontWeight: 500,
    color: 'rgb(70,70,70)',
  },
  phone: {
    fontSize: 10,
    fontWeight: 1000,
    color: 'rgb(212,15,20)',
  },
  address: {
    fontSize: 9,
  },
  uri: {
    fontSize: 9,
    fontWeight: 1000,
    textDecoration: 'none',
    color: 'rgb(40,40,40)',
  },
  imagesRRSS: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rrss: {
    width: 15,
    height: 15,
    color: 'black',
    marginRight: 1,
  },
  rrssYT: {
    width: 15,
    height: 15,
    marginLeft: 3,
  },
  containerFinalImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '65%',
  },
  mercadopago: {
    marginTop: 30,
  },
});

const PDFFile = () => {
  const [cost, setCost] = useState('');
  const [comercialCost, setComercialCost] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [average, setAverage] = useState('');
  const navigate = useNavigate();

  const volver = () => {
    return navigate('/');
  };

  const datos = localStorage.getItem('datos')
    ? JSON.parse(localStorage.getItem('datos'))
    : '';

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
    if (tipo_alquiler === 'comercial') {
      if (tipoAjuste === 'semestral') {
        setTiempo((años * 12) / 6);
      } else if (tipoAjuste === 'trimestral') {
        setTiempo((años * 12) / 3);
      } else if (tipoAjuste === 'cuatrimestral') {
        setTiempo((años * 12) / 4);
      } else if (tipoAjuste === 'anual') {
        setTiempo((años * 12) / 12);
      }
    }
  }, [años, tipoAjuste, tipo_alquiler]);

  useEffect(() => {
    if (tipo_alquiler === 'comercial' && iva === false) {
      let arrayAjustes = [];

      for (let i = 0; i < tiempo - 1; i++) {
        arrayAjustes[0] = alquiler;
        arrayAjustes.push(arrayAjustes[i] * (porcentajeAjuste / 100 + 1));
      }
      console.log(arrayAjustes);
      setAverage(Math.ceil(arrayAjustes.reduce((a, b) => a + b / tiempo, 0)));
    } else if (tipo_alquiler === 'comercial' && iva === true) {
      let arrayAjustes = [];
      let arrayAjustado = [];
      for (let i = 0; i < tiempo - 1; i++) {
        arrayAjustes[0] = alquiler;
        arrayAjustes.push(arrayAjustes[i] * (porcentajeAjuste / 100 + 1));
      }
      console.log(arrayAjustes);
      for (let j = 0; j < tiempo; j++) {
        arrayAjustado.push(arrayAjustes[j] * 1.21);
      }
      setAverage(Math.ceil(arrayAjustado.reduce((a, b) => a + b / tiempo, 0)));
    }
  }, [alquiler, average, iva, porcentajeAjuste, tiempo, tipo_alquiler]);

  useEffect(() => {
    if (
      tipo_alquiler === 'comercial' &&
      iva === false &&
      años > 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Mercado Libre Especial')
    ) {
      setComercialCost(
        Math.ceil((average + expensas) * (años * 12) * 0.06 + alquiler)
      );
    } else if (
      tipo_alquiler === 'comercial' &&
      iva === true &&
      años > 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Mercado Libre Especial')
    ) {
      setComercialCost(
        Math.ceil((average + expensas) * (años * 12) * 0.06 + alquiler)
      );
    } else if (
      tipo_alquiler === 'comercial' &&
      iva === true &&
      años === 1 &&
      promo !== 'Garantía Especial' &&
      promo !== 'Garantía Especial Estudiantes' &&
      promo !== 'Mercado Libre Especial'
    ) {
      setComercialCost(Math.ceil((average + expensas) * 1.3));
    } else if (
      tipo_alquiler === 'comercial' &&
      iva === true &&
      años === 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Mercado Libre Especial')
    ) {
      setComercialCost(Math.ceil((average + expensas) * 1.3) + alquiler);
    } else if (
      tipo_alquiler === 'comercial' &&
      iva === false &&
      años === 1 &&
      promo !== 'Garantía Especial' &&
      promo !== 'Garantía Especial Estudiantes' &&
      promo !== 'Mercado Libre Especial'
    ) {
      setComercialCost(Math.ceil((average + expensas) * 1.3));
    } else if (
      tipo_alquiler === 'comercial' &&
      iva === false &&
      años === 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Mercado Libre Especial')
    ) {
      setComercialCost(Math.ceil(average + expensas + alquiler * 1.3));
    } else if (tipo_alquiler === 'comercial' && iva === false) {
      setComercialCost(Math.ceil((average + expensas) * (años * 12) * 0.06));
    } else if (tipo_alquiler === 'comercial' && iva === true) {
      setComercialCost(Math.ceil((average + expensas) * (años * 12) * 0.06));
    }
  }, [alquiler, average, años, expensas, iva, promo, tipo_alquiler]);

  useEffect(() => {
    if (
      tipo_alquiler === 'vivienda' &&
      años === 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Globant' ||
        promo === 'Mercado Libre Especial')
    ) {
      setCost(Math.ceil((alquiler + expensas) * 1.3) + alquiler);
    } else if (
      tipo_alquiler === 'vivienda' &&
      años > 1 &&
      (promo === 'Garantía Especial' ||
        promo === 'Garantía Especial Estudiantes' ||
        promo === 'Mercado Libre Especial' ||
        promo === 'Globant')
    ) {
      setCost(Math.ceil((alquiler + expensas) * (años * 12) * 0.06) + alquiler);
    } else if (
      tipo_alquiler === 'vivienda' &&
      años === 1 &&
      (promo !== 'Garantía Especial' ||
        promo !== 'Garantía Especial Estudiantes' ||
        promo !== 'Mercado Libre Especial' ||
        promo !== 'Globant')
    ) {
      setCost(Math.ceil((alquiler + expensas) * 1.3));
    } else if (tipo_alquiler === 'vivienda') {
      setCost(Math.ceil((alquiler + expensas) * (años * 12) * 0.06));
    }
  }, [tipo_alquiler, alquiler, expensas, años, promo]);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <button
          onClick={() => volver()}
          style={{
            backgroundColor: 'rgba(255, 0, 0)',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            letterSpacing: '2px',
            cursor: 'pointer',
            color: 'white',
            marginRight: '20px',
          }}
        >
          Nueva cotización
        </button>
        <div style={styles.costocontainer}>
          <Text style={styles.costo}>Costo de la garantía de alquiler GY:</Text>
          <Text style={styles.price}>
            $
            {tipo_alquiler === 'vivienda'
              ? cost.toLocaleString('es-AR')
              : comercialCost.toLocaleString('es-AR')}
          </Text>
        </div>
      </div>
      {}
      <PDFViewer style={styles.pdfViewer}>
        <Document title="Cotización de garantía">
          <Page style={styles.body} size="A4">
            <View style={styles.containerimage}>
              <Image
                src="https://i.imgur.com/Z0w4GsW.png"
                style={styles.image}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                Cotización de tu garantía de alquiler
              </Text>
            </View>
            <View style={styles.montos}>
              <Text style={styles.text}>Fecha: {hora} </Text>

              <Text style={styles.text}>
                Alquiler: ${alquiler.toLocaleString('es-AR')}
              </Text>
              <Text style={styles.text}>
                Expensas: ${expensas.toLocaleString('es-AR')}
              </Text>
              <Text style={styles.text}>
                Tiempo: {años > 1 ? años + ' años' : años + ' año'}
              </Text>

              {tipo_alquiler === 'comercial' && (
                <>
                  <Text style={styles.text}>
                    Ajuste: {porcentajeAjuste}% {tipoAjuste}
                  </Text>
                </>
              )}
              {iva === true && <Text style={styles.text}>IVA: 21% </Text>}
            </View>
            {/* //Costo de la garantíaler */}
            <View style={styles.costocontainer}>
              <Text style={styles.costo_gy}>
                Costo de la garantía de alquiler GY:
              </Text>
              <Text style={styles.price_gy}>
                $
                {tipo_alquiler === 'vivienda'
                  ? cost.toLocaleString('es-AR')
                  : comercialCost.toLocaleString('es-AR')}
              </Text>
            </View>

            <Text style={styles.opciones}>Formas de pago y financiación</Text>
            {React.Children.toArray(
              promocion.map((elem) => {
                return (
                  <>
                    {/* 1 pago */}
                    {uno && (
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          <Text style={styles.percentage}>
                            {elem.unPago.efectivo * 100}% OFF
                          </Text>
                          <Text style={styles.cuotaText}>
                            en 1 pago en efectivo
                          </Text>
                        </View>
                        <View style={styles.containerAmount}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  cost * (1 - elem.unPago.efectivo)
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  comercialCost * (1 - elem.unPago.efectivo)
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    )}
                    {elem.unPago.efectivo !== elem.unPago.transferencia && (
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          <Text
                            style={
                              !elem.unPago.transferencia > 0
                                ? { color: 'white' }
                                : styles.percentage
                            }
                          >
                            {elem.unPago.transferencia * 100}% OFF
                          </Text>
                          <Text style={styles.cuotaText}>
                            en 1 pago en transferencia
                          </Text>
                        </View>
                        <View style={styles.containerAmount}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  cost * (1 - elem.unPago.transferencia)
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  comercialCost *
                                    (1 - elem.unPago.transferencia)
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    )}
                    {/* 3 pagos */}
                    {tres && (
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          <Text
                            style={
                              !elem.tresPagos.efectivo > 0
                                ? { color: 'white' }
                                : styles.percentage
                            }
                          >
                            {elem.tresPagos.efectivo * 100}% OFF
                          </Text>

                          <View style={styles.cuotasTextThree}>
                            <Text style={styles.cuotaText}>
                              en 3 cuotas en efectivo:
                            </Text>
                          </View>
                        </View>
                        <View style={styles.containerAmountThree}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  (cost * (1 - elem.tresPagos.efectivo)) / 3
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  (comercialCost *
                                    (1 - elem.tresPagos.efectivo)) /
                                    3
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    )}
                    {elem.tresPagos.efectivo !==
                      elem.tresPagos.transferencia && (
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          <Text
                            style={
                              !elem.tresPagos.transferencia > 0
                                ? { color: 'white' }
                                : styles.percentage
                            }
                          >
                            {elem.tresPagos.transferencia * 100}% OFF
                          </Text>

                          <View style={styles.cuotasTextThree}>
                            <Text style={styles.cuotaText}>
                              en 3 cuotas en transferencia:
                            </Text>
                          </View>
                        </View>
                        <View style={styles.containerAmountThree}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  (cost * (1 - elem.tresPagos.transferencia)) /
                                    3
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  (comercialCost *
                                    (1 - elem.tresPagos.transferencia)) /
                                    3
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    )}
                    {/* 6 cuotas */}
                    {seis && (
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          {elem.seisPagos > 0 && (
                            <Text
                              style={
                                !elem.seisPagos.efectivo > 0
                                  ? { color: 'white' }
                                  : styles.percentage
                              }
                            >
                              {elem.seisPagos.efectivo * 100}% OFF
                            </Text>
                          )}
                          <View style={styles.cuotasText}>
                            <Text style={styles.cuotaText}>6 cuotas</Text>
                            <Text style={styles.seisText}>
                              con primera cuota en efectivo:
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containerAmountSix}>
                          <Text style={styles.amountquarter}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  cost *
                                    1.4 *
                                    (1 - elem.seisPagos.efectivo) *
                                    0.25
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  comercialCost *
                                    1.4 *
                                    (1 - elem.seisPagos.efectivo) *
                                    0.25
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                        <View style={styles.cincoCuotas}>
                          <Text style={styles.seisText}>más 5 cuotas de:</Text>
                          <Text style={styles.amountSix}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  (cost *
                                    1.4 *
                                    (1 - elem.seisPagos.efectivo) *
                                    0.75) /
                                    5
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  (comercialCost *
                                    1.4 *
                                    (1 - elem.seisPagos.efectivo) *
                                    0.75) /
                                    5
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    )}
                    <View style={styles.mercadopago}>
                      <Text style={styles.opciones}>Aboná con MercadoPago</Text>
                      <Text style={styles.opcionesTDC}>
                        Exclusivo con Tarjeta de Crédito
                      </Text>
                      {/* 9 cuotas con interés */}
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          {elem.nuevePagos > 0 && (
                            <Text style={styles.percentage}>
                              {elem.nuevePagos * 100}% OFF
                            </Text>
                          )}

                          <View style={styles.cuotasTextMP}>
                            <Text style={styles.cuotaTextMP}>
                              9 cuotas fijas:
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containerAmountSix}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  (cost * 2.2 * (1 - elem.nuevePagos)) / 9
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  (comercialCost *
                                    2.2 *
                                    (1 - elem.nuevePagos)) /
                                    9
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.boxPrice}>
                        <View style={styles.pagos}>
                          {elem.nuevePagos > 0 && (
                            <Text style={styles.percentage}>
                              {elem.nuevePagos * 100}% OFF
                            </Text>
                          )}
                          {/* 12 cuotas con interés */}
                          <View style={styles.cuotasTextMP}>
                            <Text style={styles.cuotaTextMP}>
                              12 cuotas fijas:
                            </Text>
                          </View>
                        </View>

                        <View style={styles.containerAmountSix}>
                          <Text style={styles.amount}>
                            $
                            {tipo_alquiler === 'vivienda'
                              ? Math.ceil(
                                  (cost * 2.5 * (1 - elem.docePagos)) / 12
                                ).toLocaleString('es-AR')
                              : Math.ceil(
                                  (comercialCost * 2.5 * (1 - elem.docePagos)) /
                                    12
                                ).toLocaleString('es-AR')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.containerNota}>
                      <Text style={styles.nota}>Estás a un "Sí, acepto"</Text>
                      <Text style={styles.nota}>
                        de poder mudarte al lugar que querés!
                      </Text>
                    </View>

                    <View>
                      {React.Children.toArray(
                        asesor_res.map((elem) => {
                          return (
                            <>
                              <View style={styles.asesor}>
                                <Text style={styles.name}>{elem.nombre} </Text>
                                <Text>{elem.cargo} </Text>
                                <Text>{elem.email} </Text>
                                <Text>+54 9 1130350918 </Text>
                              </View>
                            </>
                          );
                        })
                      )}
                    </View>
                    <View style={styles.containerNotaChange}>
                      <Text style={styles.notaChange}>
                        El costo de la garantía varía de acuerdo al monto de
                        alquiler, expensas, ajustes en el alquiler e IVA. En
                        caso de que exista alguna variación en los costos de tu
                        propiedad, por favor informa a tu asesor comercial para
                        que se realicen los respectivos ajustes.
                      </Text>
                    </View>
                    {/* <View style={styles.infoGeneral}>
                      <Text style={styles.phone}>0810-220-2202</Text>
                      <Text style={styles.address}>
                        Av. Álvarez Thomas 198 2°Q, C1427 CABA
                      </Text>
                      <Text style={styles.uri}>
                        <Link src="www.garantiaya.com.ar" style={styles.uri}>
                          garantiaya.com.ar
                        </Link>
                      </Text>
                      <View style={styles.imagesRRSS}>
                        <Image
                          src="https://i.imgur.com/CaMh5Ht.jpg"
                          style={styles.rrss}
                        />
                        <Image
                          src="https://i.imgur.com/TtnrjoT.jpg"
                          style={styles.rrss}
                        />
                        <Image
                          src="https://i.imgur.com/ioPRxDA.jpg"
                          style={styles.rrss}
                        />
                        <Image
                          src="https://i.imgur.com/4giqW40.jpg"
                          style={styles.rrssYT}
                        />
                      </View>
                    </View> */}
                    <View style={styles.containerFinalImage}>
                      <Image
                        src="https://i.imgur.com/Y0JVoOl.png"
                        style={styles.finalImage}
                      />
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
