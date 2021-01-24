const path = require('path')
const express = require('express')
const app = express()

// for running on a server use the current assigned port or assisgn a default
const PORT = process.env.PORT || 3000

//
// middleware: will need for posting - required for all express for any request comming in

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const characters = [
  {
    name: 'Yoda',
    role: 'Jedi Master',
    forcePoints: 100000,
    age: 900,
    avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/baby-yoda-old-yoda-1574103229.jpg?crop=0.486xw:0.973xh;0.514xw,0&resize=480:*',
    routeName: 'yoda'
  },
  {
    name: 'Luke Skywalker',
    role: 'Jedi Master',
    forcePoints: 10000,
    age: 40,
    avatar: 'https://static.wikia.nocookie.net/star-wars-canon-extended/images/2/2c/Luke_Sky7.jpg/revision/latest/scale-to-width-down/340?cb=20180123070942',
    routeName: 'lukeskywalker'
  },
  {
    name: 'Princess Leia',
    role: 'General Princess',
    forcePoints: 100,
    age: 40,
    avatar: 'https://api.time.com/wp-content/uploads/2016/12/carrie-fisher-movies-2.jpg?w=600&quality=85',
    routeName: 'princessleia'
  }
]

/**
 * HTML ROUTES
 */
// request and response
// home route 

app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/index.html'))
})

app.get('/add', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/add.html'))
})

/**
 * API ROUTES
 */

// route to see /api/characters
// the api is convention to indicate that data is being returned

// /api/characters - show all character data
app.get('/api/characters', (req, res) => {
  res.json(characters)
})

// /api/characters/:routeName
app.get('/api/characters/:routeName', (req, res) => {
  
  console.log(req.params.routeName);
  const targetCharacter = req.params.routeName
  console.log(targetCharacter);

  const character = characters.find(character => {
    return character.routeName === targetCharacter
  })
  console.log(character);
  res.json(character)
})

// add new characters
//
// adding a new character, it is being sent via the body (using postman)

app.post('/api/characters/add', (req, res) => {
  const newCharacter = req.body

  // make new route name based on the name, remove spaces and lower case

  newCharacter.routeName = newCharacter.name.replace(/ /g, '').toLowerCase()

  characters.push(newCharacter)

  //
  // send a status back instead of just end
  res.status(200).send()
})

//
// start server so it starts and listens

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})