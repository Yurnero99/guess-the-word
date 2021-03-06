import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
  StatusBar,
} from 'react-native';
import test from './assets/test.json'
import Orientation from 'react-native-orientation';
import Homepage from './lib/Homepage';
import MainMenu from './lib/MainMenu';
import MainGameEvent from './lib/MainGameEvent';
import EndScreen from './lib/EndScreen'

class GuessTheWord extends Component {
  constructor() {
    super();
    this.state = {themeNumber: 0, score: 0}
  }

  componentWillMount(){
    Orientation.lockToLandscape();
    StatusBar.setHidden(true);
  }

  render() {
    const routes = [
      {title: 'First Scene', index: 0},
      {title: 'Main Menu', index: 1},
      {title: 'Game Deck', index: 2},
      {title: 'End Scene', index: 3},
    ];
    return (
      <Navigator
        initialRoute={routes[0]}
        renderScene={(route, navigator) => {
          switch(route.index) {
            case 0:
              return <Homepage styles={HomepageStyles} nextScene={() => navigator.push(routes[route.index+1])} />
            case 1:
              return <MainMenu
                nextScene={(themeID) => {
                  navigator.push(routes[route.index+1]);
                  this.setState({themeNumber: themeID})
                }}
                prevScene={() => navigator.pop()} styles={MainMenuStyles}
                />
            case 2:
              return <MainGameEvent
                nextScene={(currentScore) => {
                  navigator.push(routes[route.index+1])
                  this.setState({score: currentScore})
                }}
                themeID={this.state.themeNumber}
              />
            case 3:
              return <EndScreen score={this.state.score} jumpToStart={() => navigator.popN(3)}/>
          }
        }}
        configureScene={(route, routeStack) =>
            Navigator.SceneConfigs.FloatFromBottom
        }
      />
    );
  }
}

const HomepageStyles = StyleSheet.create({
  container: {
    backgroundColor: '#3498DB',
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 80,
    textAlign: 'center',
    color: 'white',
    fontWeight: '900',
    marginBottom: 5,
    textShadowColor: '#2480BB',
    textShadowOffset: {width: -8, height: 5},
  },
  menu: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  versus: {
    flex: 1,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  single: {
    flex: 1,
    backgroundColor: '#1ABC9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  other: {
    flex: 1,
  },
  more: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#33485D',
    justifyContent: 'center',
  },
  like: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#2C3E50',
    justifyContent: 'center',
  },
  howto: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: '#F1C40F',
    justifyContent: 'center',
  },
});

const MainMenuStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#ECF0F1',
  },
  coins: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#BCC2C6',
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomWidth: 1,
  },
  block: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  active: {
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 3.5,
  }
});

AppRegistry.registerComponent('GuessTheWord', () => GuessTheWord);
