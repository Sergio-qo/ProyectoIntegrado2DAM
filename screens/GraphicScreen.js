
import React, { Component } from 'react';
import 'react-native-gesture-handler';

import * as Progress from 'react-native-progress';

import { Ionicons } from '@expo/vector-icons';

import Graphics from '../components/Graphics';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';

import Global from '../constants/Global';
import { element } from 'prop-types';

export default class GraphicScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      indeterminate: true,
      urlValoraciones: Global.url + "Valoraciones",
      countUsers: 1,
      valoraciones: undefined,
      /*
      valoracionesMarinaBeer: undefined,
      valoracionesRobotic: undefined,
      valoracionesBeeKeen: undefined,
      valoracionesAUCO: undefined,
      valoracionesFlorida: undefined,
      */
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData() {

    fetch(this.state.urlValoraciones)
    .then(respuesta => {
      if(respuesta.ok){
        return respuesta.json();
      }
      else{
        console.log("Error")
      }
    })
    .then(respuestaJSON => {
      respuestaJSON.forEach(valoracion => {
        if(this.state.valoraciones == undefined){
          this.setState({valoraciones: [{idApp:valoracion.idAplicacion, creatividad:valoracion.Creatividad, implementacion:valoracion.Implementacion, comunicacion:valoracion.Comunicacion}]})
        }
        else{
          let appRegistrada = false;
          this.state.valoraciones.forEach(element => {
            if(valoracion.idAplicacion == element.idApp){
              appRegistrada = true;
            }
          });

          if(appRegistrada == true){
            let pos = 0;
            let posActual = 0;
            this.state.valoraciones.forEach(element => {
              if(element.idAplicacion == element.idApp){
                pos = posActual;
              }
              posActual++;
            });

            this.state.valoraciones[pos].creatividad = (this.state.valoraciones[pos].creatividad + valoracion.Creatividad) / 2;
            this.state.valoraciones[pos].implementacion = (this.state.valoraciones[pos].implementacion + valoracion.Implementacion) / 2;
            this.state.valoraciones[pos].comunicacion = (this.state.valoraciones[pos].comunicacion + valoracion.Comunicacion) / 2;
            this.forceUpdate();
          }
          else{
            this.state.valoraciones.push({idApp:valoracion.idAplicacion, creatividad:valoracion.Creatividad, implementacion:valoracion.Implementacion, comunicacion:valoracion.Comunicacion});
          }
        }
      });
      console.log(this.state.valoraciones);

    })
    .catch(error => console.log(error))

    /*fetch(this.state.urlValoraciones + "?idAplicacion=1")
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Error conectando a https://jsonplaceholder.typicode.com");
        }
      })
      .then(respuestaJSON => {
        console.log(respuestaJSON);
        this.setState({valoracionesMarinaBeer: respuestaJSON,
                      countUsers: respuestaJSON.length
                      })
        })
      .catch(error => {
        console.log("Error de red: " + error);
      });



    fetch(this.state.urlValoraciones + "?idAplicacion=2")
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Error conectando a https://jsonplaceholder.typicode.com");
        }
      })
      .then(respuestaJSON => {
        console.log(respuestaJSON);
        this.setState({ valoracionesRobotic: respuestaJSON })
      })
      .catch(error => {
        console.log("Error de red: " + error);
      });



    fetch(this.state.urlValoraciones + "?idAplicacion=3")
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Error conectando a https://jsonplaceholder.typicode.com");
        }
      })
      .then(respuestaJSON => {
        console.log(respuestaJSON);
        this.setState({ valoracionesBeeKeen: respuestaJSON })
      })
      .catch(error => {
        console.log("Error de red: " + error);
      });



    fetch(this.state.urlValoraciones + "?idAplicacion=4")
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Error conectando a https://jsonplaceholder.typicode.com");
        }
      })
      .then(respuestaJSON => {
        console.log(respuestaJSON);
        this.setState({ valoracionesAUCO: respuestaJSON })
      })
      .catch(error => {
        console.log("Error de red: " + error);
      });



    fetch(this.state.urlValoraciones + "?idAplicacion=5")
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          console.log("Error conectando a https://jsonplaceholder.typicode.com");
        }
      })
      .then(respuestaJSON => {
        console.log(respuestaJSON);
        this.setState({ valoracionesFlorida: respuestaJSON })
      })
      .catch(error => {
        console.log("Error de red: " + error);
      });*/
  }

  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Estadísticas',
      headerStyle: {
        backgroundColor: '#e61a31',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
      },
    }
  };

  render() {
    /*
    //Robotic
    let ciRobotic = 0;
    if (this.state.valoracionesRobotic != undefined) {
      this.state.valoracionesRobotic.forEach(element => {
        ciRobotic += element.Creatividad;
      });
    }

    let itRobotic = 0;
    if (this.state.valoracionesRobotic != undefined) {
      this.state.valoracionesRobotic.forEach(element => {
        itRobotic += element.Implementacion;
      });
    }

    let cuRobotic = 0;
    if (this.state.valoracionesRobotic != undefined) {
      this.state.valoracionesRobotic.forEach(element => {
        cuRobotic += element.Comunicacion;
      });
    }

    let ciRoboticBar = ciRobotic/100;
    let itRoboticBar = itRobotic/100;
    let cuRoboticBar = cuRobotic/100;

    let mediaRobotic = (ciRobotic+itRobotic+cuRobotic)/3;
    mediaRobotic = mediaRobotic.toFixed(1);
    let totalRobotic = ciRobotic+itRobotic+cuRobotic;

    //BeeKeen
    let ciBeeKeen = 0;
    if (this.state.valoracionesBeeKeen != undefined) {
      this.state.valoracionesBeeKeen.forEach(element => {
        ciBeeKeen += element.Creatividad;
      });
    }

    let itBeeKeen = 0;
    if (this.state.valoracionesBeeKeen != undefined) {
      this.state.valoracionesBeeKeen.forEach(element => {
        itBeeKeen += element.Implementacion;
      });
    }

    let cuBeeKeen = 0;
    if (this.state.valoracionesBeeKeen != undefined) {
      this.state.valoracionesBeeKeen.forEach(element => {
        cuBeeKeen += element.Comunicacion;
      });
    }


    let ciBeeKeenBar = ciBeeKeen/100;
    let itBeeKeenBar = itBeeKeen/100;
    let cuBeeKeenBar = cuBeeKeen/100;
    let mediaBeeKeen = (ciBeeKeen+itBeeKeen+cuBeeKeen)/3;
    mediaBeeKeen = mediaBeeKeen.toFixed(1);
    let totalBeeKeen = ciBeeKeen+itBeeKeen+cuBeeKeen;


    //MarinaBeer
    let ciMarinaBeer = 0;
    if (this.state.valoracionesMarinaBeer != undefined) {
      this.state.valoracionesMarinaBeer.forEach(element => {
        ciMarinaBeer += element.Creatividad;
      });
    }

    let itMarinaBeer = 0;
    if (this.state.valoracionesMarinaBeer != undefined) {
      this.state.valoracionesMarinaBeer.forEach(element => {
        itMarinaBeer += element.Implementacion;
      });
    }

    let cuMarinaBeer = 0;
    if (this.state.valoracionesMarinaBeer != undefined) {
      this.state.valoracionesMarinaBeer.forEach(element => {
        cuMarinaBeer += element.Comunicacion;
      });
    }

    let ciMarinaBeerBar = ciMarinaBeer/100;
    let itMarinaBeerBar = itMarinaBeer/100;
    let cuMarinaBeerBar = cuMarinaBeer/100;

    let mediaMarinaBeer = (ciMarinaBeer+itMarinaBeer+cuMarinaBeer)/3;
    mediaMarinaBeer = mediaMarinaBeer.toFixed(1);
    let totalMarinaBeer = ciMarinaBeer+itMarinaBeer+cuMarinaBeer;

    //Florida
    let ciFlorida = 0;
    if (this.state.valoracionesFlorida != undefined) {
      this.state.valoracionesFlorida.forEach(element => {
        ciFlorida += element.Creatividad;
      });
    }

    let itFlorida = 0;
    if (this.state.valoracionesFlorida != undefined) {
      this.state.valoracionesFlorida.forEach(element => {
        itFlorida += element.Implementacion;
      });
    }

    let cuFlorida = 0;
    if (this.state.valoracionesFlorida != undefined) {
      this.state.valoracionesFlorida.forEach(element => {
        cuFlorida += element.Comunicacion;
      });
    }

    
    let ciFloridaBar = ciFlorida/100;
    let itFloridaBar = itFlorida/100;
    let cuFloridaBar = cuFlorida/100;

    let mediaFlorida = (ciFlorida+itFlorida+cuFlorida)/3;
    mediaFlorida = mediaFlorida.toFixed(1);
    let totalFlorida = ciFlorida+itFlorida+cuFlorida;


    //AUCO
    let ciAUCO = 0;
    if (this.state.valoracionesAUCO != undefined) {
      this.state.valoracionesAUCO.forEach(element => {
        ciAUCO += element.Creatividad;
      });
    }

    let itAUCO = 0;
    if (this.state.valoracionesAUCO != undefined) {
      this.state.valoracionesAUCO.forEach(element => {
        itAUCO += element.Implementacion;
      });
    }

    let cuAUCO = 0;
    if (this.state.valoracionesAUCO != undefined) {
      this.state.valoracionesAUCO.forEach(element => {
        cuAUCO += element.Comunicacion;
      });
    }

    let ciAUCOBar = ciAUCO/100;
    let itAUCOBar = itAUCO/100;
    let cuAUCOBar = cuAUCO/100;

    let mediaAUCO = (ciAUCO+itAUCO+cuAUCO)/3;
    mediaAUCO = mediaAUCO.toFixed(1);
    let totalAUCO = ciAUCO+itAUCO+cuAUCO;
    */

    const colors = {
      Robotic: '#1b4f72',
      BeeKeen: '#70E2F3',
      MareenaBeerFestival: 'orange',
      FloridaRatings: '#e61a31',
      AppAUCO: '#111BB0'
    };

    if (this.state.valoraciones != undefined) {

      return (
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Media General  <Ionicons name="ios-stats" color='black' size={25} /></Text>
          <Text style={styles.countUsers}>Han votado {this.state.countUsers} usuarios  <Ionicons name="ios-man" color='black' size={14} /></Text>

          <SafeAreaView style={styles.container}>

            <ScrollView style={styles.scrollView}>

              <Graphics
              //Nombre de todas las apps
              nombreApp={'test'}

              //Puntuación creatividad e innovacion
              ci={this.state.valoraciones.creatividad}

              //Barra progreso creatividad e innovación / 100
              ciBar={0.20}

              //Puntuación implementación y transferibilidad
              it={this.state.valoraciones.implementacion}

              //Barra progreso implementación y transferibilidad / 100
              itBar={0.6}

              //Puntuación comunicación y usabilidad
              cu={this.state.valoraciones.comunicacion}

              //Barra progreso comunicación y usabilidad / 100
              cuBar={0.8}

              //Suma de ci,it,cu
              total={this.state.valoraciones.creatividad+this.state.valoraciones.implementacion+this.state.valoraciones.comunicacion}

              //Suma de ci,it,cu / 3
              media={(this.state.valoraciones.creatividad+this.state.valoraciones.implementacion+this.state.valoraciones.comunicacion)/3}
              />

            </ScrollView>
          </SafeAreaView>

        </View>
      );
    }
    else {
      return (
        <View>
          <Text>Cargando...</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    paddingBottom: 50
  },
  app: {
    borderBottomWidth: 2,
    borderBottomColor: '#e61a31',
  },
  container: {
    flex: 3,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    borderTopWidth: 2,
    borderTopColor: '#e61a31',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  StatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'arvo',
  },

  countUsers: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'arvo',
    opacity: 0.5
  },
  bar: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    fontFamily: 'arvo',
    marginBottom: 10
  },

  label2:{
    fontWeight:'bold'
  },

  label3:{
    fontFamily:'arvo'
  },

  totalRate: {
    fontSize: 15,
    opacity: 0.3,
    fontFamily: 'arvo',
    color: "black"
  },
  ratings: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  margin: {
    marginTop: 15
  }
})
