'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import Sound from 'react-native-sound';

// Load the sound file 'whoosh.mp3' from the app bundle
// See notes below about preloading sounds within initialization code below.
var karma = new Sound('karma.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  } 
  // loaded successfully
  console.log('duration in seconds: ' + karma.getDuration() + 'number of channels: ' + karma.getNumberOfChannels());
});



// // Reduce the volume by half
// karma.setVolume(0.5);

// // Position the sound to the full right in a stereo field
// karma.setPan(1);

// // Loop indefinitely until stop() is called
// karma.setNumberOfLoops(-1);

// // Get properties of the player instance
// console.log('volume: ' + karma.getVolume());
// console.log('pan: ' + karma.getPan());
// console.log('loops: ' + karma.getNumberOfLoops());

// // Seek to a specific point in seconds
// karma.setCurrentTime(2.5);

// // Get the current playback point in seconds
// karma.getCurrentTime((seconds) => console.log('at ' + seconds));

// // Pause the sound
// karma.pause();

// // Stop the sound and rewind to the beginning
// karma.stop(() => {
//   // Note: If you want to play a sound after stopping and rewinding it,
//   // it is important to call play() in a callback.
//   karma.play();
// });

// // Release the audio player resource
// karma.release();







class Mangiamusica extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '[SCAN QR CODE TO PLAY MUSIC]',
      song: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={(e) => {
            this.setState({
              text: 'I\'m going to play ' + e.data + ' tap to stop',
              song: e.data
            })

            // Play the sound with an onEnd callback
            karma.play((success) => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={() =>{
            karma.pause();
          }}>{this.state.text}</Text>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('mangiamusica', () => Mangiamusica);