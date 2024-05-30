
import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useAuthStore} from '@/stores/authentication'

export const useMedicineStore = defineStore('medicineStore', () => {
    const medicineItems = ref([])
    const isLoading=ref(false)

    const pagination=ref(null)

    const auth = useAuthStore()

    const fetchMedicineItems = async (request) => {
        try {
            let url = 'http://localhost:3000/api/v1/medicines';
        
            if (request) {
                const queryString = new URLSearchParams(request).toString();
                url += `?${queryString}`;
            }

            const response = await fetch(url);
            const responseData = await response.json()
            const data = responseData.data.medicines
            pagination.value = responseData.data.pagination
            return data;
        } catch (error) {
            console.error('Error fetching medicine items:', error);
            throw error;
        }
    };
    const getDetail = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/medicines/${id}`);
            const responseData = await response.json()
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error fetching medicine item:', error);
            throw error;
        }
    };

    const getCategory = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/categories`);
            const responseData = await response.json()
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error fetching categories items:', error);
            throw error;
        }
    }
    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/medicine-orders/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                  },
            })
            const responseData = await response.json()
            const data = responseData.data
            return data
        } catch (error) {
            console.error('Error fetching medicine items cart:', error);
            throw error;
        }
    };

    async function addCart(request) {
        try {
            const response = await fetch('http://localhost:3000/api/v1/medicine-orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                  },
                body: JSON.stringify(request)
            })
            await response.json()
        } catch (error) {
            console.error('Error adding cart:', error)
        }
    }

    async function checkProductInCart(id){
        try {
            const response = await fetch(`http://localhost:3000/api/v1/medicine-orders/medicines/${id}/check`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                  },
            })
            const responseData = await response.json()
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error check product in cart:', error)
        }
    }

    async function deleteCart(id){
        try {
            const response = await fetch(`http://localhost:3000/api/v1/medicine-orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                  },
            })
            const responseData = await response.json()
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error delete product in cart:', error)
        }
    }
    
    async function updateCountOrder(request){
        try {
            const response = await fetch(`http://localhost:3000/api/v1/medicine-orders/${request.medicineOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                  },
                body: JSON.stringify({
                    quantity: request.quantity})
            })
            await response.json()
        } catch (error) {
            console.error('Error update quantity cart:', error)
        }
    }

    return {
        isLoading, 
        medicineItems, 
        pagination, 
        fetchMedicineItems, 
        getDetail, 
        getCategory,
        fetchCartItems, 
        addCart, 
        checkProductInCart,
        deleteCart, 
        updateCountOrder,
    }
})