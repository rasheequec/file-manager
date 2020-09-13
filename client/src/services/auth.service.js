import { USER_TOKEN } from '../utilities/constants'
const IsLoggedIn = () => {
  if (localStorage.getItem(USER_TOKEN)) {
    return true;
  } else {
    return false
  }
};

const AuthService = { IsLoggedIn };
export default AuthService;