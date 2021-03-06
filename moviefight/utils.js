const debounce = (func, delay = 1000) => {
  let timeoutId = null
  return (...args) => {
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}
