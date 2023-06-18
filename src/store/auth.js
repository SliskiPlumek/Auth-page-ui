import store from '../store'

const initialState = {
    isAuth: localStorage.getItem('isAuth') === 'true',
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  };
  
  export const auth = {
    state: { ...initialState },
    mutations: {
      setIsAuth(state, value) {
        state.isAuth = value;
        localStorage.setItem('isAuth', value);
      },
      setToken(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
      },
      setUserId(state, value) {
        state.userId = value;
        localStorage.setItem('userId', value);
      },
      clearAuthData(state) {
        state.isAuth = false;
        state.token = null;
        state.userId = null;
  
        localStorage.removeItem('isAuth');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    }
  };
  
console.log(store)