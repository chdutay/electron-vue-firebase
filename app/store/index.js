//import EventEmitter from 'events'
import Firebase from 'firebase'

import bus from '../bus.js'

// ENTER YOUR FIREBASE URL BELOW

// Initialize Firebase
let config = {
    apiKey: "AIzaSyA75zV9V8yUgdHRW1OI9SRCyRUveug8Dxo",
    authDomain: "electron-vue-firebase.firebaseapp.com",
    databaseURL: "https://electron-vue-firebase.firebaseio.com",
    projectId: "electron-vue-firebase",
    storageBucket: "electron-vue-firebase.appspot.com",
    messagingSenderId: "384426481642"
};

let app = Firebase.initializeApp(config)
const db = app.database()

//const db = new Firebase("https://electron-vue-firebase.firebaseio.com/")
const categoriesRef = db.ref('categories')
const bookmarksRef = db.ref('bookmarks')
//const store = new EventEmitter()

let categories = {}
let bookmarks = {}

//db.on('value', (snapshot) => {
//  var bookmarkData = snapshot.val()
//  if (bookmarkData) {
//    categories = bookmarkData.categories
//    bookmarks = bookmarkData.bookmarks
//    store.emit('data-updated', categories, bookmarks)
//  }
//})

categoriesRef.on('value', (snapshot) => {
    categories = snapshot.val()
    alert(categories)
    bus.$emit('data-updated', categories, bookmarks)
})

bookmarksRef.on('value', (snapshot) => {
    bookmarks = snapshot.val()
    alert(bookmarks)
    bus.$emit('data-updated', categories, bookmarks)
})


export default {

    addBookmark(bookmark) {
        bookmarksRef.push(bookmark)
    },

    deleteBookmark(bookmarkId) {

        bookmarksRef.child(bookmarkId).remove()
    }

}
