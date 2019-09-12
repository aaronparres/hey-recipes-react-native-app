import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Alert,
    FlatList,
    Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import clock from "../../assets/img/clock.png";
import Axios from 'axios';
import background from '../../assets/img/backgroundHR.png';

export default class RecipeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recipe: [],
            info: this.props.navigation.state.params.info,
        }
    };

    componentWillMount(){
        this.getInfo()
    }

    getInfo(){
        Axios.get('http://api.yummly.com/v1/api/recipe/'+this.state.info.id+'?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e')
            .then(res => {
                this.setState({loading: false, recipe: res.data});
            })
            .catch(err => {
                this.setState({loading: false},() => {
                    Alert.alert('Hey!Recipes', JSON.stringify(err));
                })
            })
    }

    handleBrowse(){
        Linking.canOpenURL(this.state.recipe.source.sourceRecipeUrl).then(supported => {
            if (supported) {
                Linking.openURL(this.state.recipe.source.sourceRecipeUrl);
            } else {
                console.log("Don't know how to open URI: " + this.state.recipe.source.sourceRecipeUrl);
            }
        });
    }

    render() {
        let {loading, recipe} = this.state;
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            let path = require('../../assets/img/StarIcon.png');
            let styleFav = styles.activeStarIcon;
            if (i > recipe.rating) {
                styleFav = styles.starIcon;
            }
            stars.push((<Image style={styleFav} source={path} />));
        }
        let ingredientsList = [];
        for (let i = 1; i <= recipe.ingredientLines; i++){
            ingredientsList.push('key: '+ recipe.ingredientLines[i]);
        }
        if (loading){
            return(
                <View style={{flex: 1, backgroundColor:'#FFFBF6', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={require('../../assets/img/loading.gif')} style={{height: 400, width: 400}}/>
                </View>
            )
        } else {
            return (
                <View flex={1}>
                    <ImageBackground source={background}
                                     imageStyle={{}}
                                     style={styles.background}
                    >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.topImageCont}>
                            <ImageBackground style={styles.topImage} source={{uri: recipe.images[0].hostedLargeUrl}}>
                                <View style={styles.gradientBackground}>
                                    <LinearGradient
                                        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                                        style={styles.linearGradient}
                                        locations={[0.4, 1]}
                                    />
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.mainContainer}>
                            <Text style={styles.title}>{recipe.name}</Text>
                            <View style={styles.puntuation}>
                                { stars }
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.preparationTime}>
                                    Preparation time: {recipe.totalTime}
                                    <Image source={clock} style={{
                                        height: 17,
                                        width: 17,
                                        resizeMode: 'contain',
                                        tintColor: '#000',
                                    }}/>
                                </Text>
                            </View>
                            <Text style={styles.preparationTime}>
                                Number of servings: {recipe.numberOfServings}
                            </Text>
                            <View style={styles.ingredients}>
                                <Text style={styles.ingredientTitle}>Ingredients:</Text>
                                <FlatList
                                    data={recipe.ingredientLines}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item }) => (
                                        <Text style={styles.item}>{item}</Text>
                                    )}
                                />

                                <View style={styles.elaborationContent}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.elaborationTitle}>Recipe from: </Text>
                                        <Text style={styles.elaborationName}>{recipe.source.sourceDisplayName}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.buttonBox} onPress={() => {
                                        this.handleBrowse();
                                    }}>
                                        <View style={styles.button}>
                                            <Text style={styles.textButton}>Go to recipe page</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    </ImageBackground>
                </View>
            );
        }
    }
}


const styles= StyleSheet.create({
    background: {
        height: '100%',
        width: '100%',
    },
    topImageCont: {
        height: 180,
    },
    topImage: {
        height: 180,
        width: '100%',
    },
    gradientBackground: {
        position: 'relative',
        height: 180,
        width: '100%',
    },
    linearGradient: {
        flex: 1,
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
        fontSize: 18,
        color: '#000',
    },
    mainContainer: {
        marginTop: 20,
        marginHorizontal: 30,
    },
    title: {
        fontFamily: 'baskvl',
        fontSize: 30,
        color: '#000',
    },
    puntuation:{
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
    },
    starIcon:{
        marginLeft: -40,
        marginRight: -35,
        height: 25,
        resizeMode: 'contain',
        tintColor: '#383838',
    },
    activeStarIcon:{
        marginLeft: -40,
        marginRight: -35,
        height: 25,
        resizeMode: 'contain',
        tintColor: '#BB873E',
    },
    ingredients: {
        marginTop: 50,

    },
    ingredientTitle: {
        fontFamily: 'SourceSansPro-Regular',
        marginBottom: 10,
        fontSize: 20,
        color: '#000',
    },
    item: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 15,
        color: '#BB873E'
    },
    buttonBox: {
        width: 130,
    },
    button: {
        backgroundColor: '#BB873E',
        height: 35,
        width: '100%',
        borderRadius: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    textButton: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 15,
        color: '#fff',
    },
    elaborationContent: {
        marginVertical: 40,
    },
    elaborationTitle: {
        fontFamily: 'SourceSansPro-Regular',
        fontSize: 17,
        color: '#000',
    },
    elaborationName: {
        fontFamily: 'SourceSansPro-Light',
        fontSize: 18,
        color: '#000',
    }
});