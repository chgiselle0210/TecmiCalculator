import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}: any) {
  const [modoOscuro, setModoOscuro] = useState(true);

  const tema = modoOscuro
    ? {
        fondo: '#0F1028',
        tarjeta: '#15173A',
        titulo: '#FFFFFF',
        texto: '#D8D8E8',
      }
    : {
        fondo: '#F3EAFD',
        tarjeta: '#E8DCF7',
        titulo: '#5A22B8',
        texto: '#6E4A91',
      };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: tema.fondo}]}>
      <View style={[styles.card, {backgroundColor: tema.tarjeta}]}>
        <Text style={styles.pequeno}>Pantalla principal</Text>

        <View style={styles.iconoContainer}>
          <Text style={styles.estrella}>✦</Text>
        </View>

        <Text style={[styles.titulo, {color: tema.titulo}]}>
          Tecmi{'\n'}Calculator
        </Text>

        <Text style={[styles.descripcion, {color: tema.texto}]}>
          Una calculadora práctica para resolver operaciones del día a día, ¡sin
          complicarte!
        </Text>

        <View style={styles.botonesModo}>
          <TouchableOpacity
            style={[
              styles.botonModo,
              {
                backgroundColor: '#FFFFFF',
                borderColor: '#8A2EFF',
                borderWidth: !modoOscuro ? 2 : 0,
              },
            ]}
            onPress={() => setModoOscuro(false)}>
            <Text style={styles.iconoModo}>☀️</Text>
            <Text style={styles.textoMorado}>Modo claro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botonModo,
              {
                backgroundColor: modoOscuro ? '#000000' : '#FFFFFF',
                borderColor: '#8A2EFF',
                borderWidth: modoOscuro ? 2 : 0,
              },
            ]}
            onPress={() => setModoOscuro(true)}>
            <Text style={[styles.iconoModo, {color: modoOscuro ? '#FFFFFF' : '#6B35E2'}]}>
              ☾
            </Text>
            <Text style={{color: modoOscuro ? '#FFFFFF' : '#6B35E2', fontSize: 22, fontWeight: '700'}}>
              Modo noche
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.botonPrincipal}
          onPress={() => navigation.navigate('Calculadora', {modoOscuro})}>
          <Text style={styles.textoBotonPrincipal}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function CalculatorScreen({navigation, route}: any) {
  const modoOscuro = route.params?.modoOscuro ?? true;
  const [pantalla, setPantalla] = useState('0');
  const [valorAnterior, setValorAnterior] = useState<number | null>(null);
  const [operador, setOperador] = useState<string | null>(null);
  const [nuevoNumero, setNuevoNumero] = useState(true);

  const fondo = modoOscuro ? '#0F1028' : '#F3EAFD';
  const tarjeta = modoOscuro ? '#15173A' : '#E8DCF7';
  const texto = modoOscuro ? '#FFFFFF' : '#5A22B8';

  const presionarNumero = (numero: string) => {
    if (nuevoNumero) {
      setPantalla(numero);
      setNuevoNumero(false);
    } else {
      setPantalla(pantalla === '0' ? numero : pantalla + numero);
    }
  };

  const presionarPunto = () => {
    if (!pantalla.includes('.')) {
      setPantalla(pantalla + '.');
    }
  };

  const limpiar = () => {
    setPantalla('0');
    setValorAnterior(null);
    setOperador(null);
    setNuevoNumero(true);
  };

  const calcular = (valorActual: number, valorPrevio: number, operacion: string) => {
    switch (operacion) {
      case '+':
        return valorPrevio + valorActual;
      case '-':
        return valorPrevio - valorActual;
      case '×':
        return valorPrevio * valorActual;
      case '÷':
        return valorActual === 0 ? 'Error' : valorPrevio / valorActual;
      default:
        return valorActual;
    }
  };

  const presionarOperador = (operacion: string) => {
    const valorActual = parseFloat(pantalla);

    if (valorAnterior === null) {
      setValorAnterior(valorActual);
    } else if (operador) {
      const resultado = calcular(valorActual, valorAnterior, operador);
      setPantalla(String(resultado));
      setValorAnterior(typeof resultado === 'number' ? resultado : null);
    }

    setOperador(operacion);
    setNuevoNumero(true);
  };

  const presionarIgual = () => {
    if (valorAnterior !== null && operador) {
      const resultado = calcular(parseFloat(pantalla), valorAnterior, operador);
      setPantalla(String(resultado));
      setValorAnterior(null);
      setOperador(null);
      setNuevoNumero(true);
    }
  };

  const botones = [
    ['C', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: fondo}]}>
      <View style={[styles.calculadoraCard, {backgroundColor: tarjeta}]}>
        <Text style={styles.pequeno}>Pantalla calculadora</Text>

        <View style={styles.resultadoBox}>
          <Text style={styles.operacionTexto}>{operador ? `${valorAnterior} ${operador}` : 'Tecmi Calculator'}</Text>
          <Text style={styles.resultadoTexto} numberOfLines={1}>
            {pantalla}
          </Text>
        </View>

        <View style={styles.teclado}>
          {botones.map((fila, index) => (
            <View key={index} style={styles.filaBotones}>
              {fila.map(boton => {
                const esOperacion = ['+', '-', '×', '÷', '='].includes(boton);
                const esLimpiar = boton === 'C';

                return (
                  <TouchableOpacity
                    key={boton}
                    style={[
                      styles.botonCalculadora,
                      esOperacion && styles.botonOperacion,
                      esLimpiar && styles.botonLimpiar,
                      boton === '0' && styles.botonCero,
                    ]}
                    onPress={() => {
                      if (!isNaN(Number(boton))) presionarNumero(boton);
                      else if (boton === '.') presionarPunto();
                      else if (boton === 'C') limpiar();
                      else if (boton === '=') presionarIgual();
                      else presionarOperador(boton);
                    }}>
                    <Text style={[styles.textoBotonCalc, {color: esOperacion || esLimpiar ? '#FFFFFF' : texto}]}>
                      {boton}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.botonRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoRegresar}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Calculadora" component={CalculatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 35,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  calculadoraCard: {
    width: '100%',
    borderRadius: 35,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  pequeno: {
    color: '#8A2EFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 28,
  },
  iconoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: '#D33CB5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  estrella: {
    color: '#FFFFFF',
    fontSize: 45,
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 62,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 70,
    marginBottom: 30,
  },
  descripcion: {
    fontSize: 19,
    textAlign: 'center',
    lineHeight: 35,
    marginBottom: 45,
    paddingHorizontal: 10,
  },
  botonesModo: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  botonModo: {
    width: 145,
    height: 105,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoModo: {
    fontSize: 28,
    marginBottom: 10,
  },
  textoMorado: {
    color: '#6B35E2',
    fontSize: 22,
    fontWeight: '700',
  },
  botonPrincipal: {
    width: '100%',
    paddingVertical: 22,
    borderRadius: 25,
    backgroundColor: '#8A2EFF',
    alignItems: 'center',
  },
  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  resultadoBox: {
    width: '100%',
    backgroundColor: '#080615',
    borderRadius: 28,
    padding: 24,
    marginBottom: 25,
    alignItems: 'flex-end',
  },
  operacionTexto: {
    color: '#BFA8FF',
    fontSize: 18,
    marginBottom: 10,
  },
  resultadoTexto: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
  },
  teclado: {
    width: '100%',
    gap: 12,
  },
  filaBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  botonCalculadora: {
    flex: 1,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonOperacion: {
    backgroundColor: '#8A2EFF',
  },
  botonLimpiar: {
    backgroundColor: '#D33CB5',
  },
  botonCero: {
    flex: 2,
  },
  textoBotonCalc: {
    fontSize: 27,
    fontWeight: '900',
  },
  botonRegresar: {
    width: '100%',
    marginTop: 22,
    paddingVertical: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#8A2EFF',
    alignItems: 'center',
  },
  textoRegresar: {
    color: '#8A2EFF',
    fontSize: 20,
    fontWeight: '800',
  },
});