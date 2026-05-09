import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');

  const theme = darkMode
    ? {
        background: '#0b0b2e',
        card: '#16164d',
        text: '#ffffff',
        subtext: '#d6c8ff',
        primary: '#8a2eff',
        secondary: '#d13fb8',
        button: '#f2f2f2',
        buttonText: '#5d2bc1',
        display: '#050014',
        border: '#8a2eff',
      }
    : {
        background: '#f3eaff',
        card: '#e2d7ef',
        text: '#5d2bc1',
        subtext: '#6f4d99',
        primary: '#8a2eff',
        secondary: '#d13fb8',
        button: '#f2f2f2',
        buttonText: '#5d2bc1',
        display: '#050014',
        border: '#8a2eff',
      };

  const handlePress = (value: string) => {
    if (display === '0') {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }

    setExpression(prev => prev + value);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setExpression('');
  };

  const calculateResult = () => {
    try {
      const formattedExpression = expression.replace(/×/g, '*');

      const result = eval(formattedExpression);

      setDisplay(result.toString());

      // ESTE CAMBIO hace que se vea TODA la operación
      setExpression(expression + ' =');
    } catch (error) {
      setDisplay('Error');
    }
  };

  if (currentScreen === 'home') {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.background},
        ]}>
        <View
          style={[
            styles.card,
            {backgroundColor: theme.card},
          ]}>
          <Text
            style={[
              styles.subtitle,
              {color: theme.primary},
            ]}>
            Pantalla principal
          </Text>

          <View
            style={[
              styles.logo,
              {backgroundColor: theme.secondary},
            ]}>
            <Text style={styles.logoText}>✦</Text>
          </View>

          <Text
            style={[
              styles.title,
              {color: theme.text},
            ]}>
            Tecmi{'\n'}Calculator
          </Text>

          <Text
            style={[
              styles.description,
              {color: theme.subtext},
            ]}>
            ¡Una calculadora práctica para{'\n'}
            resolver operaciones del día a día,{'\n'}
            sin complicarte!
          </Text>

          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                {
                  backgroundColor: '#f2f2f2',
                  borderColor: theme.primary,
                  borderWidth: 3,
                },
              ]}
              onPress={() => setDarkMode(false)}>
              <Text style={styles.modeIcon}>☀️</Text>

              <Text
                style={[
                  styles.modeText,
                  {color: theme.primary},
                ]}>
                Modo claro
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeButton,
                {
                  backgroundColor: darkMode ? '#000000' : '#f2f2f2',
                  borderColor: theme.primary,
                  borderWidth: 3,
                },
              ]}
              onPress={() => setDarkMode(true)}>
              <Text
                style={[
                  styles.modeIcon,
                  {
                    color: darkMode ? '#ffffff' : theme.primary,
                  },
                ]}>
                ☾
              </Text>

              <Text
                style={[
                  styles.modeText,
                  {
                    color: darkMode ? '#ffffff' : theme.primary,
                  },
                ]}>
                Modo noche
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.startButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={() => setCurrentScreen('calculator')}>
            <Text style={styles.startButtonText}>
              Empezar
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme.background},
      ]}>
      <View
        style={[
          styles.card,
          {backgroundColor: theme.card},
        ]}>
        <Text
          style={[
            styles.subtitle,
            {color: theme.primary},
          ]}>
          Pantalla calculadora
        </Text>

        <View
          style={[
            styles.displayContainer,
            {backgroundColor: theme.display},
          ]}>
          {/* CAMBIO: ahora la operación completa se ve mejor */}
          <Text
            style={[
              styles.expressionText,
              {color: '#cdb7ff'},
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {expression}
          </Text>

          <Text
            style={[
              styles.displayText,
              {color: '#ffffff'},
            ]}>
            {display}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              {backgroundColor: theme.secondary},
            ]}
            onPress={clearDisplay}>
            <Text style={styles.actionText}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={() => handlePress('÷')}>
            <Text style={styles.actionText}>÷</Text>
          </TouchableOpacity>

          {['7', '8', '9'].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberButton,
                {backgroundColor: theme.button},
              ]}
              onPress={() => handlePress(num)}>
              {/* CAMBIO: números visibles en modo oscuro */}
              <Text
                style={[
                  styles.numberText,
                  {color: '#5d2bc1'},
                ]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.operatorButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={() => handlePress('×')}>
            <Text style={styles.actionText}>×</Text>
          </TouchableOpacity>

          {['4', '5', '6'].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberButton,
                {backgroundColor: theme.button},
              ]}
              onPress={() => handlePress(num)}>
              <Text
                style={[
                  styles.numberText,
                  {color: '#5d2bc1'},
                ]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.operatorButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={() => handlePress('-')}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>

          {['1', '2', '3'].map(num => (
            <TouchableOpacity
              key={num}
              style={[
                styles.numberButton,
                {backgroundColor: theme.button},
              ]}
              onPress={() => handlePress(num)}>
              <Text
                style={[
                  styles.numberText,
                  {color: '#5d2bc1'},
                ]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.operatorButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={() => handlePress('+')}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.zeroButton,
              {backgroundColor: theme.button},
            ]}
            onPress={() => handlePress('0')}>
            <Text
              style={[
                styles.numberText,
                {color: '#5d2bc1'},
              ]}>
              0
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.numberButton,
              {backgroundColor: theme.button},
            ]}
            onPress={() => handlePress('.')}>
            <Text
              style={[
                styles.numberText,
                {color: '#5d2bc1'},
              ]}>
              .
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.operatorButton,
              {backgroundColor: theme.primary},
            ]}
            onPress={calculateResult}>
            <Text style={styles.actionText}>=</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.backButton,
            {
              borderColor: theme.primary,
            },
          ]}
          onPress={() => setCurrentScreen('home')}>
          <Text
            style={[
              styles.backText,
              {color: theme.primary},
            ]}>
            Regresar
          </Text>
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
  },

  card: {
    width: '88%',
    borderRadius: 35,
    padding: 25,
    alignItems: 'center',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  logo: {
    width: 145,
    height: 145,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  logoText: {
    fontSize: 60,
    color: '#ffffff',
  },

  title: {
    fontSize: 62,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 68,
  },

  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 42,
    marginTop: 30,
    marginBottom: 30,
  },

  modeContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },

  modeButton: {
    width: 150,
    height: 110,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modeIcon: {
    fontSize: 35,
    marginBottom: 10,
  },

  modeText: {
    fontSize: 18,
    fontWeight: '700',
  },

  startButton: {
    width: '100%',
    paddingVertical: 22,
    borderRadius: 25,
    alignItems: 'center',
  },

  startButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },

  displayContainer: {
    width: '100%',
    height: 140,
    borderRadius: 35,
    padding: 18,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30,
  },

  expressionText: {
    fontSize: 22,
    alignSelf: 'stretch',
    textAlign: 'right',
  },

  displayText: {
    fontSize: 70,
    fontWeight: '900',
  },

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },

  actionButton: {
    width: '47%',
    height: 85,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  operatorButton: {
    width: '22%',
    height: 85,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  numberButton: {
    width: '22%',
    height: 85,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  zeroButton: {
    width: '47%',
    height: 85,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '900',
  },

  numberText: {
    fontSize: 34,
    fontWeight: '900',
  },

  backButton: {
    width: '100%',
    borderWidth: 3,
    borderRadius: 25,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 28,
  },

  backText: {
    fontSize: 24,
    fontWeight: '800',
  },
});

export default App;