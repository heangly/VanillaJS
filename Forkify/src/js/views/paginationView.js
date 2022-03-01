import View from './View'
import icons from 'url:../../img/icons.svg'

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline')

      if (!btn) return

      const gotoPage = btn.dataset.goto
      handler(+gotoPage)
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    )

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next', 'right', currentPage + 1)
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev', 'left', currentPage - 1)
    }

    // other page
    if (currentPage < numPages) {
      const prevButtonMarkup = this._generateButtonMarkup(
        'next',
        'right',
        currentPage + 1
      )
      const nextButtonMarkup = this._generateButtonMarkup(
        'prev',
        'left',
        currentPage - 1
      )
      return prevButtonMarkup + nextButtonMarkup
    }

    // Page 1 , and there are no other pages
    return ''
  }

  _generateButtonMarkup(paginationType, iconType, page) {
    return `
      <button data-goto=${page} class="btn--inline pagination__btn--${paginationType}">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${iconType}"></use>
        </svg>
        <span>Page ${page}</span>
      </button>
    `
  }
}

export default new PaginationView()
