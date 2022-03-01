import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView'
import paginationView from './views/paginationView'
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

// Subscriber
const init = () => {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()
