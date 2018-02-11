<template>
    <!-- The HTML template for our component -->
    <div id="app">
    <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
      <!-- bind 'selected-category event to the event handler setSelectedCategory' -->
    </sidebar>
<!--      :bookmarks="bookmarks | filterBookmarks('category', selectedCategory)"-->
    <bookmark-list
      :bookmarks="bookmarks"
      :categories="categories">
    </bookmark-list>
  </div>
</template>

<script>
    // the Javascript for our component
    // We will export a Vue component options object here

    import store from './store'
    //  import eventBus from '../main.js'
    import Sidebar from './components/Sidebar.vue'
    import BookmarkList from './components/BookmarkList.vue'
    import {
        filterBookmarks
    } from './filters'

    export default {

        components: {
            Sidebar,
            BookmarkList
        },

        data() {
            return {
                categories: {},
                bookmarks: {},
                selectedCategory: ''
            }
        },

        filters: {
            filterBookmarks
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
            updateListings(categories, bookmarks) {
                this.categories = categories
                this.bookmarks = bookmarks
            },

            setSelectedCategory(category) {
                this.selectedCategory = category;
            }

        }

    }

</script>
