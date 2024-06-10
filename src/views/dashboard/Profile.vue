<template>
   <div class="container">
        <div class="row">
            <div class="col-3 mt-5">
                <div class="row" style="justify-content: center;">
                    <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" class="img-fluid" alt=""  style="max-width: 200px;">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row mt-3">
                            <h5 class="text-center">{{ userProfile?.username }}</h5>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row mt-1">
                            <div class="col-3 fw-semibold">Email</div>
                            <div class="col-9">: {{ userProfile?.email }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row mt-1">
                            <div class="col-3 fw-semibold">Alamat</div>
                    <div class="col-9">: {{ userProfile?.address }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row mt-1">
                            <div class="col-3 fw-semibold">Telepon</div>
                            <div class="col-9">: {{ userProfile?.phoneNumber }}</div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <div class="row mt-1">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col-8 offset-1">
                <div class="card mb-3" style="max-width: auto;">
                    <div class="card-header fs-5 fw-semibold bg-primary text-white">Daftar Transaksi</div>
                    <ul v-if="orderMedicines.length > 0" class="list-group list-group-flush">
                        <div v-for="i in orderMedicines" :key="i.id">
                            <li class="list-group-item">
                                <div class="row">

                                    <div class="col-9">
    
                                        <div class="row g-0" v-for="medicineOrder in i.MedicineOrders" :key="medicineOrder.id">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <img :src="medicineOrder.Medicine.image"
                                                    class="img-fluid rounded mt-3" alt="..." style="max-height: 120px;">
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="card-body pb-1">
                                                        <div class="row">
                                                            <div class="col">
                                                                <h5 class="card-title">{{ medicineOrder.Medicine.name }}</h5>
                                                                <p class="card-text"><small class="text-body-secondary">{{ medicineOrder.Medicine.description }}</small></p>
                                                                <p class="card-text">{{ currencyFormat(medicineOrder.Medicine.price ?? 0) }}</p>
                                                                <p class="card-text">Jumlah Pesanan : {{ medicineOrder.count }} buah</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3 mt-2">
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#orderDetailModal" @click="selectedItem(i)">Lihat Detail</button>
                                        </div>
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-success mt-2"data-bs-toggle="modal" data-bs-target="#cancelOrderModal" @click="selectedItem(i)">Batalkan Pesanan</button> 
                                        </div>
                                        <div class="row ps-2 pe-2">
                                            <button class="btn btn-sm btn-outline-success mt-2" data-bs-toggle="modal" data-bs-target="#updateAddressModal" @click="getAddress(i)">Ubah Alamat</button>
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
                        <h5 class="">Detail Pengiriman</h5>
                        <div class="row">
                            <div class="col-3">
                                <p>{{ userProfile?.username }}</p>
                                <p>{{ selectedOrder?.User?.phoneNumber }}</p>
                            </div>
                            <div class="col-6">
                                <p>{{ selectedOrder?.address }}</p>
                            </div>
                            <div class="col-3">
                                <span class="badge text-bg-primary">Belum Bayar</span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item">
                        <h5 class="">Detail Pesanan</h5>
                        <div class="row mt-3">
                            <!-- <div class="col-3"><h6>Gambar</h6></div> -->
                            <div class="col-3"><h6>Nama</h6></div>
                            <div class="col-3"><h6>Harga</h6></div>
                            <div class="col-2"><h6>Jumlah</h6></div>
                            <div class="col-4"><h6>SubTotal</h6></div>
                        </div>
                        <div class="row" v-for="i in medicineList" :key="i">
                            <!-- <div class="col-3">
                                <img :src="i.Medicine.image" 
                                class="img-fluid rounded p-1" alt="..." style="max-height: 120px;">
                            </div> -->
                            <div class="col-3 vertical-center">
                                <p class="m-0">{{ i.Medicine.name }}</p>
                            </div>
                            <div class="col-3 vertical-center">
                                <p class="m-0">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                            </div>
                            <div class="col-2 vertical-center">
                                <p class="m-0">{{ i.count }}</p>
                            </div>
                            <div class="col-4 vertical-center">
                                <p class="ms-auto">{{ currencyFormat(i.subTotal ?? 0) }}</p>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-8">
                                <h6 class="text-start me-5">Total Biaya :</h6>
                            </div>
                            <div class="col-4">
                                <h6 class="text-end">{{ currencyFormat(sumTotal ?? 0) }}</h6>
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
                                <div class="col-2"><h6>Gambar</h6></div>
                                <div class="col-3"><h6>Nama</h6></div>
                                <div class="col-2"><h6>Harga</h6></div>
                                <div class="col-2"><h6>Jumlah</h6></div>
                                <div class="col-3"><h6>SubTotal</h6></div>
                            </div>
                            <div class="row" v-for="i in medicineList" :key="i">
                                <div class="col-2">
                                    <img :src="i.Medicine.image" 
                                    class="img-fluid rounded p-1" alt="..." style="max-height: 120px;">
                                </div>
                                <div class="col-2 vertical-center">
                                    <p class="m-0">{{ i.Medicine.name }}</p>
                                </div>
                                <div class="col-3 vertical-center">
                                    <p class="m-0">{{ currencyFormat(i.Medicine.price ?? 0) }}</p>
                                </div>
                                <div class="col-2 vertical-center">
                                    <p class="m-0">{{ i.count }}</p>
                                </div>
                                <div class="col-3 vertical-center">
                                    <p class="ms-auto">{{ currencyFormat(i.subTotal ?? 0) }}</p>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-8">
                                    <h6 class="text-start me-5">Total Biaya :</h6>
                                </div>
                                <div class="col-4">
                                    <h6 class="text-end">{{ currencyFormat(sumTotal) }}</h6>
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
                <div class="row"><h6>Alamat Pengiriman saat ini : </h6></div>
                <div class="row"><p>{{ selectedOrder?.address }}</p></div>
                <div class="row mt-2">
                    <label for="inputString" class="form-label fw-semibold">Masukkan Alamat yang baru : </label>
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
import { defineProps, defineEmits  } from 'vue';
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
</script>