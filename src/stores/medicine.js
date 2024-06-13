
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
            let url = `${import.meta.env.VITE_APP_DOMAIN}/medicines`;
            // let url = `${process.env.VUE_APP_BACKEND_URL}/medicines`;
        
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
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicines/${id}`);
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
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/categories`);
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
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicine-orders/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            })
            const responseData = await response.json()

            if (response.status == 401) {
                auth.isLoggedIn = false
                localStorage.removeItem('token');
                throw error
            }

            const data = responseData.data
            return data
        } catch (error) {
            console.error('Error fetching medicine items cart:', error);
            throw error;
        }
    };

    async function addCart(request) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicine-orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify(request)
            })
            await response.json()

            if (response.status == 401) {
                auth.isLoggedIn = false
                localStorage.removeItem('token');
                throw error
            }
        } catch (error) {
            console.error('Error adding cart:', error)
        }
    }

    async function checkProductInCart(id){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicine-orders/medicines/${id}/check`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            })
            const responseData = await response.json()
            if (response.status == 401) {
                auth.isLoggedIn = false
                localStorage.removeItem('token');
                throw error
            }
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error check product in cart:', error)
            throw error
        }
    }

    async function deleteCart(id){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicine-orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
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
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/medicine-orders/${request.medicineOrderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify({
                    quantity: request.quantity})
            })
            await response.json()
        } catch (error) {
            console.error('Error update quantity cart:', error)
        }
    }

    async function createOrder(orderIds){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify({
                    medicineOrderIds: orderIds})
            })
            await response.json()
        } catch (error) {
            console.error('Error store order medicine:', error)
        }
    }

    async function fetchOrder(){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            })
            const responseData = await response.json()
            if (response.status == 401) {
                auth.isLoggedIn = false
                localStorage.removeItem('token');
                throw error
            }
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error fetch order medicine:', error)
        }
    }

    async function changeAddressOrder(request){
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/orders/${request.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                body: JSON.stringify({
                    address: request.address})
            })
            await response.json()
        } catch (error) {
            console.error('Error update address order:', error)
        }
    }

    async function cancelOrder(id) {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/orders/${id}/cancel`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
            })
            await response.json()
        } catch (error) {
            console.error('Error canceling order', error)
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
        createOrder,
        fetchOrder,
        changeAddressOrder,
        cancelOrder
    }
})