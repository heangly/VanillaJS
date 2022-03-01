import { API_URL, RESULT_PER_PAGE } from './config'
import { getJSON } from './helpers'

export const state = {
  recipe: {},
  search: {
    page: 1,
    query: '',
    results: [],
    resultsPerPage: RESULT_PER_PAGE
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

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page
  const startItem = (state.search.page - 1) * state.search.resultsPerPage
  const endItem = state.search.page * state.search.resultsPerPage
  return state.search.results.slice(startItem, endItem)
}
