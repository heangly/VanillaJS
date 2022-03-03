import { API_URL, RESULT_PER_PAGE } from './config'
import { getJSON } from './helpers'

export const state = {
  recipe: {},
  search: {
    page: 1,
    query: '',
    results: [],
    resultsPerPage: RESULT_PER_PAGE
  },
  bookmarks: []
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
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true
    } else {
      state.recipe.bookmarked = false
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
    state.search.page = 1
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

export const updateServings = (newServings) => {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity &&= (ing.quantity * newServings) / state.recipe.servings
  })
  state.recipe.servings = newServings
}

export const addBookmark = (recipe) => {
  state.bookmarks.push(recipe)

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true
  }
}

export const deleteBookmark = (id) => {
  const index = state.bookmarks.findIndex((el) => el.id === id)
  state.bookmarks.splice(index, 1)

  if (state.recipe.id === id) {
    state.recipe.bookmarked = false
  }
}
