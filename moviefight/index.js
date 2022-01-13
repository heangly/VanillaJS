const key = '68cddf34'
const baseURL = 'http://www.omdbapi.com/'

const autoCompleteConfig = {
  renderOption: (movie) => {
    return ` 
      ${movie.Poster !== 'N/A' ? `<img src=${movie.Poster}/>` : ''}
      ${movie.Title} (${movie.Year})
    `
  },

  inputValue: (movie) => {
    return movie.Title
  },

  fetchData: async (searchTerm) => {
    const response = await axios.get(baseURL, {
      params: {
        apikey: key,
        s: searchTerm
      }
    })
    return response.data.Search || []
  }
}

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect: (movie) => {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left')
  }
})

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect: (movie) => {
    document.querySelector('.tutorial').classList.add('is-hidden')
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right')
  }
})

let leftMovie = null
let rightMovie = null

const onMovieSelect = async (movie, summaryElement, side) => {
  const urlString = `${baseURL}?apikey=${key}&i=${movie.imdbID}`
  try {
    const response = await fetch(urlString)
    const data = await response.json()
    summaryElement.innerHTML = movieTemplate(data)

    if (side === 'left') {
      leftMovie = data
    } else {
      rightMovie = data
    }

    if (leftMovie && rightMovie) {
      runComparison()
    }
  } catch (error) {
    console.log('error fetching single selected movie', error)
  }
}

const runComparison = () => {
  const leftSideStats = document.querySelectorAll('#left-summary .notification')
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  )

  for (let i = 0; i < leftSideStats.length; i++) {
    const leftSide = leftSideStats[i]
    const rightSide = rightSideStats[i]

    if (
      parseFloat(leftSide.dataset.value) > parseFloat(rightSide.dataset.value)
    ) {
      leftSide.classList.add('is-primary')
      rightSide.classList.add('is-warning')
    } else {
      rightSide.classList.add('is-primary')
      leftSide.classList.add('is-warning')
    }
  }
}

const movieTemplate = (movieDetail) => {
  const awards = movieDetail.Awards.split(' ').reduce((acc, curr) => {
    return isNaN(curr) ? acc : acc + parseInt(curr)
  }, 0)

  const dollars = parseInt(
    movieDetail.BoxOffice.replaceAll('$', '').replaceAll(',', '')
  )
  const metascore = parseInt(movieDetail.Metascore)
  const imdbRating = parseFloat(movieDetail.imdbRating)
  const imdbVotes = parseInt(movieDetail.imdbVotes.replaceAll(',', ''))

  return `
    <article class='media'>
      <figure class='media-left'>
        <p class='image'>
          <img src=${movieDetail.Poster}/>
        </p>
      </figure>

      <div class='media-content'>
        <div class='content'>
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
        </div>
      </div>
    </article>

    <article data-value=${awards} class='notification is-primary'>
      <p class='title'>${movieDetail.Awards}</p>
      <p class='subtitle'>Awards</p>
    </article>

    <article data-value=${dollars} class='notification is-primary'>
      <p class='title'>${movieDetail.BoxOffice}</p>
      <p class='subtitle'>Box Office</p>
    </article>

    <article data-value=${metascore} class='notification is-primary'>
      <p class='title'>${movieDetail.Metascore}</p>
      <p class='subtitle'>Metascore</p>
    </article>

    <article data-value=${imdbRating} class='notification is-primary'>
      <p class='title'>${movieDetail.imdbRating}</p>
      <p class='subtitle'>IMDB Rating</p>
    </article>

    <article data-value=${imdbVotes} class='notification is-primary'>
      <p class='title'>${movieDetail.imdbVotes}</p>
      <p class='subtitle'>IMDB Votes</p>
    </article>
  `
}
