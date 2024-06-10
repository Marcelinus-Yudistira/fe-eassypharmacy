<template>
    <div class="container mt-5">
        <div class="row">
            <h3 class="mb-3" :class="isWeb ? '' : 'fs-5'">Cart</h3>
            <div :class="isWeb ? 'col-8' : 'col-12'">
                <div class="card mb-3" style="max-width: auto;">
                    <div class="card-header fw-semibold bg-primary text-white" :class="isWeb ? 'fs-5' : 'fs-6'">Daftar Produk</div>
                    <ul v-if="cartMedicines.length > 0" class="list-group list-group-flush">
                        <div v-for="i in cartMedicines" :key="i.id">
                            <li class="list-group-item">
                                <div class="row g-0">
                                    <div class="col-md-2">
                                        <img :src="i.Medicine.image"
                                        class="img-fluid rounded mt-3" alt="..." style="max-height: 120px;">
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body pb-1">
                                            <div class="row">
                                                <div class="col-9">
                                                    <h5 class="card-title">{{ i.Medicine.name }}</h5>
                                                    <p class="card-text"><small class="text-body-secondary">{{ i.Medicine.description }}</small></p>
                                                    <p class="card-text">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                                                    <p class="card-text">Stok : {{ i.Medicine.stock }} buah</p>
                                                </div>
                                                <div class="col-3">
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
            <div :class="isWeb ? 'col-4' : 'col-12'">
                <div class="card border-primary mb-3" style="max-width: auto; height: fit-content;">
                <div class="card-header fs-5 fw-semibold">Detail Harga ({{ cartMedicines.length }} Produk)</div>
                <div class="card-body text-primary">
                    <h5 class="card-title">Sub Total Harga</h5>
                    <div v-for="i in cartMedicines" :key="i.id">
                        <div class="row">
                            <div class="col-6">
                                <p class="card-text">{{ i.Medicine.name }}</p>
                            </div>
                            <div class="col-2">
                                <p class="card-text text-end">Rp.</p>
                            </div>
                            <div class="col-4">
                                <p class="card-text text-end">{{ currencyFormat(i.subTotal ?? 0, false) }}</p>
                            </div>
                        </div>
                    </div>
                    <h5 class="card-title mt-5">Total Harga</h5>
                    <div class="row mb-3">
                        <div class="col-8">
                            <p class="card-text text-end">Rp.</p>
                        </div>
                        <div class="col-4">
                            <p class="card-text text-end fw-semibold">{{ currencyFormat(sumTotal ?? 0, false) }}</p>
                        </div>
                    </div>
                    <div v-if="cartMedicines.length >= 1">
                        <router-link to="/transaction"><button class="btn btn-primary w-100">Checkout</button></router-link>
                    </div>
                    <button v-else class="btn btn-primary w-100 is-disabled">Checkout</button>
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
        if(cartMedicines.value.length > 0){
            for(let i = 0; i < cartMedicines.value.length; i++){
                tempTotal += cartMedicines.value[i].subTotal
            }
            return tempTotal
        }
        else return 0
    })

    async function fetchData() {
        isLoading.value = true
        cartMedicines.value = await medicineStore.fetchCartItems();
        if(!auth.isLoggedIn){
            sessionStorage.setItem('errorMessage', 'Silahkan Login terlebih dahulu!');
            router.push({name: 'login'})
        }
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

