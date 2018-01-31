import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCwD5zjqI1XqsF4oitl_CHHHp9TNUO77po",
    authDomain: "chatapp-e5425.firebaseapp.com",
    databaseURL: "https://chatapp-e5425.firebaseio.com",
    projectId: "chatapp-e5425",
    storageBucket: "chatapp-e5425.appspot.com",
    messagingSenderId: "721293555233"
  };

 export const firebaseApp = firebase.initializeApp(config);