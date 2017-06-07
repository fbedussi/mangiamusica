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
      title: '',
      song: null
    }
  }

  stopPlaying() {
    this.state.song.stop();
    this.setState({
        text: '[SCAN QR CODE TO PLAY MUSIC]',
        title: '',
        song: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={(e) => {
            if (e.data === this.state.title) {
              return;
            }

            if (this.state.song !== null) {
              this.stopPlaying();
            }


            this.setState({
              text: 'I\'m going to play ' + e.data + ' tap to stop',
              title: e.data
            })

            var song = new Sound(e.data, Sound.MAIN_BUNDLE, (error) => {
              if (error) {
                console.log('failed to load the song ' + e.data, error);
                return;
              } 
              
              console.log('duration in seconds: ' + song.getDuration() + 'number of channels: ' + song.getNumberOfChannels());

               song.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
            });

           


            this.setState({
              song
            })            
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={() =>{
            this.stopPlaying();
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