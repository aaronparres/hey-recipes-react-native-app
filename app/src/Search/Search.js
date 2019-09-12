import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import cam from '../../assets/img/cam.png';
import lupa from '../../assets/img/searchIcon.png';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import background from '../../assets/img/backgroundHR.png';

export default class Home extends React.Component {

    state = {
        loading: true,
        searchWord: '',
    };

    componentDidMount(){
        this.setState({loading: false})
    }

    handleSearch() {
        this.props.navigation.navigate('Results', {ingr: this.state.searchWord})
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
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        resetScrollToCoords={{x:0, y:0}}
                        scrollEnabled={false}
                        keyboardShouldPersistTaps='handled'
                    >
                        <View flex={1}>
                                <View style={styles.container}>
                                    <View style={styles.titleBox}>
                                        <Text style={styles.titleText}>
                                            Look for recipes
                                        </Text>
                                        <View style={styles.separator}/>
                                    </View>

                                    <View style={styles.searchBox}>
                                        <TextInput style={styles.inputData}
                                                   placeholder='Search dishes, ingredients ...'
                                                   autoCapitalize={'none'}
                                                   autoCorrect={false}
                                                   keyboard={true}
                                                   keyboardType='email-address'
                                                   onChangeText={(searchWord) => this.setState({searchWord: searchWord})}
                                                   returnKeyType='go'
                                        />
                                        <TouchableOpacity onPress={() => { this.handleSearch() }}>
                                            <View style={styles.buttonSearch}>
                                                <Image style={styles.lupaButton} source={lupa}/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.cameraSearch}>
                                        <Text style={{textAlign: 'center', fontFamily: 'SourceSansPro-Regular',fontSize: 18, color: '#003828', opacity: 0.7}}>You can also take a picture of the plate</Text>
                                        <TouchableOpacity style={styles.buttonBox} onPress={() => {this.props.navigation.navigate('Camera')}}>
                                            <View style={styles.button}>
                                                <Image style={styles.imageButton} source={cam} />
                                            </View>
                                        </TouchableOpacity>
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
    container: {
        marginHorizontal: 30,
        marginTop: 20
    },
    centered: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    mainContent: {
        marginVertical: 20,
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
    searchBox: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    inputData: {
        fontFamily: 'SourceSansPro-Regular',
        height: 44,
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        borderRadius: 2,
        color: '#000',
        fontSize: 15,
        paddingHorizontal: 10,
    },
    buttonSearch: {
        marginLeft: 20,
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        borderColor: '#BB873E',
        borderWidth: 1,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lupaButton: {
        marginTop: 'auto',
        marginBottom: 'auto',
        resizeMode: 'contain',
        height: 20,
    },
    cameraSearch: {
        marginTop: '30%',
        marginBottom: 'auto',
    },
    buttonBox: {
        marginHorizontal: 40
    },
    button: {
        backgroundColor: '#fff',
        height: 150,
        width: 150,
        borderColor: '#BB873E',
        borderWidth: 1.5,
        borderRadius: 75,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    imageButton: {
        resizeMode: 'contain',
        height: 80,
        tintColor: '#37A563',
        opacity: 0.9,
    },
});