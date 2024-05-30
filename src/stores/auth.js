import { defineStore } from 'pinia';

export const useAuthStore  = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isLoggedIn: false,
    accessToken: null,
    checkindong: 'marcel'
  }),
  getters: {
    getUser: state => state.user,
    getIsLoggedIn: state => state.isLoggedIn,
    getAccessToken: state => state.accessToken
  },
  actions: {
    async register(userData) {;
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

        localStorage.setItem('token', responseData.data.accessToken); 

        this.isLoggedIn = true;
        this.accessToken = responseData.data.accessToken;

        console.log('sampe sini');

        return responseData;
      } catch (error) {
          console.error('Error registering users:', error);
          console.log(error);
          throw error;
      }
    },
    async logout() {
      try {
        this.isLoggedIn = false;
        this.accessToken = null;

        localStorage.removeItem('token');
      } catch (error) {
        throw error;
      }
    }
  }
});
