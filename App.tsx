import { Component } from 'react';
import {
  Animated,

  SafeAreaView,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import images from './data/images2';
import styles from './styles/s_App'
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class App extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      index: 0,
      playDir: 0,
      loaded: false,
      animOpacity: new Animated.Value(0)
    }
  }

  render(): JSX.Element {
    return (
      <SafeAreaView>
        <StatusBar barStyle = 'light-content'/>
        <View style = { styles.primaryContainer }>

          {/* title */}
          <View style = { styles.titleContainer }>
            <Text style = { styles.titleText }> Image Viewer </Text>
          </View>

          {/* image */}
          <View style = { styles.imageContainer }>
            <Animated.View style = {{ flex: this.state.loaded? 1: 0.001, opacity: this.state.animOpacity }}>
              <FastImage
                style = { styles.image }
                source = {{
                  uri: images[this.state.index],
                  priority: FastImage.priority.normal
                }}
                resizeMode = { FastImage.resizeMode.contain }
                onLoad = {() => {
                  this.setState({...this.state, loaded: true}, () => this.fadeIn());
                }}
              />
            </Animated.View>
            <ActivityIndicator 
              style = { this.state.loaded? { flex: 0.001 }: styles.loader }
              size = 'large' animating = { !this.state.loaded } 
            />
          </View>

          {/* controls */}
          <View style = { styles.controlContainer } >
            <View style = { styles.buttonLeft }>
                <Icon.Button 
                  onPress = {() => {
                    this.incrementIndex(-1);
                  }}
                  name = 'angle-double-left' backgroundColor = 'rgb(215, 220, 230)' color = '#111'
                >prev</Icon.Button>
              </View>

              <View style = { styles.buttonMiddle } >
                {
                  this.state.playDir === 0 ? (
                    <Icon.Button
                      onPress = {() => {
                        this.setState({ ...this.state, playDir: 1 }, () => this.incrementIndex(1, 1))
                      }}
                      name = 'play' backgroundColor = 'rgb(215, 220, 230)' color = '#111'
                    >play</Icon.Button>
                  ): (
                    <Icon.Button
                      onPress = {() => {
                        this.setState({ ...this.state, playDir: 0 })
                      }}
                      name = 'pause' backgroundColor = 'rgb(215, 220, 230)' color = '#111'
                    >pause</Icon.Button>
                  )
                }
              </View>
              
              <View style = { styles.buttonRight } >
                <Icon.Button
                  onPress = {() => {
                    this.incrementIndex(1);
                  }}
                  name = 'angle-double-right' backgroundColor = 'rgb(215, 220, 230)' color = '#111'
                >next</Icon.Button>
              </View>
          </View>

        </View>
      </SafeAreaView>
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State): void {
    // schedule index increment after a duration when playDirection is non zero and image is loaded

    if (this.state.playDir === 0) return;
    else if (!prevState.loaded && this.state.loaded) {
      setTimeout(() => {
        this.incrementIndex(this.state.playDir, this.state.playDir);
      }, 2000);
    }
  }

  // ---------- helper methods

  incrementIndex(count: number, playDir: number = 0): void {
    // increment image index if not out of bounds

    if (count == 0) return;
    if (this.state.index + count < 0 || this.state.index + count >= images.length) return;
    this.setState({ ...this.state, index: this.state.index + count, loaded: false, animOpacity: new Animated.Value(0), playDir });
  }

  // ---------- animations

  fadeIn():void {
    // opacity fade in animation

    Animated.timing(this.state.animOpacity, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true
    }).start();
  }
};

// ---------- types

type Props = Readonly <{}>;
type State = Readonly <{
  index: number,
  loaded: boolean,
  playDir: number,
  animOpacity: Animated.Value
}>;