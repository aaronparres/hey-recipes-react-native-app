import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    Alert,
    Image, ImageBackground,
} from 'react-native';
import RecipeDetails from '../Home/RecipeDetails';
import logo from '../../assets/img/logo.png';
import loading from '../../assets/img/loading.gif';
import Axios from 'axios';
import background from '../../assets/img/backgroundHR.png';

const USER_LOGGED = 'user_logged';
const recipes = [];
const images = [];

export default class Results extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            recipes: [],
            images: [],
            recipeTotal: [],
            info: this.props.navigation.state.params.ingr,
        }
    };

    componentDidMount() {
       this.handleNew();
    }

    handleNew() {
        this.setState({
            recipes: null,
            images: null,
            recipeTotal: null,
        }, () => { this.getInfo() })
    }

    getInfo(){
        Axios.get('http://api.yummly.com/v1/api/recipes?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e&q='+JSON.stringify(this.state.info))
            .then(res => {
                if (res.data.matches.length !== 0){

                    for (let i = 0; i < res.data.matches.length; i++) {
                        recipes.push({
                            id: res.data.matches[i].id,
                            imageUrl: res.data.matches[i].imageUrlsBySize,
                            ingredients: res.data.matches[i].ingredients,
                            smallImage: res.data.matches[i].smallImageUrls,
                            recipeName: res.data.matches[i].recipeName,
                            time: res.data.matches[i].totalTimeInSeconds,
                        });
                    }
                    this.setState({recipes: recipes}, () => {this.handleImages()})
                }
            })
            .catch(err => {
                this.setState({loading: false}, () => {
                    Alert.alert('Something went wrong', err);
                })
            })
    }

    handleImages(){
        for (let i = 0; i < this.state.recipes.length; i++){
            Axios.get('http://api.yummly.com/v1/api/recipe/'+this.state.recipes[i].id+'?_app_id=e8db4627&_app_key=4598060826e9e5f129959b618df8f69e')
                .then(response => {
                    this.state.recipes[i].image = response.data.images[0].hostedLargeUrl;
                })
                .then( res => {
                    this.stopLoading();
                })
                .catch(err => {
                    Alert.alert('Something went wrong', err);
                })
        }

    }

    stopLoading(){
        this.setState({loading: false})
    }
    async getUserLogged(){

    }

    handleOnTouchRecipe(info){
        this.props.navigation.navigate('RecipeResults', {info: info});
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
                <View flex={1}>
                    <ImageBackground source={background}
                                     imageStyle={{}}
                                     style={styles.background}
                    >
                        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                            <View style={styles.mainContent}>

                                <View style={styles.titleBox}>
                                    <Text style={styles.titleText}>
                                        Results for {JSON.stringify(this.state.info)}
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
                    </ImageBackground>
                </View>
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