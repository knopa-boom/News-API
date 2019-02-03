// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjV0Yq0Bv_LMuKCDEMKFt2ua_5J4xQtO8",
    authDomain: "api-news-911dd.firebaseapp.com",
    databaseURL: "https://api-news-911dd.firebaseio.com",
    projectId: "api-news-911dd",
    storageBucket: "api-news-911dd.appspot.com",
    messagingSenderId: "597663741975"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);