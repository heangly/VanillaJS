const main = document.querySelector('#main')
const addUser = document.querySelector('#add-user')
const double = document.querySelector('#double')
const showMillionaires = document.querySelector('#show-millionaires')
const sort = document.querySelector('#sort')
const calculateWealth = document.querySelector('#calculate-wealth')

let data = []

const getRandomUser = async () => {
  const rawData = await fetch('https://randomuser.me/api')
  const { results } = await rawData.json()
  const user = results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
}

const doubleMoney = () => {
  data = data.map((user) => ({ ...user, money: user.money * 2 }))
  updateDOM()
}

const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

const showOnlyMillionaires = () => {
  data = data.filter((user) => user.money >= 1000000)
  updateDOM()
}

const calulateWealthFunc = () => {
  const wealth = data.reduce((acc, curr) => acc + curr.money, 0)
  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `
    <h3>Total Wealth: <strong> ${formatMoney(wealth)} </strong> </h3>
  `
  main.appendChild(wealthEl)
}

const addData = (obj) => {
  data.push(obj)
  updateDOM()
}

const updateDOM = (providedData = data) => {
  main.innerHTML = `
      <h2>
        <strong>Person</strong> Wealth
      </h2>
    `

  providedData.forEach((data) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `
       <strong>${data.name}</strong> $ ${formatMoney(data.money)}
    `
    main.append(element)
  })
}

const formatMoney = (num) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
showMillionaires.addEventListener('click', showOnlyMillionaires)
calculateWealth.addEventListener('click', calulateWealthFunc)

getRandomUser()
getRandomUser()
getRandomUser()
