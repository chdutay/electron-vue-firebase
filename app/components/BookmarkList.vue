<template>
  <div id="container">
    <div id="toolbar">
      <div class="ui inverted icon fluid input">
        <input v-model="query" type="text" placeholder="Filter your links...">
        <i class="search icon"></i>
      </div>
    </div>
    <div class="ui relaxed divided selection list">
      <bookmark v-for="(bookmark, id) in bookmarks" :key="id"
        :id="id"
        :title="bookmark.title"
        :url="bookmark.url">
      </bookmark>
    </div>
    <div id="toolbar">
      <div class="ui inverted icon fluid input">
        <button @click="addBookmark"
          class="ui grey inverted basic icon circular button right-float">
          <i class="icon add"></i>
        </button>
          
    </div>
    </div>
    <bookmark-modal></bookmark-modal>
  </div>
</template>

<script>
    import Bookmark from './Bookmark.vue'
    import BookmarkModal from './BookmarkModal.vue'

    export default {

        data() {
            return {
                query: ''
            }
        },

        props: ['bookmarks'],

        components: {
            Bookmark,
            BookmarkModal
        },

        methods: {

            addBookmark() {
                this.$bus.$emit('add-bookmark')
            }

        }

    }
</script>