import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyD7DPBC5L-Upbi0nCnyNsS73EDGqs3CEKA',
	authDomain: 'todo-app-654c6.firebaseapp.com',
	databaseURL: 'https://todo-app-654c6.firebaseio.com',
	projectId: 'todo-app-654c6',
	storageBucket: 'todo-app-654c6.appspot.com',
	messagingSenderId: '872064243245',
	appId: '1:872064243245:web:6f6994b5dda673bc2bcaa4',
});
const db = firebaseApp.firestore();

export default db;
