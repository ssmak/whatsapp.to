import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { resolvePlugin } from '@babel/core';

class App extends React.Component {

  webview = null;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newNavState) {
    // Check if `Call` button is clicked
    if (/^https:\/\/api\.whatsapp\.com\/send\?/.test(newNavState.url)) {
      // `Call` button is clicked
      // Prevent default loading
      this.webview.stopLoading();

      // Extract the phone no from web link
      let phoneNo = newNavState.url.match(/phone=(\d+)/i);
      if(phoneNo && phoneNo.length === 2) {
        phoneNo = phoneNo[1];

        // console.log('call wa.to', phoneNo);

        const waToURL = `whatsapp://send?text=&phone=${phoneNo}`;
        Linking.canOpenURL(waToURL)
          .then((canOpenURL) => {
            if(canOpenURL) {
              // Can open url (Whatsaspp available)
              Linking.openURL(waToURL);
            } else {
              // Cannot open url (Whatsapp not installed)
              Alert.alert('Error', 'Whatsapp not installed.');
            }
          }).catch((error) => {
            console.error(error);
          });
      }
    }
  }

  render() {
    return (
      <>
        {/* <StatusBar hidden /> */}
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', backgroundColor: '#f00', width: '100%', height: '100%' }}>
          <WebView
            ref={(ref) => { this.webview = ref; }}
            source={{ uri: 'https://ssmak.github.io/whatsapp.to' }}
            cacheEnabled={false}
            onNavigationStateChange={this.handleChange}
          ></WebView>
        </SafeAreaView>
      </>
    );
  }
}

export default App;
