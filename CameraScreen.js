'use strict';

var React = require('react-native');
var {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  DrawerLayoutAndroid,
  ToolbarAndroid,
  ToastAndroid,
  BackAndroid,
  TouchableOpacity,
  Dimensions,
} = React;
import Camera from 'react-native-camera';

var CameraScreen = React.createClass({
  getInitialState: function() {
    return ({
      theme: null,
    });
  },
  onSelectTheme: function(theme) {
    this.refs[DRAWER_REF].closeDrawer();
    this.setState({theme: theme});
  },
  _renderNavigationView: function() {
    return (
      <ThemesList
        onSelectItem={this.onSelectTheme}
      />
    );
  },
  onRefresh: function() {
    this.onSelectTheme(this.state.theme);
  },
  onRefreshFinish: function() {
    this.swipeRefreshLayout && this.swipeRefreshLayout.finishRefresh();
  },
  onPressCallback: function() {
    Alert.alert(
                               `你点击1111了按钮`,
                               'Hello World！',
                               [
                                   {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                   {text: '确定', onPress: () => console.log('OK Pressed')},
                               ]
                           )
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
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

module.exports = CameraScreen;
