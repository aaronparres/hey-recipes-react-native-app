import * as firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "heyrecipes-4e90b.firebaseapp.com",
    databaseURL: "https://heyrecipes-4e90b.firebaseio.com",
    projectId: "heyrecipes-4e90b",
    storageBucket: "heyrecipes-4e90b.appspot.com",
    messagingSenderId: "708329062200"
};

export default class Firebase {

    static auth;

    static database;

    static registrationInfo = {
        name: '',
        lastName: '',
        email: '',
        password: '',
    };


    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
    }
}