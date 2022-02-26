const BASE_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes'

export const state = {
  recipe: {}
}

export const loadRecipe = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`)
    const data = await res.json()

    if (!res.ok) throw new Error(`${data.message} (${res.status})`)

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

    console.log(state.recipe)
  } catch (err) {
    alert(err)
  }
}
