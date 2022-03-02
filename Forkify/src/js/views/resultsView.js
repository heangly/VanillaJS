import View from './View'
import icons from 'url:../../img/icons.svg'

class ResultsView extends View {
  _parentElement = document.querySelector('.results')
  _errorMessage = 'No recipes found for your query! Please try again!'
  _successMessage = ''

  _generateMarkup() {
    return this._data.map((data) => this._generateMarkupPreview(data)).join('')
  }

  _generateMarkupPreview(data) {
    const id = window.location.hash.slice(1)

    return `
        <li class='preview'>
          <a class='preview__link ${
            data.id === id ? 'preview__link--active' : ''
          }' href=#${data.id}>
            <figure class='preview__fig'>
              <img src='${data.image}' alt=${data.title} />
            </figure>
            <div class='preview__data'>
              <h4 class='preview__title'>${data.title}</h4>
              <p class='preview__publisher'>${data.publisher}n</p>
            </div>
          </a>
        </li>
      `
  }
}

export default new ResultsView()
