import * as model from './model'
import recipeView from './views/recipeView'
import 'core-js/stable'
import 'regenerator-runtime'

const recipeContainer = document.querySelector('.recipe')

const timeout = (s) => {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`))
    }, s * 1000)
  })
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return

    recipeView.renderSpinner()
    await model.loadRecipe(id)
    recipeView.render(model.state.recipe)
  } catch (error) {
    alert('Error controlRecipe', error)
  }
}

;['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controlRecipe)
)
