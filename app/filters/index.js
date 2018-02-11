//function filterByTitle (value, title) {
//  return filterBookmarks(value, 'title', title)
//}
//
//function filterByCategory (value, category) {
//  if (!category) return value
//  return filterBookmarks(value, 'category', category)
//}

export function filterBookmarks (bookmarks, filterBy, filterValue) {
  var filteredBookmarks = {}
  for (var bookmark in bookmarks) {
    if (bookmarks[bookmark][filterBy].indexOf(filterValue) > -1) {
      filteredBookmarks[bookmark] = bookmarks[bookmark]
    }
  }
  return filteredBookmarks
}
