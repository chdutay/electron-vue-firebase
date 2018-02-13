<template>
  <div @click="openLink" class="item">
    <div class="content">
      <i @click.stop="deleteBookmark" class="icon remove right-float"></i>
      <a class="header">{{bookmark.title}}</a>
      <div class="description">
        {{bookmark.url}}
        <a class="ui tiny label right-float">{{progress() | percentage }}</a>
      </div>
      <div class="progressbar" :style="'width:' + progress() * 100 + '%'"></div>
    </div>
  </div>
</template>

<script>
    import {
        shell
    } from 'electron'
    import store from '../store'

    export default {
        props: ['id', 'bookmark'],

        created: function() {
            // assign the event handler `updateListings` to the `data-updated` event
            this.$bus.$on('bookmark-updated', this.updateBookmark)
        },

        beforeDestroy: function() {
            this.$bus.$off('bookmark-updated', this.updateBookmark)
        },

        methods: {
            // set the bookmarks and categories data properties to the new ones
            // received from the store
            updateBookmark(bookmarkId, bookmark) {
                if (bookmarkId == this.id) { // running
                    // console.log("bookmarkId=" + bookmarkId + ' ' + bookmark.received_bytes + '/' + bookmark.total_bytes)
                    this.bookmark = bookmark
                }
            },

            deleteBookmark() {
                store.deleteBookmark(this.id)
            },

            openLink() {
                shell.openExternal(this.bookmark.url)
            },

            progress() {
                // console.log('Progress:' + this.bookmark.received_bytes / this.bookmark.total_bytes * 100)
                return (this.bookmark.received_bytes / this.bookmark.total_bytes)
            }
        }

    }

</script>
