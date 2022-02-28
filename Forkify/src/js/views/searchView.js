class SearchView {
  _parentElement = document.querySelector('.search')

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = ''
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value
    this._clearInput()
    return query
  }

  addHandlerSearch(searchFunction) {
    this._parentElement.addEventListener('submit', (e) => {
      e.preventDefault()
      searchFunction()
    })
  }
}

export default new SearchView()
