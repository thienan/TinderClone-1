import { fbLoginPermissions } from '../../constants/index'
import firebase from 'react-native-firebase'
import Auth from '../../config/auth'
export const handleFbLogin = () => {
  debugger
  return Auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      debugger
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token)).then(
          (data) => { debugger }
        ).catch(
          (error) => { debugger }
        )
    })
    .catch((err) => this.onError && this.onError(err))
  }