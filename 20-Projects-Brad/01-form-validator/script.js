const form = document.querySelector('form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

const showError = (element, message) => {
  const formControl = element.parentElement
  formControl.classList.add('error')
  formControl.classList.remove('success')

  const small = formControl.querySelector('small')
  small.innerText = message
}

const showSuccess = (element) => {
  const formControl = element.parentElement
  formControl.classList.add('success')
  formControl.classList.remove('error')
}

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const checkRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.id} is required`)
    } else if (input.id === 'email' && !isValidEmail(input.value)) {
      showError(input, 'Email is not valid')
    } else {
      showSuccess(input)
    }
  })
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${input.id} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${input.id} must be less than ${max} characters`)
  }
}

const checkPasswordMatch = (p1, p2) => {
  if (p1.value.length !== p2.value.length || p1.value !== p2.value) {
    showError(p1, 'Password does not match')
    showError(p2, 'Password does not match')
  } else {
    showSuccess(p1)
    showSuccess(p2)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 20)
  checkPasswordMatch(password, password2)
})
