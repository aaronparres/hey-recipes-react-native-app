import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    AsyncStorage, ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import logo from '../../assets/img/logo.png';
import visibility from '../../assets/img/visibility.png';
import Firebase from './Firebase';
import background from "../../assets/img/backgroundHR.png";

const USER_LOGGED = 'user_logged';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            invalidEmail: false,
            invalidPassword: false,
            loading: true,
        }
    }

    componentDidMount(){
        this.setState({loading: false});
    }

    handleEmail(text){
        let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === true) {
            this.setState({
                email: text,
                invalidEmail: false,
                error: ''
            });
        }
        else {
            this.setState({
                email: text,
                invalidEmail: true,
                error: 'Enter a valid email',
            });
        }
    }

    handleErrors(){
        this.setState({loading: true});
        const { email, password, error, invalidEmail } = this.state;
        if (email === '' || password === ''){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', 'Please make sure all fields are filled')
        }else if (invalidEmail){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', error)
        }

        if(email !== '' && password !== '' && !invalidEmail){
            (async () => {
                await this.handleLogin();
            })();
        }
    }

    async handleLogin(){
        const {email, password} = this.state;
        try {
            await Firebase.auth.signInWithEmailAndPassword(email, password);
            await this.handleAsyncStorage();
        } catch(e){
            this.setState({loading: false});
            Alert.alert('Something went wrong', 'Please, try it again');
        }
    }


    async handleAsyncStorage(){
        let token = 'true';
        try {
            await AsyncStorage.setItem(USER_LOGGED, token);
            this.props.navigation.navigate('Home');
        } catch(error){
            this.setState({loading: false});
            Alert.alert('Something went wrong', 'Please, try it later')
        }
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
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    style={{backgroundColor: '#fff'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={false}
                    extraHeight={200}
                    keyboardShouldPersistTaps='handled'
                >
                    <View flex={1}>

                    <View style={styles.container}>
                        <Image source={logo} style={styles.logo}/>
                        <View style={styles.mainView}>
                            <TextInput style={styles.inputData}
                                       placeholder='Email'
                                       autoCapitalize={'none'}
                                       autoCorrect={false}
                                       keyboard={true}
                                       keyboardType='email-address'
                                       returnKeyType='next'
                                       onChangeText={(email) => this.handleEmail(email)}
                                       onSubmitEditing={() => this.password.focus()}
                            />
                            <TextInput style={styles.inputData}
                                       placeholder='Password'
                                       autoCapitalize={'none'}
                                       autoCorrect={false}
                                       secureTextEntry={true}
                                       returnKeyType='go'
                                       onChangeText={(password) => this.setState({password: password})}
                                       ref={(input) => this.password = input}
                            />

                            <TouchableOpacity style={styles.buttonBox}
                                              onPress={() => {this.handleErrors()
                            }}>
                                <View style={styles.button}>
                                    <Text style={styles.textButton}>Send</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={styles.forgetPasswordContent}>
                                <Text style={styles.textForPass}>Have you forgotten your password?</Text>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('RestorePassword')}}>
                                    <Text style={styles.textForPass2}> Restore it now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </View>
                </KeyboardAwareScrollView>
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
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    container: {
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
    mainView: {
        marginTop: '45%',
        marginBottom: 'auto',
    },
    inputData: {
        fontFamily: 'SourceSansPro-Regular',
        height: 44,
        width: 300,
        borderWidth: 0.5,
        padding: 10,
        borderColor: '#D3D3D3',
        marginHorizontal: 40,
        borderRadius: 2,
        color: '#000',
        fontSize: 15,
        marginBottom: 10,
    },
    textBox: {
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginTop: 12
    },
    loginAndSignUp: {
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    buttonBox: {
        marginHorizontal: 40
    },
    button: {
        backgroundColor: '#BB873E',
        height: 40,
        width: '100%',
        borderRadius: 20,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        elevation: 4,
    },
    textButton: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 15,
        color: '#fff',
    },
    forgetPasswordContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    textForPass: {
        fontFamily: 'baskvl',
        color: '#000',
        fontSize: 15,
        marginTop: 10,
    },
    textForPass2: {
        fontFamily: 'baskvl',
        color: '#37A463',
        fontSize: 15,
        marginTop: 10,
    }
});