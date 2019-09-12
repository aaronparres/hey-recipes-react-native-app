import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    ImageBackground,
} from 'react-native';
import FavoritesDetails from './FavoritesDetails';

import Firebase from '../Authentication/Firebase';
import Axios from "axios";
import RecipeDetails from "../Home/RecipeDetails";
import background from '../../assets/img/backgroundHR.png';

export default class Home extends React.Component {

    state = {
        recipesList: [],
        loading: true,
    };

    componentDidMount(){
        this.getFav();
    }

    getFav() {
        let rootRef = Firebase.database.ref();
        let recipeRef = rootRef.child('recipes');

        recipeRef.on('value', (childSnapshot) => {
            const recipes = [];
            childSnapshot.forEach((doc) => {
                // alert(JSON.stringify(doc.key));
                if(doc.toJSON().user === 'agusti'){
                    recipes.push({
                        recipe: doc.toJSON().recipe,
                    })
                }

                this.setState({
                    recipesList: recipes
                }, () => this.getInfo())
            })
        });
        this.stopLoading();
    }

    getInfo() {
        for (let i = 0; i < this.state.recipesList.length; i++){
            // alert(JSON.stringify(this.state.recipesList[i].recipe));
            Axios.get('http://api.yummly.com/v1/api/recipe/'+this.state.recipesList[i].recipe+'?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e')
                .then(response => {
                    this.state.recipesList[i].image = response.data.images[0].hostedLargeUrl;
                    this.state.recipesList[i].name = response.data.name;
                    this.state.recipesList[i].time = response.data.totalTimeInSeconds;
                })
                .then( res => {
                    this.stopLoading();
                })
                .catch(err => {
                    this.stopLoading();
                })
        }
    }

    stopLoading(){
        this.setState({loading: false})
    }

    handleOnTouchRecipe(info){
        this.props.navigation.navigate('RecipeFavorites', {info: info})
    }

    handlePressFav(recipe){


        let rootRef = Firebase.database.ref();
        let recipeRef = rootRef.child('recipes');

        recipeRef.on('value', (childSnapshot) => {
            const recipes = [];
            childSnapshot.forEach((doc) => {
                if(doc.toJSON().recipe === recipe.recipe){
                    // alert(JSON.stringify(doc.key));
                    try {
                        // childSnapshot.remove();
                        recipeRef.child(doc.key).remove();
                    } catch(e){
                        Alert.alert('Something went wrong', JSON.stringify(e));
                    }
                }

                this.setState({
                    recipesList: recipes
                }, () => this.getFav())
            })
        });



        // try {
        //     childSnapshot.remove();
        //     recipeRef.remove();
        // } catch(e){
        //     Alert.alert('Something went wrong', JSON.stringify(e));
        // }
    }

    render(){
        let {loading} = this.state;
        if (loading){
            return(
                <View style={{flex: 1, backgroundColor:'#FFFBF6', flexDirection: 'row', justifyContent: 'center'}}>
                    <Image source={require('../../assets/img/loading.gif')} style={{height: 400, width: 400}}/>
                </View>
            )
        } else {
            return(
                    <ImageBackground source={background}
                                     imageStyle={{}}
                                     style={styles.background}
                    >
                <View flex={1}>
                        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.mainContent}>

                                <View style={styles.titleBox}>
                                    <Text style={styles.titleText}>
                                        Favorites
                                    </Text>
                                    <View style={styles.separator}/>
                                </View>

                                {this.state.recipesList.length ?
                                    this.state.recipesList.map(recipe =>
                                        <View style={styles.recipeContent}>
                                            <FavoritesDetails
                                                key={recipe.id}
                                                recipe={recipe}
                                                onTouchRecipe={() => this.handleOnTouchRecipe(recipe)}
                                                onPressFav={() => this.handlePressFav(recipe)}
                                            />
                                            <Text style={styles.recipeName}>{recipe.name}</Text>
                                        </View>
                                    )
                                    :
                                    <View style={{
                                        marginVertical: 'auto',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: 40
                                    }}>
                                        <Text style={{ opacity: .75, color: '#383838'}}>You dont have favorite recipes</Text>
                                    </View>
                                }
                            </View>
                        </ScrollView>
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
    recipeContent: {
        marginBottom: 20,
    },
    recipeName:{
        fontFamily: 'SourceSansPro-Regular',
        color: '#BB873E',
        fontSize: 20,
    }
});