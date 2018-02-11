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

const bookmarksRef = db.ref('bookmarks')

let bookmarks = {}

bookmarksRef.on('value', (snapshot) => {
    bookmarks = snapshot.val()
    bus.$emit('data-updated', bookmarks)
})

//var request = require('request')
const fs = require('fs')

import request from 'request'
//import fs from 'fs'

// Downloader information
function downloadFile(file_url, targetPath) {
    // Save variable to know progress
    var received_bytes = 0;
    var total_bytes = 0;

    var req = request({
        method: 'GET',
        uri: file_url
    });

    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', function (data) {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes);
    });

    req.on('end', function () {
        alert("File succesfully downloaded");
    });
}

function showProgress(received, total) {
    var percentage = (received * 100) / total;
    console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
}

function getFilenameFromUrl(url) {
    return url.substring(url.lastIndexOf('/') + 1);
}

// export
export default {

    addBookmark(bookmark) {
        bookmarksRef.push(bookmark)

        var fileURL = bookmark.url
        var filename = getFilenameFromUrl(fileURL);
        var downloadsFolder = "C:\\Users\\hermit-lada\\Downloads";

        function getFilenameFromUrl(url) {
            return url.substring(url.lastIndexOf('/') + 1);
        }

        var finalPath = downloadsFolder + "\\" + filename;

        downloadFile(fileURL, finalPath);
    },

    deleteBookmark(bookmarkId) {

        bookmarksRef.child(bookmarkId).remove()
    },

    download(id, url, name) {
        // TODO: check if url is duplicated. Sometimes
        // OpenSubtitles is returning wrong sub in a TV Show
        const file = fs.createWriteStream(name)
        return new Promise(resolve => {
            https.get(url, response => {
                response.pipe(file)
                resolve('ready')
            })
        })
    }

}
