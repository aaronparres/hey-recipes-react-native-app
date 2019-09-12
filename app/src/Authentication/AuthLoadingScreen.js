import React from "react";
import {
    View,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text
} from 'react-native';

import Firebase from './Firebase';

export default class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // staticAssetsLoaded: false,
            authStatusReported: false,
            userAuthenticated: false,
        }
    }

    componentWillMount(){
        Firebase.init();
        this.handleLoggedUser();
        Firebase.auth.onAuthStateChanged(user => {
            this.setState({
                authStatusReported: true,
                userAuthenticated: !!user,
            })
        });
    }

    handleLoggedUser() {
        const { authStatusReported, userAuthenticated } = this.state;
        if(userAuthenticated){
            this.props.navigation.navigate('Home');
        }else{
            this.props.navigation.navigate('Auth');
        }
    };

    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator size={'large'} color={'#BB873E'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});