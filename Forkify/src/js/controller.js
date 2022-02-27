import * as model from './model'
import recipeView from './views/recipeView'
import 'core-js/stable'
import 'regenerator-runtime'

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

// Subscriber
const init = () => {
  recipeView.addHandlerRender(controlRecipe)
}
init()
