import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [justCalculated, setJustCalculated] = useState(false);

  const theme = darkMode
    ? {
        background: '#0b0b2e',
        card: '#16164d',
        text: '#ffffff',
        subtext: '#d6c8ff',
        primary: '#8a2eff',
        secondary: '#d13fb8',
        button: '#f2f2f2',
        display: '#050014',
      }
    : {
        background: '#f3eaff',
        card: '#e2d7ef',
        text: '#5d2bc1',
        subtext: '#6f4d99',
        primary: '#8a2eff',
        secondary: '#d13fb8',
        button: '#f2f2f2',
        display: '#050014',
      };

  const isOperator = (value: string) => ['+', '-', '×', '÷'].includes(value);

  const handlePress = (value: string) => {
    if (justCalculated && !isOperator(value)) {
      setExpression(value);
      setResult('');
      setJustCalculated(false);
      return;
    }

    if (justCalculated && isOperator(value)) {
      setExpression(result + value);
      setResult('');
      setJustCalculated(false);
      return;
    }

    if (isOperator(value)) {
      if (expression === '') return;

      const lastChar = expression.slice(-1);
      const newExpression = isOperator(lastChar)
        ? expression.slice(0, -1) + value
        : expression + value;

      setExpression(newExpression);
      setResult('');
      return;
    }

    if (value === '.') {
      const parts = expression.split(/[+\-×÷]/);
      const currentNumber = parts[parts.length - 1];

      if (currentNumber.includes('.')) return;
    }

    setExpression(expression + value);
    setResult('');
  };

  const clearDisplay = () => {
    setExpression('');
    setResult('');
    setJustCalculated(false);
  };

  const deleteDigit = () => {
    if (justCalculated && result !== '') {
      const newResult = result.slice(0, -1);

      setResult(newResult);
      setExpression(newResult);
      setJustCalculated(newResult !== '');
      return;
    }

    if (expression.length <= 1) {
      setExpression('');
      setResult('');
      return;
    }

    setExpression(expression.slice(0, -1));
    setResult('');
  };

  const calculateResult = () => {
    try {
      if (expression === '' || isOperator(expression.slice(-1))) return;

      const formattedExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

      const calculatedResult = Function(`return ${formattedExpression}`)();

      setResult(calculatedResult.toString());
      setExpression(expression + ' =');
      setJustCalculated(true);
    } catch (error) {
      setResult('Error');
      setJustCalculated(true);
    }
  };

  if (currentScreen === 'home') {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={[styles.card, {backgroundColor: theme.card}]}>
          <Text style={[styles.subtitle, {color: theme.primary}]}>
            Pantalla principal
          </Text>

          <View style={[styles.logo, {backgroundColor: theme.secondary}]}>
            <Text style={styles.logoText}>✦</Text>
          </View>

          <Text style={[styles.title, {color: theme.text}]}>
            Tecmi{'\n'}Calculator
          </Text>

          <Text style={[styles.description, {color: theme.subtext}]}>
            Una calculadora práctica para{'\n'}
            resolver operaciones del día a día,{'\n'}
            ¡sin complicarte!
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
              <Text style={[styles.modeText, {color: theme.primary}]}>
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
                  {color: darkMode ? '#ffffff' : theme.primary},
                ]}>
                ☾
              </Text>
              <Text
                style={[
                  styles.modeText,
                  {color: darkMode ? '#ffffff' : theme.primary},
                ]}>
                Modo noche
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.startButton, {backgroundColor: theme.primary}]}
            onPress={() => setCurrentScreen('calculator')}>
            <Text style={styles.startButtonText}>Empezar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.card, {backgroundColor: theme.card}]}>
        <Text style={[styles.subtitle, {color: theme.primary}]}>
          Pantalla calculadora
        </Text>

        <View style={[styles.displayContainer, {backgroundColor: theme.display}]}>
          <Text
            style={styles.expressionText}
            numberOfLines={1}
            adjustsFontSizeToFit>
            {expression || 'Tecmi Calculator'}
          </Text>

          <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
            {result}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.topButton, {backgroundColor: theme.secondary}]}
            onPress={clearDisplay}>
            <Text style={styles.actionText}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.topButton, {backgroundColor: '#5d2bc1'}]}
            onPress={deleteDigit}>
            <Text style={styles.actionText}>⌫</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.operatorButton, {backgroundColor: theme.primary}]}
            onPress={() => handlePress('÷')}>
            <Text style={styles.actionText}>÷</Text>
          </TouchableOpacity>

          {['7', '8', '9'].map(num => (
            <TouchableOpacity
              key={num}
              style={[styles.numberButton, {backgroundColor: theme.button}]}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.operatorButton, {backgroundColor: theme.primary}]}
            onPress={() => handlePress('×')}>
            <Text style={styles.actionText}>×</Text>
          </TouchableOpacity>

          {['4', '5', '6'].map(num => (
            <TouchableOpacity
              key={num}
              style={[styles.numberButton, {backgroundColor: theme.button}]}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.operatorButton, {backgroundColor: theme.primary}]}
            onPress={() => handlePress('-')}>
            <Text style={styles.actionText}>-</Text>
          </TouchableOpacity>

          {['1', '2', '3'].map(num => (
            <TouchableOpacity
              key={num}
              style={[styles.numberButton, {backgroundColor: theme.button}]}
              onPress={() => handlePress(num)}>
              <Text style={styles.numberText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[styles.operatorButton, {backgroundColor: theme.primary}]}
            onPress={() => handlePress('+')}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.zeroButton, {backgroundColor: theme.button}]}
            onPress={() => handlePress('0')}>
            <Text style={styles.numberText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.numberButton, {backgroundColor: theme.button}]}
            onPress={() => handlePress('.')}>
            <Text style={styles.numberText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.operatorButton, {backgroundColor: theme.primary}]}
            onPress={calculateResult}>
            <Text style={styles.actionText}>=</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.backButton, {borderColor: theme.primary}]}
          onPress={() => setCurrentScreen('home')}>
          <Text style={[styles.backText, {color: theme.primary}]}>Regresar</Text>
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
    color: '#cdb7ff',
    fontSize: 24,
    alignSelf: 'stretch',
    textAlign: 'right',
  },
  displayText: {
    color: '#ffffff',
    fontSize: 70,
    fontWeight: '900',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  topButton: {
    width: '30%',
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
    color: '#5d2bc1',
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