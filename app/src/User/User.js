import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage,
    Alert,
} from 'react-native';

import background from '../../assets/img/backgroundHR.png';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const USER_LOGGED = 'user_logged';

export default class User extends React.Component {

    state = {
        loading: true,
    };

    componentDidMount(){
        this.setState({loading: false})
    }

    async handleSignOut() {
        let token = 'false';
        try {
            await AsyncStorage.setItem(USER_LOGGED, token);
            this.props.navigation.navigate('FirstScreen');
        } catch(error){
            Alert.alert('Something went wrong', 'Please, try it later')
        }
    }

    render(){
        let {loading} = this.state;
        if (loading){
            return(
                <View style={styles.centered}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            return(
                    <ImageBackground source={background}
                                     imageStyle={{}}
                                     style={styles.background}
                    >
                    <View flex={1}>
                        <View style={styles.mainContent}>
                                <View style={styles.titleBox}>
                                    <Text style={styles.titleText}>
                                        My profile
                                    </Text>
                                    <View style={styles.separator}/>
                                </View>

                                <TouchableOpacity style={styles.buttonBox2} onPress={() => {this.props.navigation.navigate('ResetPassword')}}>
                                    <View style={styles.button}>
                                        <Text style={styles.textButton2}>Reset Password</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.buttonBox2} onPress={() => {this.handleSignOut()}}>
                                    <View style={styles.button2}>
                                        <Text style={styles.textButton}>SignOut</Text>
                                    </View>
                                </TouchableOpacity>
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
    scrollContent: {
        paddingHorizontal: 30,
    },
    centered: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    mainContent: {
        marginVertical: 20,
        paddingHorizontal: 30
    },
    titleBox: {
        marginBottom: 30,
    },
    titleText: {
        fontFamily: 'baskvl',
        fontSize: 30,
        color: '#BB873E',
    },
    separator: {
        borderBottomWidth: 1.5,
        borderColor: '#BB873E',
        opacity: 0.4
    },
    profilePicBox: {

    },
    buttonBox: {
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    button: {
        backgroundColor: '#e5e5e5',
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
    iconProfile: {
        width: 50,
        height: 50,
        tintColor: '#c4c4c4'
    },
    textButton2: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: 15,
        color: '#000',
    },
    buttonBox2: {
        marginTop: 70,
        marginHorizontal: 40,
    },
    button2: {
        backgroundColor: '#E8100C',
        height: 40,
        width: '100%',
        borderRadius: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
        elevation: 4,
    },
    textButton: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: 15,
        color: '#fff',
    },
});