import { createStore } from 'vuex';
import { auth } from './store/auth';

const store = createStore({
  modules: {
    auth: {
      ...auth,
      namespaced: true 
    }
  }
});

export default store;
