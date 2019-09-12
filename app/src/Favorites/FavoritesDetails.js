import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Image,
    ImageBackground,
    Platform,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import fav from '../../assets/img/fav-icon-fill.png';
import background from '../../assets/img/background.jpg';
import clock from '../../assets/img/clock.png';


const FavoritesDetails = (props) => {
    const {recipe} = props;

    return (
        <View style={styles.containerRecipe}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={props.onTouchRecipe}>

                <ImageBackground source={{uri: recipe.image}}
                                 imageStyle={{borderRadius: 20}}
                                 style={styles.recipeBackground}
                >
                    <View style={styles.gradientBackground}>
                        <LinearGradient
                            colors={['transparent',  'rgba(0, 0, 0, 0.8)']}
                            style={styles.linearGradient}
                            locations={[0.4, 1]}
                        />
                        <View style={styles.infoContainer}>
                            <View style={styles.infoFooter}>
                                <View style={styles.leftContent}>
                                    <TouchableOpacity onPress={props.onPressFav}>
                                        <Image source={fav} style={{marginLeft: -30, resizeMode: 'contain', height: 20, tintColor: '#fff'}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.rightContent}>
                                    <Text style={styles.preparationTime}>
                                        <Image source={clock} style={{height: 17, width: 17, resizeMode: 'contain', tintColor: '#fff'}}/>
                                        {recipe.time / 60} min
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};


const styles= StyleSheet.create({
    containerRecipe: {
        marginVertical: 5,
    },
    recipeBackground:{
        height: 170,
        width: '100%',
    },
    gradientBackground: {
        position: 'relative',
        height: 170,
        width: '100%',
        marginBottom: 0,
        borderRadius: 20,
    },
    linearGradient: {
        flex: 1,
        borderRadius: 20,
    },
    infoContainer: {
        margin: 'auto',
        padding: 0,
    },
    infoFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-end',
    },
    leftContent: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    rightContent: {
        marginTop: 'auto',
        marginBottom: 'auto',
        flexDirection: 'row',
    },
    preparationTime: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: 15,
        marginRight: 10,
        color: '#fff',
    }
});

export default FavoritesDetails;