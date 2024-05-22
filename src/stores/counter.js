import { defineStore } from 'pinia';

export const useAuthStore  = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isLoggedIn: false,
    accessToken: null
  }),
  actions: {
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

        this.state.isLoggedIn = true;
        this.state.accessToken = responseData.data.accessToken;

        return responseData;
      } catch (error) {
          console.error('Error registering users:', error);
          console.log(error);
          throw error;
      }
    }
  },
});
