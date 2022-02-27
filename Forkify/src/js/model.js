import { API_URL } from './config'
import { getJSON } from './helpers'

export const state = {
  recipe: {}
}

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(API_URL + '/' + id)

    const { recipe } = data.data
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      soruceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
