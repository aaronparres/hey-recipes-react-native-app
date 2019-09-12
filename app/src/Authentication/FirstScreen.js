import React from 'react';
import Login from './Login';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ImageBackground,
} from 'react-native';

import logo from '../../assets/img/logo.png';
import background from "../../assets/img/backgroundHR.png";
const USER_LOGGED = 'user_logged';

export default class FirstScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount(){
        (async () => {
            let logged = await AsyncStorage.getItem(USER_LOGGED);
            if(logged === 'true'){
                this.props.navigation.navigate('Home')
            }else{
                this.setState({loading: false})
            }
        })();
    }

    handleGoogleLogin(){
        Alert.alert('Hey!Recipes', 'Login with Google');
    }

    handleFacebookLogin(){
        Alert.alert('Hey!Recipes', 'Login with Facebook');
    }

    render() {
        let {loading} = this.state;
        if (loading) {
            return (
                <View style={{flex: 1, backgroundColor:'#FFFBF6', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={require('../../assets/img/loading.gif')} style={{height: 400, width: 400}}/>
                </View>
            )
        } else {
            return (
                <ImageBackground source={background}
                                 imageStyle={{}}
                                 style={styles.background}
                >
                <View flex={1}>
                    <View style={styles.container}>
                    <Image source={logo} style={styles.logo}/>
                    <View style={styles.loginGF}>
                        <TouchableOpacity style={styles.loginButtonGF} onPress={() => {
                            this.handleGoogleLogin()
                        }}>
                            <View style={styles.buttonG}>
                                <Text style={styles.buttonText}>Google</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButtonGF} onPress={() => {
                            this.handleFacebookLogin()
                        }}>
                            <View style={styles.buttonF}>
                                <Text style={styles.buttonText}>Facebook</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>Access with your email</Text>
                        <View style={{flexDirection: 'row', marginBottom: 40, marginTop: 20}}>
                            <TouchableOpacity style={styles.loginAndSignUp} onPress={() => {
                                this.props.navigation.navigate('Login')
                            }}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Log in</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginAndSignUp} onPress={() => {
                                this.props.navigation.navigate('Register')
                            }}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Sign up</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </View>
                </ImageBackground>
            )
        }
    }
}

const styles=StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
    centered: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        backgroundColor: 'transparent',
        marginTop: 50,
        resizeMode: 'contain',
        height: 50,
    },
    loginGF: {
        marginBottom: 90,
        flexDirection: 'column',
    },
    loginButtonGF:{
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 15,
    },
    buttonG:{
        backgroundColor: '#B23121',
        height: 40,
        width: 200,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        elevation: 4,
    },
    buttonF:{
        backgroundColor: '#3B5998',
        height: 40,
        width: 200,
        borderRadius: 20,
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        elevation: 4,
    },
    subtitle: {
        fontFamily: 'baskvl',
        backgroundColor: 'transparent',
        textAlign: 'center',
        textAlignVertical: 'top',
        fontSize: 15,
        color: '#003828',
        marginTop: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 1,
    },
    loginAndSignUp:{
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    button: {
        backgroundColor: '#BB873E',
        height: 40,
        width: 150,
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        elevation: 4,
    },
    buttonText: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 15,
        color: '#fff',
    },
});

