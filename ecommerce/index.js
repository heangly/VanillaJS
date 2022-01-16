const express = require('express')
require('colors')

const app = express()
const PORT = 4000

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method='POST'>
        <input name='email' placeholder='email'/>
        <input name='password' placeholder='password'/>
        <input name='passwordConfirmation' placeholder='password confirmation'/>
        <button>Sign Up </button>
      </form>
    </div>
  `)
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Account created')
})

app.listen(PORT, () =>
  console.log(`=> Server is running on port ${PORT} <=`.black.bgCyan)
)
