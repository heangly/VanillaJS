import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView'
import paginationView from './views/paginationView'
import bookmarksView from './views/bookmarksView'
import 'core-js/stable'
import 'regenerator-runtime'

// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()

    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    await model.loadRecipe(id)
    recipeView.render(model.state.recipe)
  } catch (error) {
    recipeView.renderError()
  }
}

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery()?.trim()
    if (!query) return

    resultsView.renderSpinner()
    await model.loadSearchResults(query)

    resultsView.render(model.getSearchResultsPage())
    paginationView.render(model.state.search)
  } catch (error) {
    console.error(error)
  }
}

const controlPagination = (gotoPage) => {
  resultsView.render(model.getSearchResultsPage(gotoPage))
  paginationView.render(model.state.search)
}

const controlServings = (newServings) => {
  model.updateServings(newServings)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe)
  } else {
    model.deleteBookmark(model.state.recipe.id)
  }
  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}

// Subscriber
const init = () => {
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addUpdateServingsHandler(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()
