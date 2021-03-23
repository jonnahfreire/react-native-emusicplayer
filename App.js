import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import AppTabs from './components/AppTab';
import { color } from './components/Colors';

import AudioProvider from './context/AudioProvider';

export default function App() {

  return (
    <View style={styles.container}>
      <AudioProvider>
        <AppTabs />
      </AudioProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.SCREEN_BG,
  },
})