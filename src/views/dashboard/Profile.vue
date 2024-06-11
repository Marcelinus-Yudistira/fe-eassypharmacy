<template>
   <div class="container">
        <div class="row" :class="isWeb ? '' : 'pe-3 ps-3'">
            <div class="mt-5" :class="isWeb ? 'col-3' : 'col-12'">
                <div class="row" style="justify-content: center;">
                    <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" class="img-fluid" alt="" :style="isWeb ? 'max-width: 200px;' : 'max-width: 120px;'">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row" :class="isWeb ? 'mt-3' : 'mobile-fs mt-1'">
                            <h5 class="text-center" :class="isWeb ? 'fs-5' : 'fs-6'">{{ userProfile?.username }}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row" :class="isWeb ? 'mt-1' : 'pe-3 ps-3'" >
                            <div class="col-3 fw-semibold" :class="isWeb ? '' : 'mobile-fs'">Email</div>
                            <div class="col-9" :class="isWeb ? '' : 'mobile-fs mb-0'">: {{ userProfile?.email }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row" :class="isWeb ? 'mt-1' : 'pe-3 ps-3'">
                            <div class="col-3 fw-semibold" :class="isWeb ? '' : 'mobile-fs'">Alamat</div>
                            <div class="col-9" :class="isWeb ? '' : 'mobile-fs mb-0'">: {{ userProfile?.address }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row" :class="isWeb ? 'mt-1' : 'pe-3 ps-3'">
                            <div class="col-3 fw-semibold" :class="isWeb ? '' : 'mobile-fs'">Telepon</div>
                            <div class="col-9" :class="isWeb ? '' : 'mobile-fs mb-0'">: {{ userProfile?.phoneNumber }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row mt-1">
                        </div>
                    </li>
                </ul>
            </div>
            <div :class="isWeb ? 'col-8 offset-1' : 'col-12 mt-3'">
                <div class="card mb-3" style="max-width: auto;">
                    <div class="card-header fs-5 fw-semibold bg-primary text-white" :class="isWeb ? 'fs-5' : 'fs-6'">Daftar Transaksi</div>
                    <ul v-if="orderMedicines.length > 0" class="list-group list-group-flush">
                        <div v-for="i in orderMedicines" :key="i.id">
                            <li class="list-group-item">
                                <div class="row">
                                    <div :class="isWeb ? 'col-9' : 'col-12'">
                                        <div class="row g-0" v-for="medicineOrder in i.MedicineOrders" :key="medicineOrder.id">
                                            <div class="row" :class="isWeb ? '' : 'mb-3' ">
                                                <div :class="isWeb ? 'col-md-3' : 'col-4'">
                                                    <img :src="medicineOrder.Medicine.image"
                                                    class="img-fluid rounded mt-3" alt="..." :style="isWeb ? 'max-width: 120px;' : 'max-width: 80px;'">
                                                </div>
                                                <div :class="isWeb ? 'col-md-9' : 'col-8'">
                                                    <div class="card-body pb-1">
                                                        <div class="row">
                                                            <div class="col">
                                                                <h5 class="card-title" :class="isWeb ? 'fs-5' : 'fs-6 mb-0'">{{ medicineOrder.Medicine.name }}</h5>
                                                                <p class="card-text" :class="isWeb ? '' : 'mobile-fs mb-1'"><small class="text-body-secondary">{{ medicineOrder.Medicine.description }}</small></p>
                                                                <p class="card-text" :class="isWeb ? '' : 'mobile-fs mb-1'">{{ currencyFormat(medicineOrder.Medicine.price ?? 0) }}</p>
                                                                <p class="card-text" :class="isWeb ? '' : 'mobile-fs'">Jumlah Pesanan : {{ medicineOrder.count }} buah</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="isWeb ? 'col-3 mt-2' : 'col-12'">
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-primary" :class="isWeb ? '' : 'mobile-btn'" data-bs-toggle="modal" data-bs-target="#orderDetailModal" @click="selectedItem(i)">Lihat Detail</button>
                                        </div>
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-success mt-2" :class="isWeb ? '' : 'mobile-btn'" data-bs-toggle="modal" data-bs-target="#cancelOrderModal" @click="selectedItem(i)">Batalkan Pesanan</button> 
                                        </div>
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-success mt-2" :class="isWeb ? '' : 'mobile-btn'" data-bs-toggle="modal" data-bs-target="#updateAddressModal" @click="getAddress(i)">Ubah Alamat</button>
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
        </div>
        <ModalComponent
            title="Detail Order" 
            approveButtonText="Bayar" 
            cancelButtonText="Batal"
            modalId="orderDetailModal"
            modalLabel="orderDetailModalLabel"
            :functionHandler="payOrder"
        >
            <div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h5 :class="isWeb ? 'fs-5' : 'fs-6'">Detail Pengiriman</h5>
                        <div class="row">
                            <div class="col-3">
                                <p :class="isWeb ? '' : 'mobile-fs mb-1'">{{ userProfile?.username }}</p>
                                <p :class="isWeb ? '' : 'mobile-fs mb-1'">{{ selectedOrder?.User?.phoneNumber }}</p>
                            </div>
                            <div class="col-6">
                                <p :class="isWeb ? '' : 'mobile-fs mb-1'">{{ selectedOrder?.address }}</p>
                            </div>
                            <div class="col-3">
                                <span class="badge text-bg-primary" :style="isWeb ? '' : 'font-size: 8px'">Belum Bayar</span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <h5 :class="isWeb ? 'fs-5' : 'fs-6'">Detail Pesanan</h5>
                        <div class="row mt-3">
                            <div :class="isWeb ? 'col-3' : 'col-6'"><h6 :class="isWeb ? '' : 'mobile-fs mb-1'">Produk</h6></div>
                            <div v-if="isWeb" class="col-3"><h6>Harga</h6></div>
                            <div class="col-2"><h6 :class="isWeb ? '' : 'mobile-fs mb-1'">Jumlah</h6></div>
                            <div class="col-4"><h6 :class="isWeb ? '' : 'mobile-fs mb-1'">SubTotal</h6></div>
                        </div>
                        <div class="row" v-for="i in medicineList" :key="i">
                            <div :class="isWeb ? 'col-3 vertical-center' : 'col-6'">
                                <p class="m-0" :class="isWeb ? '' : 'mobile-fs'">{{ i.Medicine.name }}</p>
                                <p v-if="!isWeb" class="m-0 mobile-fs mb-1">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                            </div>
                            <div class="col-3 vertical-center" v-if="isWeb">
                                <p class="m-0" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                            </div>
                            <div class="col-2 vertical-center">
                                <p class="m-0" :class="isWeb ? '' : 'mobile-fs'">{{ i.count }}</p>
                            </div>
                            <div class="col-4 vertical-center">
                                <p class="ms-auto" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(i.subTotal ?? 0) }}</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-8">
                                <h6 class="text-start me-5" :class="isWeb ? '' : 'mobile-fs'">Total Biaya :</h6>
                            </div>
                            <div class="col-4">
                                <h6 class="text-end" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(sumTotal ?? 0) }}</h6>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </ModalComponent>
        <ModalComponent
            title="Batalkan Pesanan" 
            approveButtonText="Batalkan Pesanan" 
            cancelButtonText="Tidak"
            modalId="cancelOrderModal"
            modalLabel="cancelOrderModalLabel"
            :functionHandler="cancelingOrder"
        >
            <div>
                <div class="row">
                    <p class="">Pesanan ini akan dibatalkan, apakah anda yakin?</p>
                </div>
                <div class="row">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <h6 class="">Detail Pesanan :</h6>
                            <div class="row mt-3">
                                <div v-if="isWeb" class="col-2"><h6>Gambar</h6></div>
                                <div :class="isWeb ? 'col-2':'col-5'"><h6 :class="isWeb ? '' : 'mobile-fs'">Nama</h6></div>
                                <div v-if="isWeb" class="col-2"><h6>Harga</h6></div>
                                <div class="col-2"><h6 :class="isWeb ? '' : 'mobile-fs'">Jumlah</h6></div>
                                <div :class="isWeb ? 'col-3':'col-5'"><h6 :class="isWeb ? '' : 'mobile-fs'">SubTotal</h6></div>
                            </div>
                            <div class="row" v-for="i in medicineList" :key="i">
                                <div v-if="isWeb" class="col-2">
                                    <img :src="i.Medicine.image" 
                                    class="img-fluid rounded p-1" alt="..." style="max-height: 120px;">
                                </div>
                                <div :class="isWeb ? 'col-2 vertical-center':'col-5'">
                                    <p class="m-0" :class="isWeb ? '' : 'mobile-fs'">{{ i.Medicine.name }}</p>
                                    <p v-if="!isWeb" class="m-0 mobile-fs mb-1">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                                </div>
                                <div v-if="isWeb" class="col-3 vertical-center">
                                    <p class="m-0">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                                </div>
                                <div class="col-2 vertical-center">
                                    <p class="m-0" :class="isWeb ? '' : 'mobile-fs'">{{ i.count }}</p>
                                </div>
                                <div :class="isWeb ? 'col-3 vertical-center':'col-5'">
                                    <p class="ms-auto" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(i.subTotal ?? 0) }}</p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-8">
                                    <h6 class="text-start me-5" :class="isWeb ? '' : 'mobile-fs'">Total Biaya :</h6>
                                </div>
                                <div class="col-4">
                                    <h6 class="text-end" :class="isWeb ? '' : 'mobile-fs'">{{ currencyFormat(sumTotal) }}</h6>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </ModalComponent>
        <ModalComponent
            title="Ubah Alamat" 
            approveButtonText="Ubah" 
            cancelButtonText="Batal"
            modalId="updateAddressModal"
            modalLabel="updateAddressModalLabel"
            :functionHandler="updateAddress"
            :isDisabled="isDisabled"
            :cancelHandler="reset"
        >
            <div>
                <div class="row"><h6 :style="isWeb ? '' : 'font-size: 14px;'">Alamat Pengiriman saat ini : </h6></div>
                <div class="row"><p :class="isWeb ? '' : 'mobile-fs'">{{ selectedOrder?.address }}</p></div>
                <div class="row mt-2">
                    <label for="inputString" class="form-label fw-semibold" :style="isWeb ? '' : 'font-size: 14px;'">Masukkan Alamat yang baru : </label>
                    <div class="col ps-3 ps-3">
                        <input type="text" class="form-control" id="inputString" v-model="newAddress" @input="checkAddressInput">
                    </div>
                    <p class="text-danger mt-2 text-small" v-if="!newAddressValid">Alamat baru tidak boleh kosong!</p>
                </div>
            </div>
        </ModalComponent>
        <ToastComponent :messages="messages" :status="true" idToast="successToast"></ToastComponent>
   </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ModalComponent from '../../components/ModalComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';
import { useAuthStore } from '@/stores/authentication';
import { useMedicineStore } from '@/stores/medicine';
import { useRoute, useRouter } from 'vue-router';
import { currencyFormat } from '@/common.js';

  const auth = useAuthStore()
  const medicineStore = useMedicineStore()
  const router = useRouter()

  const isLoading = ref(false);
  const selectedOrder = ref(null)
  const medicineList = ref([])
  const newAddress = ref('')
  const newAddressValid = ref(true)
  const isDisabled = ref(true)

  const selectedItem = (item) => {
    selectedOrder.value = item
    medicineList.value = [...item.MedicineOrders]
  }

  const getAddress = (item) => {
    selectedOrder.value = item
  }
  
  const orderMedicines = ref([])
  const userProfile = ref(null) 
  async function fetchData() {
    isLoading.value = true
    orderMedicines.value = await medicineStore.fetchOrder();
    userProfile.value = await auth.getUserData()
    console.log(auth.isLoggedIn, '<<<<<<<');
    if(!auth.isLoggedIn){
        sessionStorage.setItem('errorMessage', 'Silahkan Login terlebih dahulu!');
        router.push({name: 'login'})
    }
    isLoading.value = false
  }

  const sumTotal = computed(() => {
      let tempTotal = 0;
      if(medicineList.value.length > 0){
          for(let i = 0; i < medicineList.value.length; i++){
              tempTotal += medicineList.value[i].subTotal
          }
          return tempTotal
      }
      else return 0
  })

  const toastLiveExample = ref(null)
  const toastBootstrap = ref(null)
  const messages = ref('');

  const checkAddressInput = () => {
    newAddressValid.value = newAddress.value.trim() !== '';
    isDisabled.value = !newAddressValid.value
  };

  async function updateAddress() {
    let payload = {
        orderId : selectedOrder.value.id,
        address : newAddress.value
    }

    await medicineStore.changeAddressOrder(payload)
    messages.value = 'Alamat berhasil diubah!'
    toastLiveExample.value = document.getElementById('successToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastBootstrap.value.show()
    selectedOrder.value = null
    newAddress.value = ''
    await fetchData()

  }

  function reset() {
    newAddress.value = ''
  }

  async function cancelingOrder() {
    console.log(selectedOrder.value.id,'<<< id');
    await medicineStore.cancelOrder(selectedOrder.value.id)
    messages.value = 'Pesanan Berhasil dibatalkan!'
    toastLiveExample.value = document.getElementById('successToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastBootstrap.value.show()
    selectedOrder.value = null
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