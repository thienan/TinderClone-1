const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ref = admin.database().ref()

exports.createUserIndex = functions.database.ref('users/{userId}').onCreate(event => {
  const user = event.data.val()
  const newGenderRef = ref.child(`${user.gender}/${event.params.userId}`)
  return newGenderRef.set(user)
})