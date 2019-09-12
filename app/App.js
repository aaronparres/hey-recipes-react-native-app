import React from 'react';
import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
} from 'react-navigation';
import {
    Image,
    Text,
    Platform,
} from 'react-native';
import logo from './assets/img/logo.png';
import FirstScreen from './src/Authentication/FirstScreen';
import Login from './src/Authentication/Login';
import Register from './src/Authentication/Register';
import Home from './src/Home/Home';
import Favorites from './src/Favorites/Favorites';
import Search from './src/Search/Search';
import User from './src/User/User';
import RecipeScreen from './src/Home/RecipeScreen';
import RecipeResultsScreen from './src/Search/RecipeResultsScreen';
import RecipeFavoritesScreen from './src/Favorites/RecipeFavoritesScreen';
import RestorePassword from './src/Authentication/RestorePassword';
import ResetPassword from './src/User/ResetPassword';
import TabBar from './TabBar';

import AuthLoadingScreen from './src/Authentication/AuthLoadingScreen';

import tabHomeIcon from './assets/img/homeIcon.png';
import tabFavIcon from './assets/img/favIcon.png';
import tabSearchIcon from './assets/img/searchIcon.png';
import tabUserIcon from './assets/img/userIcon.png';
import CameraScreen from "./src/Search/CameraScreen";
import Results from './src/Search/Results';
import ResultsList from './src/Search/ResultsList';

const TabsNav = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: '',
            tabBarIcon: ({focused}) => <Image
                style={focused ? {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: 1} : {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: .4}}
                source={tabHomeIcon}/>
        }),
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: ({navigation}) => ({
            title: '',
            tabBarIcon: ({focused}) => <Image
                style={focused ? {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: 1} : {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: .4}}
                source={tabFavIcon}/>
        }),
    },
    Search: {
        screen: Search,
        navigationOptions: ({navigation}) => ({
            title: '',
            tabBarIcon: ({focused}) => <Image
                style={focused ? {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: 1} : {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: .4}}
                source={tabSearchIcon}/>
        }),
    },
    User: {
        screen: User,
        navigationOptions: ({navigation}) => ({
            title: '',
            tabBarIcon: ({focused}) => <Image
                style={focused ? {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: 1} : {position: 'relative', top: '25%', height: 22, resizeMode: 'contain', opacity: .4}}
                source={tabUserIcon}/>
        }),
    },
}, {
    lazy: false,
    initialRouteName: 'Home',
    headerMode: 'screen',
    tabBarOptions: {
        activeTintColor: '#37A463',
        style: {
            fontWeight: '400'
        }
    },
    backBehavior: 'none',
    navigationOptions:{
        tabBarVisible: false,
        headerVisible: false,
    },
    animationEnabled: true,
    tabBarComponent: TabBar,
});

TabsNav.navigationOptions = ({navigation}) => {
    let options = {};
    let focusedRouteName = navigation.state.routes[navigation.state.index].routeName;

    options.headerTitle = <Image style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', resizeMode: 'contain', height: 25}} source={logo}/>

    return options;
};

const AuthStack = createStackNavigator({
    FirstScreen: {
        screen: FirstScreen
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    RestorePassword: {
        screen: RestorePassword
    }
},{
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'screen',
    cardStyle: {backgroundColor: '#fff'}
});

const TabNavigator = createStackNavigator({
    Main: {
        screen: TabsNav,
    },
    Camera: {
        screen: CameraScreen,
    },
    Results: {
        screen: Results,
    },
    ResultsList: {
        screen: ResultsList,
    },
    Recipe: {
        screen: RecipeScreen,
    },
    RecipeFavorites: {
        screen: RecipeFavoritesScreen,
    },
    RecipeResults: {
        screen: RecipeResultsScreen,
    },
    ResetPassword: {
        screen: ResetPassword,
    }
},{
    navigationOptions: {
        gesturesEnabled: false,
    },
    headerMode: 'screen',
    cardStyle: {backgroundColor: '#fff'},
    tabBarComponent: TabBar
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: TabNavigator,
        Auth: AuthStack,
    },{
        initialRouteName: 'AuthLoading',
    }
))