import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Alert
} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import logo from '../../assets/img/logo.png';
import visibility from '../../assets/img/visibility.png';
import Firebase from "./Firebase";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: '',
            repeatPassword: '',
            errorEmail: '',
            errorPassword: '',
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
                errorEmail: ''
            });
        }
        else {
            this.setState({
                email: text,
                invalidEmail: true,
                errorEmail: 'Please, try with another email'
            });
        }
    }

    handlePassword(text){
        if (text.length >= 6){
            this.setState({
                password: text,
                invalidPassword: false,
                errorPassword: '',
            })
        } else {
            this.setState({
                password: text,
                invalidPassword: true,
                errorPassword: 'Password must have at least 6 characters',
            })
        }
    }

    handleErrors(){
        const { name, lastName, email, password, repeatPassword, errorEmail, errorPassword, invalidEmail, invalidPassword } = this.state;
        if (name === '' || lastName === '' || email === '' || password === '' || repeatPassword === ''){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', 'Please make sure all fields are filled')
        }else if (invalidEmail){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', errorEmail)
        }else if (invalidPassword){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', errorPassword)
        }else if (password !== repeatPassword){
            this.setState({loading: false});
            Alert.alert('Hey!Recipes', 'Make sure passwords match')
        }

        if (name !== '' && lastName !== '' && email !== '' && password !== '' && repeatPassword !== '' && !invalidEmail && !invalidPassword){
            if (password === repeatPassword){
                Firebase.registrationInfo.name = name;
                Firebase.registrationInfo.lastName = lastName;
                Firebase.registrationInfo.email = email;
                Firebase.registrationInfo.password = password;
                (async () => {
                    await this.handleRegister();
                })();
            }
        }
    }

    async handleRegister(){
        const { name, lastName, email, password } = this.state;
        try {
            await Firebase.auth.createUserWithEmailAndPassword(email, password);
            this.props.navigation.navigate('Login');
        } catch(e){
            this.setState({loading: false});
            Alert.alert('Something went wrong', 'Please try it again later');
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        style={{backgroundColor: '#fff'}}
                        resetScrollToCoords={{x: 0, y: 0}}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps='handled'
                    >
                        <Image source={logo} style={styles.logo}/>
                        <View style={styles.mainView}>
                            <TextInput style={styles.inputData}
                                       placeholder='Name'
                                       autoCorrect={false}
                                       returnKeyType='next'
                                       onChangeText={(name) => this.setState({name: name})}
                                       onSubmitEditing={() => this.lastName.focus()}
                            />
                            <View style={styles.textBox}>
                                <TextInput style={styles.inputData}
                                           placeholder='Last name'
                                           autoCorrect={false}
                                           returnKeyType='next'
                                           onChangeText={(lastName) => this.setState({lastName: lastName})}
                                           onSubmitEditing={() => this.email.focus()}
                                           ref={(input) => this.lastName = input}
                                />
                            </View>
                            <View style={styles.textBox}>
                                <TextInput style={styles.inputData}
                                           placeholder='Email'
                                           autoCapitalize={'none'}
                                           autoCorrect={false}
                                           keyboard={true}
                                           keyboardType='email-address'
                                           returnKeyType='next'
                                           onChangeText={(email) => this.handleEmail(email)}
                                           onSubmitEditing={() => this.password.focus()}
                                           ref={(input) => this.email = input}
                                />
                            </View>
                            <View style={styles.textBox}>
                                <TextInput style={styles.inputData}
                                           placeholder='Password'
                                           autoCapitalize={'none'}
                                           autoCorrect={false}
                                           secureTextEntry={true}
                                           returnKeyType='next'
                                           onChangeText={(password) => this.handlePassword(password)}
                                           onSubmitEditing={() => this.repeatPassword.focus()}
                                           ref={(input) => this.password = input}
                                />
                            </View>
                            <View style={styles.textBox}>
                                <TextInput style={styles.inputData}
                                           placeholder='Repeat password'
                                           autoCapitalize={'none'}
                                           autoCorrect={false}
                                           secureTextEntry={true}
                                           returnKeyType='go'
                                           onChangeText={(repeatPassword) => this.setState({repeatPassword: repeatPassword})}
                                           ref={(input) => this.repeatPassword = input}
                                />
                            </View>

                            <TouchableOpacity style={styles.buttonBox} onPress={() => {
                                this.handleErrors()
                            }}>
                                <View style={styles.button}>
                                    <Text style={styles.textButton}>Send</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </ScrollView>
            )
        }
    }
}

const styles=StyleSheet.create({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    logo: {
        resizeMode: 'contain',
        marginTop: '20%',
        marginBottom: 'auto',
        marginLeft: '-30%',
        height: 50,
    },
    mainView: {
        marginTop: '20%',
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
    }
});