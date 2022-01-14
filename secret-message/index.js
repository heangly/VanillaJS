const { hash } = window.location
const message = atob(hash.slice(1))

if (message) {
  document.querySelector('.message-pannel').classList.add('hide')
  document.querySelector('#message-show').classList.remove('hide')
  document.querySelector('h1').innerText = message
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const input = document.querySelector('#message-input')
  const encrypted = btoa(input.value)

  document.querySelector('.message-pannel').classList.toggle('hide')
  document.querySelector('.link-pannel').classList.toggle('hide')
  const linkInput = document.querySelector('#link-input')
  linkInput.value = `${window.location}#${encrypted}`
  linkInput.select()
})
