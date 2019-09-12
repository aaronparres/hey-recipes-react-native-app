import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    Alert,
    ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import background from '../../assets/img/backgroundHR.png';
import Firebase from '../Authentication/Firebase';

const USER_LOGGED = 'user_logged';

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
        const { email, error, invalidEmail } = this.state;
        if (email === ''){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', 'Please make sure all fields are filled')
        }else if (invalidEmail){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', error)
        }

        if(email !== '' && !invalidEmail){
            (async () => {
                await this.handleRestorePassword();
            })();
        }
    }

    async handleRestorePassword(){
        const {email} = this.state;
        try {
            await Firebase.auth.sendPasswordResetEmail(email);
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', 'Check your email to restore your password');
        } catch(e){
            this.setState({loading: false});
            Alert.alert('Something went wrong', 'Please, try it again');
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
                    style={{backgroundColor: '#fff', flex: 1}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={false}
                    extraHeight={200}
                    keyboardShouldPersistTaps='handled'
                >
                    <View flex={1}>
                        <View style={{marginTop: '30%'}}>
                            <Text style={styles.title}>Enter your email to restore your password:</Text>
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
                            <TouchableOpacity style={styles.buttonBox} onPress={() => {
                                this.handleErrors()
                            }}>
                                <View style={styles.button}>
                                    <Text style={styles.textButton}>Restore</Text>
                                </View>
                            </TouchableOpacity>
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
    title: {
        fontFamily: 'baskvl',
        marginHorizontal: 40,
        marginBottom: 30,
        fontSize: 16,
    },
    mainView: {
        marginTop: '30%',
        marginBottom: 'auto',
    },
    inputData: {
        fontFamily: 'SourceSansPro-Regular',
        height: 44,
        borderWidth: 0.5,
        padding: 10,
        borderColor: '#D3D3D3',
        marginHorizontal: 40,
        borderRadius: 2,
        color: '#000',
        fontSize: 15
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
        marginBottom: 20,
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
        color: '#000',
        fontSize: 11,
        marginTop: 10,
        fontWeight: '500',
    },
    textForPass2: {
        color: '#37A463',
        fontSize: 11,
        marginTop: 10,
        fontWeight: '500',
    }
});