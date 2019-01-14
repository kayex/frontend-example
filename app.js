class User {
  constructor(email, name) {
    this.email = email
    this.name = name
  }
}

// getUser fetches a test user with the provided id and returns a Promise that resolves into
// an instance of the User class. Error handling is omitted.
function getUser(id) {
  const url = 'https://jsonplaceholder.typicode.com/users/' + id

  return fetch(url)
    // Decode from JSON
    .then(response => response.json())

    // Marshal decoded object into our own User class
    .then(json => new Promise((resolve, reject) => {
      resolve(new User(json.email, json.name))
    }))
}

// renderUser populates the name and email elements using data from the provided User object.
function renderUser(user) {
  const emailElement = document.getElementById('email')
  const nameElement = document.getElementById('name')

  emailElement.innerHTML = user.email
  nameElement.innerHTML = user.name
}

function randomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * max)
}

// Set up a click event listener on the fetch button.
document.getElementById('fetch').onclick = () => {
  // We know there are exactly 10 test users, so we'll choose one randomly.
  const userId = randomNumberBetween(1, 10)

  getUser(userId).then(renderUser)
}
