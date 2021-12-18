const currencyElement_one = document.querySelector('#currency-one')
const amountElement_one = document.querySelector('#amount-one')
const amountElement_two = document.querySelector('#amount-two')
const currencyElement_two = document.querySelector('#currency-two')
const rateElement = document.querySelector('#rate')
const swap = document.querySelector('#swap')

const calculate = async () => {
  const currency_one = currencyElement_one.value
  const currency_two = currencyElement_two.value
  const https = `https://api.exchangerate-api.com/v4/latest/${currency_one}`
  const rawResponse = await fetch(https)
  const jsonData = await rawResponse.json()
  const rate = jsonData.rates[currency_two]
  rateElement.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`
  amountElement_two.value = (amountElement_one.value * rate).toFixed(2)
}

currencyElement_one.addEventListener('change', calculate)
amountElement_one.addEventListener('input', calculate)
amountElement_two.addEventListener('change', calculate)
currencyElement_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
  ;[currencyElement_one.value, currencyElement_two.value] = [
    currencyElement_two.value,
    currencyElement_one.value
  ]
  calculate()
})

calculate()
