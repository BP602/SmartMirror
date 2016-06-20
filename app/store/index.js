import { EventEmitter } from 'events'
import Firebase from 'firebase'

const db = new Firebase("https://smart-mirror.firebaseio.com/")
const weatherRef = db.child('weather')
const usersRef = db.child('users')
const store = new EventEmitter()

let weather = {}
let users = {}

db.on('value', (snapshot) => {
  var dbData = snapshot.val()
  if (dbData) {
    weather = dbData.weather
    users = dbData.users
    store.emit('data-updated', weather, users)
  }
})

export default store