import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;
  return (
    <>
      <StatusBar hidden />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f00', width: '100%', height: '100%' }}>
        <WebView source={{ uri: 'https://www.wfbullion.com' }}></WebView>
      </SafeAreaView>
    </>
  );
};

export default App;
