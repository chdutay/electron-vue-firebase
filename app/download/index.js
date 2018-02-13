import request from 'request'
import store from '../store'
import bus from '../bus.js'

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

            // save download state
            store.updateProgressBookmark(bookmarkId, received_bytes, total_bytes, 1); // Running

            var req = request({
                method: 'GET',
                uri: bookmark.url
            });

            var out = fs.createWriteStream(downloadsFolder + "\\" + bookmark.title);
            req.pipe(out);

            req.on('response', function (data) {
                // Change the total bytes value to get progress later.
                bookmark.total_bytes = total_bytes = parseInt(data.headers['content-length']);

                // send newx event to refesh bookmark
                bus.$emit("bookmark-updated", bookmarkId, bookmark);
            });

            // Get progress if callback exists
            if (bookmark.hasOwnProperty("onProgress")) {
                req.on('data', function (chunk) {
                    // Update the received bytes
                    received_bytes += chunk.length;

                    bookmark.onProgress(received_bytes, total_bytes);
                });
            } else {
                req.on('data', function (chunk) {
                    // Update the received bytes
                    received_bytes += chunk.length;

                    bookmark.received_bytes = received_bytes;
                    bookmark.total_bytes = total_bytes;

                    // send newx event to refesh bookmark
                    bus.$emit("bookmark-updated", bookmarkId, bookmark);
                });
            }

            req.on('end', function () {
                // save total download
                store.updateProgressBookmark(bookmarkId, received_bytes, total_bytes, 2); // Over

                resolve();
            });
        });
    },

    // function that manage concurrent donwloading
    manageDownload(bookmarks) {

        var runningDownload = 0;

        // search running download
        bookmarks.forEach(childSnapshot => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            if (childData.state == 1) { // running
                console.log("bookmarkId=" + childKey + " is running")
                runningDownload++;
            }
        });

        console.log("runningDownload=" + runningDownload)

        if (runningDownload < 2) {
            // search waiting download
            bookmarks.forEach(childSnapshot => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if (childData.state == 0 && runningDownload < 2) { // waiting

                    childData.state = 1 // running
                    console.log("Launch bookmarkId=" + childKey)

                    this.downloadFile(childKey, childData).then(function () {
                        alert("File " + childData.title + " succesfully downloaded");
                    });
                    runningDownload = 2 // stop loop, manage download will be call again.
                }
            });
        }
    },

    getFilenameFromUrl(url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }

}
