import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    Alert,
    Image,
    ImageBackground,
} from 'react-native';
import RecipeDetails from './RecipeDetails';
import background from '../../assets/img/backgroundHR.png';
import Axios from 'axios';

import Firebase from '../Authentication/Firebase';

const USER_LOGGED = 'user_logged';
const recipes = [];
const images = [];



export default class Home extends React.Component {
    state = {
        recipe: '',
        loading: true,
        recipes: null,
        images: null,
        recipeTotal: null,
        recipeFav: [],
    };

    componentDidMount(){
        (async () => {
            try {
                let logged = await AsyncStorage.getItem(USER_LOGGED);
                if(logged === 'true'){
                    this.handleFav();
                }else{
                    this.props.navigation.navigate('FirstScreen')
                }
            }catch(e) {
                Alert.alert('Something went wrong', 'Please, try it later');
            }
        })();
    }

    handleFav(){
        let rootRef = Firebase.database.ref();
        let recipeRef = rootRef.child('recipes');

        recipeRef.on('value', (childSnapshot) => {
            const recipesFav = [];
            childSnapshot.forEach((doc) => {
                recipesFav.push({
                    recipe: doc.toJSON().recipe,
                });
            });

            this.setState({recipeFav: recipesFav}, this.getInfo());
        });
        // this.getInfo();
    }

    getInfo(){
        let cat = ['hamburger', 'smoothie', 'soup', 'fish', 'pizza'];

        let RandomNumber = Math.floor(Math.random() * 5);
        if(this.state.recipeFav.length > 0 ){
            this.handleFavorites();
        }else{
            Axios.get('http://api.yummly.com/v1/api/recipes?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e&q='+cat[RandomNumber])
                .then(res => {
                    // alert(JSON.stringify(res.data.matches[1].id));
                    if (res.data.matches.length !== 0){

                        for (let i = 0; i < res.data.matches.length; i++) {
                            recipes.push({
                                id: res.data.matches[i].id,
                                imageUrl: res.data.matches[i].imageUrlsBySize,
                                ingredients: res.data.matches[i].ingredients,
                                smallImage: res.data.matches[i].smallImageUrls,
                                recipeName: res.data.matches[i].recipeName,
                                time: res.data.matches[i].totalTimeInSeconds,
                                favorite: false,
                            });
                        }
                        this.setState({recipes: recipes}, () => {this.handleImages()})
                    }
                })
                .catch(err => {
                    Alert.alert('Something went wrong', err);
                })
        }
    }

    handleImages(){
        for (let i = 0; i < this.state.recipes.length; i++){
            Axios.get('http://api.yummly.com/v1/api/recipe/'+this.state.recipes[i].id+'?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e')
                .then(response => {
                    this.state.recipes[i].image = response.data.images[0].hostedLargeUrl;
                })
                .then( res => {
                    this.handleFavorites();
                })

                .catch(err => {
                    Alert.alert('Something went wrong', err);
                })
        }
    }

    handleFavorites() {
        const favoriteRecipe = [];
        for(let i = 0; i < this.state.recipes.length; i++){
            for(let f = 0; f < this.state.recipeFav.length; f++){
                // Alert.alert(JSON.stringify(this.state.recipes[i].id), JSON.stringify(this.state.recipeFav[f].recipe));
                if(JSON.stringify(this.state.recipes[i].id) === JSON.stringify(this.state.recipeFav[f].recipe)){
                    this.state.recipes[i].favorite = true;
                }
            }
        }
        this.stopLoading();

    }

    stopLoading(){
        this.setState({loading: false})
    }

    handleOnTouchRecipe(info){
        this.props.navigation.navigate('Recipe', {info: info});
    }

    handlePressFav(recipe){
        let rootRef = Firebase.database.ref();
        let recipeRef = rootRef.child('recipes');

        let data = {
            user: 'agusti',
            recipe: recipe.id,
        };

        try {
            recipeRef.push({
                user: data.user,
                recipe: data.recipe,
            });
            this.setState({loading: true},() => {this.handleFav()});
        } catch(e){
            Alert.alert('Something went wrong', JSON.stringify(e));
        }
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
            // alert(JSON.stringify(this.state.recipes));
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
                                        The last
                                    </Text>
                                    <View style={styles.separator}/>
                                </View>
                                {this.state.recipes.length ?
                                    this.state.recipes.map(recipe =>
                                        <View style={styles.recipeContent}>
                                            <RecipeDetails
                                                key={recipe.id}
                                                recipe={recipe}
                                                onTouchRecipe={() => this.handleOnTouchRecipe(recipe)}
                                                onPressFav={() => this.handlePressFav(recipe)}
                                            />
                                            <Text style={styles.recipeName}>{recipe.recipeName}</Text>
                                        </View>
                                        )
                                    :
                                    <View style={{
                                        marginVertical: 'auto',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: 40
                                    }}>
                                        <Text style={{ opacity: .75, color: '#383838'}}>No recipes found</Text>
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