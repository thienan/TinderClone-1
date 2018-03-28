const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ref = admin.database().ref()

exports.createUserAccount = functions.auth.user().onCreate(event => {
  const { uid, email, photoURL, displayName } = event.data
  const newUserRef = ref.child(`users/${uid}`)
  return newUserRef.set({ displayName, email, photoURL })
})