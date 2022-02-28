import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView'
import 'core-js/stable'
import 'regenerator-runtime'

if (module.hot) {
  module.hot.accept()
}

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
    resultsView.render(model.state.search.results)
  } catch (error) {
    console.log(error)
  }
}

// Subscriber
const init = () => {
  recipeView.addHandlerRender(controlRecipe)
  searchView.addHandlerSearch(controlSearchResults)
}
init()
