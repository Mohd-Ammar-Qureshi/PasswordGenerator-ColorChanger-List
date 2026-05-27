import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, useColorScheme} from 'react-native';

const generateColor = () => {
 
  const hex = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }

  return color;
};

const getAllColors = (count: number) => {
  return Array.from({length: count}, () => generateColor());
};

const ColorLists = () => {
     const theme = useColorScheme();
  const isDarkMode = theme === 'dark';
    

  const [colors] = useState(getAllColors(1000));

  return (
    <View style={[
    styles.container,
    {
      backgroundColor: isDarkMode ? '#000' : '#fff',
    },
  ]}>
      <Text style={[styles.title,{color: isDarkMode ? '#fff':'#000'}]}>
        All Random Colors
      </Text>

      <FlatList
        data={colors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={[
              styles.box,
              {backgroundColor: item},
            ]}>
            <Text selectable={true} style={styles.text}>
              {item}
            </Text>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
  },

  box: {
    borderRadius: 20,
    padding: 20,
    marginBottom:10,
    
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    textAlign:'center',
    fontSize: 25,
    padding: 10,
    fontWeight: 'bold',
    // backgroundColor: '#00000000'
},
  text: {
    textAlign:'center',
    fontSize: 25,
    padding: 10,
},
})

export default ColorLists;