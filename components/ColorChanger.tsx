import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {

  // Random color generator
  const generateColor = () => {

    const colors = '0123456789ABCDEF';

    let color = '#';

    for (let i = 0; i < 6; i++) {

      color += colors[
        Math.floor(Math.random() * 16)
      ];
    }

    return color;
  };

  // 5 different colors
  const [boxColors, setBoxColors] = useState([
    generateColor(),
    generateColor(),
    generateColor(),
    generateColor(),
    generateColor(),
  ]);

  // Change all colors
  const changeColors = () => {

    setBoxColors([
      generateColor(),
      generateColor(),
      generateColor(),
      generateColor(),
      generateColor(),
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>
        Random Color Boxes
      </Text>

      {/* Boxes */}
      <View style={styles.boxContainer}>

        {boxColors.map((color, index) => (
          <View
            key={index}
            style={[
              styles.box,
              {
                backgroundColor: color,
              },
            ]}>
            <Text selectable={true} style={styles.boxText}>
              {color}
            </Text>
          </View>
        ))}

      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={changeColors}>

        <Text style={styles.buttonText}>
          Change Colors
        </Text>

      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 30,
  },

  boxContainer: {
    width: '90%',
  },

  box: {
    height: 90,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,

    // Shadow
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  boxText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },

  button: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 14,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});