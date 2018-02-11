<template>
  <div @click="openLink" class="item">
    <div class="content">
      <i @click.stop="deleteBookmark" class="icon remove right-float"></i>
      <a class="header">{{bookmark.title}}</a>
      <div class="description">
        {{bookmark.url}}
        <a class="ui tiny label right-float">{{bookmark.received_bytes}}/{{bookmark.total_bytes}}</a>
      </div>
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
            updateBookmark(bookmark) {
                if (bookmark.title === this.bookmark.title)
                    this.bookmark = bookmark
            },

            deleteBookmark() {
                store.deleteBookmark(this.id)
            },

            openLink() {
                shell.openExternal(this.url)
            }
        }

    }

</script>
