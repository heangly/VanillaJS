const key = '68cddf34'
const baseURL = 'http://www.omdbapi.com/'

const input = document.querySelector('input')

const fetchData = async (searchTerm) => {
  const { data } = await axios.get(baseURL, {
    params: {
      apikey: key,
      s: searchTerm
    }
  })
  console.log(data)
}

const debounce = (func, delay = 1000) => {
  let timeoutId = null
  return (...args) => {
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

const onInputChange = (e) => {
  fetchData(e.target.value)
}

input.addEventListener('input', debounce(onInputChange, 500))
