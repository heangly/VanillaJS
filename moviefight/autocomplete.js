const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData
}) => {
  root.innerHTML = `
  <label><b>Search</b></label>
  <input class='input'/>
  <div class='dropdown'>
    <div class='dropdown-menu'>
      <div class='dropdown-content results'></div>
    </div>
  </div>
`

  const input = root.querySelector('input')
  const dropdown = root.querySelector('.dropdown')
  const resultWrapper = root.querySelector('.results')

  const onInputChange = async (e) => {
    const items = await fetchData(e.target.value)

    if (!items.length) {
      dropdown.classList.remove('is-active')
      return
    }

    dropdown.classList.add('is-active')

    while (resultWrapper.firstChild) {
      resultWrapper.firstChild.remove()
    }

    for (const item of items) {
      const anchor = document.createElement('a')
      anchor.classList.add('dropdown-item')
      anchor.innerHTML = renderOption(item)
      anchor.addEventListener('click', async () => {
        input.value = inputValue(item)
        dropdown.classList.remove('is-active')
        onOptionSelect(item)
      })
      resultWrapper.append(anchor)
    }
  }

  input.addEventListener('input', debounce(onInputChange, 500))

  document.addEventListener('click', (e) => {
    if (
      e.target.nodeName !== 'INPUT' &&
      e.target.className !== 'dropdown-item'
    ) {
      dropdown.classList.remove('is-active')
    }
  })
}
