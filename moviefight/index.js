const key = '68cddf34'
const baseURL = 'http://www.omdbapi.com/'

const root = document.querySelector('.autocomplete')

root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class='input'/>
  <div class='dropdown'>
    <div class='dropdown-menu'>
      <div class='dropdown-content results'></div>
    </div>
  </div>
`

const input = document.querySelector('input')
const dropdown = document.querySelector('.dropdown')
const resultWrapper = document.querySelector('.results')

const fetchData = async (searchTerm) => {
  const response = await axios.get(baseURL, {
    params: {
      apikey: key,
      s: searchTerm
    }
  })

  return response.data.Search || []
}

const onInputChange = async (e) => {
  const movies = await fetchData(e.target.value)

  if (movies.length > 0) {
    dropdown.classList.add('is-active')
  } else {
    dropdown.classList.remove('is-active')
  }

  while (resultWrapper.firstChild) {
    resultWrapper.firstChild.remove()
  }

  for (const movie of movies) {
    const anchor = document.createElement('a')
    anchor.classList.add('dropdown-item')
    anchor.innerHTML = `
      ${movie.Poster !== 'N/A' ? `<img src=${movie.Poster}/>` : ''}
      ${movie.Title} (${movie.Year})
    `
    resultWrapper.append(anchor)
  }
}

input.addEventListener('input', debounce(onInputChange, 500))

window.addEventListener('click', () => {
  dropdown.classList.remove('is-active')
})
