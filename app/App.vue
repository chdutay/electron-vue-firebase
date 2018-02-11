<template>
    <!-- The HTML template for our component -->
    <div id="app">
    <bookmark-list
      :bookmarks="bookmarks">
    </bookmark-list>
  </div>
</template>

<script>
    // the Javascript for our component
    // We will export a Vue component options object here

    import store from './store'
    import BookmarkList from './components/BookmarkList.vue'

    export default {

        components: {
            BookmarkList
        },

        data() {
            return {
                bookmarks: {}
            }
        },

        created: function() {
            // assign the event handler `updateListings` to the `data-updated` event
            this.$bus.$on('data-updated', this.updateListings)
        },
        beforeDestroy: function() {
            this.$bus.$off('data-updated', this.updateListings)
        },
        methods: {
            // set the bookmarks and categories data properties to the new ones
            // received from the store
            updateListings(bookmarks) {
                this.bookmarks = bookmarks
            }

        }

    }

</script>
