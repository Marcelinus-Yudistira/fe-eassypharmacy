import { defineStore } from 'pinia';

export const useAuthStore  = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isLoggedIn: false,
    accessToken: null
  }),
  getters: {
    getUser: state => state.user,
    // isLoggedIn: state => state.isLoggedIn,
    isLoggedIn(){
      return false
    },
    accessToken: state => state.accessToken
  },
  actions: {
    async register(userData) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        await response.json();
      } catch (error) {
          console.error('Error registering users:', error);
          throw error;
      }
    },
    async login(credential) {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credential)
        });
        const responseData = await response.json();
        console.log(responseData,'<< response login');

        localStorage.setItem('token', responseData.data.accessToken); 

        this.$patch({
          accessToken: responseData.data.accessToken,
          isLoggedIn: true
        });


        return responseData;
      } catch (error) {
          console.error('Error registering users:', error);
          console.log(error);
          throw error;
      }
    },
    async logout() {
      try {
        this.$patch({
          accessToken: null,
          isLoggedIn: false
        });

        localStorage.removeItem('token');
      } catch (error) {
        throw error;
      }
    }
  },
});
