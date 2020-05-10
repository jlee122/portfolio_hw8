import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD63-jm_DDZp7m4YKcoxoijQVpodPW_qik",
    authDomain: "portfolio-2df59.firebaseapp.com",
    databaseURL: "https://portfolio-2df59.firebaseio.com",
    projectId: "portfolio-2df59",
    storageBucket: "portfolio-2df59.appspot.com",
    messagingSenderId: "1058051044143",
    appId: "1:1058051044143:web:cd658828d6d2401f58e7da"
};
firebase.initializeApp(config);
export default firebase;