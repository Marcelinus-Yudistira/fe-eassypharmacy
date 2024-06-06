import {ref} from 'vue'
import {defineStore} from 'pinia'
import { useErrorHandlerStore } from '@/stores/errorHandler';

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const isLoggedIn = ref(false)
    const accessToken = ref('')

    const errorHandler = useErrorHandlerStore()

    const register = async (userData) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            await response.json();

            if (!response.ok) {
                let errorMessage = await errorHandler.errorChecker(response.status)
                throw new Error(response.message || errorMessage);
            }
        } catch (error) {
            console.error('Error registering users:', error);
            throw error;
        }
    }
    const login = async (credential) => {
        try {
          const response = await fetch('http://localhost:3000/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credential)
          });

            const responseData = await response.json();

            if (!response.ok) {
                let errorMessage = await errorHandler.errorChecker(response.status)
                throw new Error(responseData.message || errorMessage);
            }

            localStorage.setItem('token', responseData.data.accessToken);
            accessToken.value = responseData.data.accessToken;
            isLoggedIn.value = true;
            
            console.log(isLoggedIn.value,'<<<< loged in?s');
            
            return responseData;

        } catch (error) {
            throw error;
        }
    }
    const getUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          const responseData = await response.json()
          const data = responseData.data
          user.value = responseData.data
          return data;
      } catch (error) {
        throw error;
      }
    }
    const logout = () => {
        try {
            isLoggedIn.value = false;
            accessToken.value = '';
    
            localStorage.removeItem('token');
        } catch (error) {
            throw error;
        }
    }

    return {user, isLoggedIn, accessToken, register, login, logout, getUserData}
})

