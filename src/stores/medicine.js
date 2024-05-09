
import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useMedicineStore = defineStore('medicineStore', () => {
    const medicineItems = ref([])

    const fetchMedicineItems = async (accessToken) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/medicines',{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                  }
            });
            const responseData = await response.json()
            const data = responseData.data
            return data;
        } catch (error) {
            console.error('Error fetching medicine items:', error);
            throw error;
        }
    };

    const fetchMedicineItemsFilter = async (name) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/medicines',{
                params: {
                    search: name
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching medicine items:', error);
            throw error;
        }
    };

    const getDetail = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/medicines/${id}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching menu items:', error);
            throw error;
        }
    };

    // async function createMenu(newMenu) {
    //     try {
    //         const currentMenuItems = await fetchMenuItems();
    //         const currentMenuCount = currentMenuItems.length + 1;

    //         newMenu.id = currentMenuCount.toString();
    //         const response = await fetch('http://localhost:3000/menu', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(newMenu)
    //         })
    //         await response.json()
    //     } catch (error) {
    //         console.error('Error creating menu:', error)
    //     }
    // }

    // async function editMenu(menu) {
    //     try {
    //         const response = await fetch(`http://localhost:3000/menu/${menu.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(menu)
    //         });
    //         await response.json();
    //         await fetchMenuItems();
    //     } catch (error) {
    //         console.error('Error editing menu:', error);
    //     }
    // }

    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/carts');
            return await response.json();
        } catch (error) {
            console.error('Error fetching medicine items:', error);
            throw error;
        }
    };

    async function addCart(medicine) {
        try {
            const currentCart = await fetchCartItems();
            const currentCartCount = currentCart.length + 1;

            medicine.id = currentCartCount.toString();
            const response = await fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(medicine)
            })
            await response.json()
        } catch (error) {
            console.error('Error creating menu:', error)
        }
    }

    return {medicineItems, fetchMedicineItems, getDetail,fetchMedicineItemsFilter, fetchCartItems, addCart}
    // return {menuItems, fetchMenuItems, createMenu, editMenu, getDetail}
})