import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [modoOscuro, setModoOscuro] = useState(true);

  const tema = modoOscuro
    ? {
        fondo: '#0F1028',
        tarjeta: '#15173A',
        titulo: '#FFFFFF',
        texto: '#D8D8E8',
        borde: '#8A2EFF',
        botonSecundario: '#000000',
      }
    : {
        fondo: '#F3EAFD',
        tarjeta: '#E8DCF7',
        titulo: '#5A22B8',
        texto: '#6E4A91',
        borde: '#8A2EFF',
        botonSecundario: '#FFFFFF',
      };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: tema.fondo }]}>
      <View style={[styles.card, { backgroundColor: tema.tarjeta }]}>
        <Text style={[styles.pequeno, { color: '#8A2EFF' }]}>
          Pantalla principal
        </Text>

        <View style={styles.iconoContainer}>
          <Text style={styles.estrella}>✦</Text>
        </View>

        <Text style={[styles.titulo, { color: tema.titulo }]}>
          Tecmi{'\n'}Calculator
        </Text>

        <Text style={[styles.descripcion, { color: tema.texto }]}>
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
            <Text style={[styles.textoModo, { color: '#6B35E2' }]}>
              Modo claro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botonModo,
              {
                backgroundColor: modoOscuro
                  ? tema.botonSecundario
                  : '#FFFFFF',
                borderColor: '#8A2EFF',
                borderWidth: modoOscuro ? 2 : 0,
              },
            ]}
            onPress={() => setModoOscuro(true)}>
            <Text
              style={[
                styles.iconoModo,
                { color: modoOscuro ? '#FFFFFF' : '#6B35E2' },
              ]}>
              ☾
            </Text>

            <Text
              style={[
                styles.textoModo,
                { color: modoOscuro ? '#FFFFFF' : '#6B35E2' },
              ]}>
              Modo noche
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botonPrincipal}>
          <Text style={styles.textoBotonPrincipal}>Empezar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

  pequeno: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 35,
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

  textoModo: {
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
});