const wordEl = document.querySelector('#word')
const wrongLettersEl = document.querySelector('#wrong-letters')
const playAgainBtn = document.querySelector('#play-again')
const popup = document.querySelector('#popup-container')
const notification = document.querySelector('#notification-container')
const finalMessage = document.querySelector('#final-message')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard']

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = []
const wrongLetters = []

const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        (letter) =>
          `<span class='letter'>${
            correctLetters.includes(letter) ? letter : ''
          }</span>`
      )
      .join('')}
  `

  const innerWord = wordEl.innerText.replace(/\n/g, '')

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulation! You won!'
    popup.style.display = 'flex'
  }
}

const updateWrongLettersEl = () => {
  console.log('update wrong')
}

const showNotification = () => {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

window.addEventListener('keydown', (e) => {
  const pressedLetter = e.key
  if (selectedWord.indexOf(pressedLetter) !== -1) {
    if (!correctLetters.includes(pressedLetter)) {
      correctLetters.push(pressedLetter)
      displayWord()
    } else {
      showNotification()
    }
  } else {
    if (!wrongLetters.includes(pressedLetter)) {
      wrongLetters.push(pressedLetter)
      updateWrongLettersEl()
    } else {
      showNotification()
    }
  }
  displayWord()
})

displayWord()
