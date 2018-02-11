import request from 'request'
import store from '../store'

const fs = require('fs')

const downloadsFolder = "C:\\Users\\hermit-lada\\Downloads"

// export
export default {

    /**
     * Promise based download file method
     */
    downloadFile(bookmarkId, bookmark) {
        return new Promise(function (resolve, reject) {
            // Save variable to know progress
            var received_bytes = 0;
            var total_bytes = 0;

            var req = request({
                method: 'GET',
                uri: bookmark.url
            });


            var out = fs.createWriteStream(downloadsFolder + "\\" + bookmark.title);
            req.pipe(out);

            req.on('response', function (data) {
                // Change the total bytes value to get progress later.
                bookmark.total_bytes = total_bytes = parseInt(data.headers['content-length']);
            });

            // Get progress if callback exists
            if (bookmark.hasOwnProperty("onProgress")) {
                req.on('data', function (chunk) {
                    // Update the received bytes
                    received_bytes += chunk.length;
                    
                    store.updateProgressBookmark(bookmarkId, received_bytes, total_bytes);

                    bookmark.onProgress(received_bytes, total_bytes);
                });
            } else {
                req.on('data', function (chunk) {
                    // Update the received bytes
                    received_bytes += chunk.length;
                    
                    store.updateProgressBookmark(bookmarkId, received_bytes, total_bytes);
                });
            }

            req.on('end', function () {
                resolve();
            });
        });
    },

    getFilenameFromUrl(url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }

}



/// First version >

/*
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

*/
