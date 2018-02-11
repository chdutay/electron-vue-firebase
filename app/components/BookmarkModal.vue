<template>

  <div id="bookmark-modal" class="ui small modal">
    <i class="close icon"></i>
    <div class="header">
      Add a new bookmark
    </div>
    <div class="content">

      <form class="ui form">
        <div class="field">
          <label>Bookmark Title</label>
          <input v-model="bookmarkTitle" type="text" placeholder="Enter a title for your bookmark...">
        </div>
        <div class="field">
          <label>Bookmark URL</label>
          <input v-model="bookmarkUrl" type="text" placeholder="Enter the URL for your bookmark...">
        </div>
</form>

</div>
<div class="actions">
    <div @click="addBookmark" class="ui inverted purple button">Add</div>
</div>
</div>

</template>

<script>
    import store from '../store'

    export default {

        data() {
            return {
                bookmarkTitle: '',
                bookmarkUrl: ''
            }
        },

        created: function() {
            // assign the event handler `updateListings` to the `data-updated` event
            this.$bus.$on('add-bookmark', this.initModal)
        },

        beforeDestroy: function() {
            this.$bus.$off('add-bookmark')
        },

        methods: {

            initModal() {
                this.bookmarkTitle = this.bookmarkUrl = ''
                $('#bookmark-modal').modal('show')
            },

            addBookmark() {
                const newBookmark = {
                    title: this.bookmarkTitle,
                    url: this.bookmarkUrl
                }
                store.addBookmark(newBookmark)
                $('#bookmark-modal').modal('hide')
            }

        },

        events: {

            'add-bookmark': function() {
                this.bookmarkTitle = this.bookmarkUrl = ''
                $('#bookmark-modal').modal('show')
            }

        }

    }

</script>
