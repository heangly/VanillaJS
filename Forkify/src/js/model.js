import { API_URL } from './config'
import { getJSON } from './helpers'

export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
}

export const loadRecipe = async (id) => {
  try {
    const data = await getJSON(API_URL + id)

    const { recipe } = data.data
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
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

export const loadSearchResults = async (query) => {
  try {
    state.search.query = query
    const {
      data: { recipes }
    } = await getJSON(`${API_URL}?search=${query}`)

    state.search.results = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url
      }
    })
  } catch (error) {
    console.error(`Error on loadSearchResults, ${error}`)
    throw error
  }
}
