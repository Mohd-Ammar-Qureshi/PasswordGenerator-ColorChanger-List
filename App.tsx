import { StyleSheet, View } from 'react-native';
import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import ColorChanger from './components/ColorChanger';
import ColorLists from './components/ColorLists';

const App = () => {
  return (
    <View style={styles.container}>
      {/* <PasswordGenerator /> */}
      {/* <ColorChanger/> */}
      <ColorLists/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({

  // ADDED
  // flex:1 makes app take full screen
  container: {
    flex: 1,
  },
});