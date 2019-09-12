import React from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Image,
    ScrollView,
} from 'react-native';
import Clarifai from 'clarifai';
import { RNCamera } from 'react-native-camera';

const app = new Clarifai.App({
    apiKey: '415157db6b814ad49f3d22b58e397271'
});

export default class CameraScreen extends React.Component {
    state = {
        picture: '',
        loading: false,
        info: '',
    };


    async takePicture () {
        if (this.camera) {
            const options = {quality: 0.5, base64: true};
            const data = await this.camera.takePictureAsync(options);
            // this.props.navigation.navigate('Results');
            this.setState({ loading: true });
            this.sendImage(data);
            // this.sendImage(data);
        }
    };

    sendImage(picture){
        app.models.predict('bd367be194cf45149e75f01d59f77ba7', { base64: picture.base64 })
            .then(res => {
                this.props.navigation.navigate('ResultsList', {res: res});
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({ loading: false });
                Alert.alert('error', JSON.stringify(error));
            })
    }

    render(){
        let {loading} = this.state;
        if(loading){
            return(
                <View style={{flex: 1, backgroundColor:'#FFFBF6', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={require('../../assets/img/loading.gif')} style={{height: 400, width: 400}}/>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                    <TouchableOpacity onPress={this.takePicture.bind(this)}>
                        <View style={styles.capture}>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    preview: {
        flex: 1,
    },
    capture: {
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 15,
        paddingHorizontal: 20,
        margin: 20,
        alignSelf: 'center',
        height: 50,
        width: 50,
    }
});

AppRegistry.registerComponent('CameraScreen', () => CameraScreen);