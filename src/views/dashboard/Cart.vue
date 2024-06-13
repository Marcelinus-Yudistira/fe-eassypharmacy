<template>
    <div class="container mt-5">
        <div class="row" :class="isWeb ? '' : 'pe-2 ps-2'">
            <h3 class="mb-3" :class="isWeb ? '' : 'fs-6'">Cart</h3>
            <div :class="isWeb ? 'col-8' : 'col-12'">
                <div class="card mb-3" style="max-width: auto;">
                    <div class="card-header fw-semibold bg-primary text-white" :class="isWeb ? 'fs-5' : 'fs-6'">Daftar Produk</div>
                    <ul v-if="cartMedicines?.length > 0" class="list-group list-group-flush">
                        <div v-for="i in cartMedicines" :key="i.id">
                            <li class="list-group-item">
                                <div class="row g-0">
                                    <div :class="isWeb ? 'col-md-2' : 'col-4'">
                                        <img :src="i.Medicine.image"
                                        class="img-fluid rounded mt-3" alt="..." style="max-height: 120px;">
                                    </div>
                                    <div :class="isWeb ? 'col-md-10' : 'col-8'">
                                        <div class="card-body pb-1">
                                            <div class="row">
                                                <div class="col-9" :class="isWeb ? 'col-9' : 'col-12'">
                                                    <h5 v-if="isWeb" class="card-title">{{ i.Medicine.name }}</h5>
                                                    <h6 v-else class="card-title">{{ i.Medicine.name }}</h6>
                                                    <p class="card-text mobile-fs" :class="!isWeb ? 'mb-1' : ''"><small class="text-body-secondary">{{ i.Medicine.description }}</small></p>
                                                    <p class="card-text mobile-fs" :class="!isWeb ? 'mb-1' : ''">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                                                    <p class="card-text mobile-fs" :class="!isWeb ? 'mb-1' : ''">Stok : {{ i.Medicine.stock }} buah</p>
                                                </div>
                                                <div :class="isWeb ? 'col-3' : ''">
                                                    <div v-if="isWeb">
                                                        <div class="row">
                                                            <button class="btn btn-sm btn-outline-primary" @click="goToDetail(i.Medicine.id);">Lihat Detail</button>
                                                        </div>
                                                        <div class="row">
                                                            <button class="btn btn-sm btn-outline-success mt-2" @click="updateQuantity(i)">Simpan</button>
                                                        </div>
                                                        <div class="row mt-4" style="justify-content: end;">
                                                            <div class="col-10" style="width: fit-content; color: #808080;">
                                                                <span class="fs-4" :class="i.count < 2 ? 'is-disabled' : ''" type="button" @click="i.count--"><i class="bi bi-dash-square"></i></span>
                                                                <span class="mx-2 fs-5">{{ i.count }}</span>
                                                                <span class="fs-4" :class="i.Medicine.stock == i.count ? 'is-disabled' : ''" type="button" @click="i.count++"><i class="bi bi-plus-square"></i></span>
                                                            </div>
                                                            <div class="col-2 me-2" style="align-content: center;">
                                                                <span class="text-danger fs-5 is-clickable" data-bs-toggle="modal" data-bs-target="#deleteCartModal"><i class="bi bi-trash3-fill" @click="setSelectedItem(i)"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <div class="row mt-2 mb-2" style="justify-content: end;">
                                                            <div class="col-10" style="width: fit-content; color: #808080;">
                                                                <span class="fs-5" :class="i.count < 2 ? 'is-disabled' : ''" type="button" @click="i.count--"><i class="bi bi-dash-square"></i></span>
                                                                <span class="mx-2 fs-5">{{ i.count }}</span>
                                                                <span class="fs-4" :class="i.Medicine.stock == i.count ? 'is-disabled' : ''" type="button" @click="i.count++"><i class="bi bi-plus-square"></i></span>
                                                            </div>
                                                            <div class="col-2 me-2" style="align-content: center;">
                                                                <span class="text-danger fs-5 is-clickable" data-bs-toggle="modal" data-bs-target="#deleteCartModal"><i class="bi bi-trash3-fill" @click="setSelectedItem(i)"></i></span>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <button class="btn btn-sm btn-outline-primary mobile-btn" @click="goToDetail(i.Medicine.id);">Lihat Detail</button>
                                                        </div>
                                                        <div class="row">
                                                            <button class="btn btn-sm btn-outline-success mt-2 mobile-btn" @click="updateQuantity(i)">Simpan</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                    <ul v-else class="list-group list-group-flush">
                        <li class="list-group-item">Belum ada data</li>
                    </ul>
                </div>
            </div>
            <div :class="isWeb ? 'col-4' : 'col-12 mt-3'">
                <div class="card border-primary mb-3" style="max-width: auto; height: fit-content;">
                <div class="card-header fw-semibold" :class="isWeb ? 'fs-5' : 'fs-6' ">Detail Harga ({{ cartMedicines?.length }} Produk)</div>
                <div class="card-body text-primary">
                    <h5 class="card-title" :class="isWeb ? 'fs-5' : 'fs-6'">Sub Total Harga</h5>
                    <div v-for="i in cartMedicines" :key="i.id">
                        <div class="row">
                            <div class="col-6">
                                <p class="card-text" :class="isWeb ? '' : 'mobile-fs'">{{ i.Medicine.name }}</p>
                            </div>
                            <div class="col-2">
                                <p class="card-text text-end" :class="isWeb ? '' : 'mobile-fs'">Rp.</p>
                            </div>
                            <div class="col-4">
                                <p class="card-text text-end" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(i.subTotal ?? 0, false) }}</p>
                            </div>
                        </div>
                    </div>
                    <h5 class="card-title" :class="isWeb ? 'fs-5 mt-5' : 'fs-6 mt-2'">Total Harga</h5>
                    <div class="row mb-3">
                        <div class="col-8">
                            <p class="card-text text-end" :class="isWeb ? '' : 'mobile-fs'">Rp.</p>
                        </div>
                        <div class="col-4">
                            <p class="card-text text-end fw-semibold" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(sumTotal ?? 0, false) }}</p>
                        </div>
                    </div>
                    <div v-if="cartMedicines?.length >= 1">
                        <router-link to="/transaction"><button class="btn btn-primary w-100" :class="isWeb ? '' : 'mobile-btn'">Checkout</button></router-link>
                    </div>
                    <button v-else class="btn btn-primary w-100 is-disabled" :class="isWeb ? '' : 'mobile-btn'">Checkout</button>
                </div>
                </div>
            </div>
        </div>
        <ModalComponent
            title="Hapus Produk" 
            approveButtonText="Hapus" 
            cancelButtonText="Batal"
            modalId="deleteCartModal"
            modalLabel="deleteCartLabel"
            :functionHandler="removeFromCart"
        >
            <div>
                Apakah anda yakin untuk menghapus Produk {{selectedItem?.Medicine?.name}} dari Cart?
            </div>
        </ModalComponent>
        <ToastComponent :messages="messages" :status="true" idToast="successToast"></ToastComponent>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import ModalComponent from '../../components/ModalComponent.vue';
    import { useMedicineStore } from '@/stores/medicine';
    import ToastComponent from '../../components/ToastComponent.vue';
    import { useAuthStore } from '@/stores/authentication';
    import { useRouter } from 'vue-router';
    import { currencyFormat } from '@/common.js';

    const medicineStore = useMedicineStore()
    const selectedItem = ref(null);
    const isLoading = ref(false);
    const cartMedicines = ref([]);
    const auth = useAuthStore()
    const router = useRouter()

    const setSelectedItem = (item) => {
        selectedItem.value = item;
    }

    function goToDetail(id) {
        router.push({name: 'detailMedicine', params: {id: id}})
    }

    const removeFromCart = async () => {
        isLoading.value = true
        await medicineStore.deleteCart(selectedItem.value.id)
        isLoading.value = false
        await fetchData()
        selectedItem.value = null;
        messages.value = 'Berhasil Mengeluarkan Produk dari Cart'
        toastLiveExample.value = document.getElementById('successToast')
        toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
        toastBootstrap.value.show()
    }

    const sumTotal = computed(() => {
        let tempTotal = 0;
        if(cartMedicines.value?.length > 0){
            for(let i = 0; i < cartMedicines.value?.length; i++){
                tempTotal += cartMedicines.value[i].subTotal
            }
            return tempTotal
        }
        else return 0
    })

    async function fetchData() {
        isLoading.value = true
        try{
            cartMedicines.value = await medicineStore.fetchCartItems();
        }catch(err){
            sessionStorage.setItem('errorMessage', 'Silahkan Login terlebih dahulu!');
            router.push({name: 'login'})
            isLoading.value = false
        }
        // if(!auth.isLoggedIn && !localStorage.getItem('token')){
        //     sessionStorage.setItem('errorMessage', 'Silahkan Login terlebih dahulu!');
        //     router.push({name: 'login'})
        // }
        isLoading.value = false
    }

    const toastLiveExample = ref(null)
    const toastBootstrap = ref(null)
    const messages = ref('');

    const updateQuantity = async (item) => {
        let payload = {
            medicineOrderId : item.id,
            quantity: item.count
        }
        await medicineStore.updateCountOrder(payload)
        
        messages.value = 'Berhasil Mengubah Jumlah Pesanan'
        toastLiveExample.value = document.getElementById('successToast')
        toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
        toastBootstrap.value.show()
        await fetchData()
    }

    onMounted(async () => {
        await fetchData()
    })

    const width = ref(window.innerWidth);
    const isWeb = ref(window.innerWidth > 767 ? true : false)

    window.addEventListener('resize', () => {
        width.value = window.innerWidth;
        isWeb.value = window.innerWidth > 767 ? true : false
    });
</script>

