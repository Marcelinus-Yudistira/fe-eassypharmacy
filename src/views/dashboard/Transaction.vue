<template>
    <div class="container">
        <h4>Checkout</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <h5 class="mt-3">Alamat Pengiriman</h5>
                <div class="row">
                    <div class="col-3">
                        <p>{{ userProfile?.username }}</p>
                        <p>{{ userProfile?.phoneNumber }}</p>
                    </div>
                    <div class="col-6">
                        <p>{{ userProfile?.address }}</p>
                    </div>
                    <div class="col-3">
                        <span class="badge text-bg-primary">Belum Checkout</span>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row"><h5 class="mt-3">Produk</h5></div>
                <div class="row mt-3">
                    <div class="col-3"><h6>Gambar</h6></div>
                    <div class="col-3"><h6>Nama</h6></div>
                    <div class="col-2"><h6>Harga</h6></div>
                    <div class="col-2"><h6>Jumlah</h6></div>
                    <div class="col-2"><h6>SubTotal</h6></div>
                </div>
                <div class="row" v-for="i in medicineCart" :key="i">
                    <div class="col-3">
                        <img :src="i.Medicine.image" 
                        class="img-fluid rounded p-1" alt="..." style="max-height: 120px;">
                    </div>
                    <div class="col-3 vertical-center">
                        <p class="m-0">{{ i.Medicine.name }}</p>
                    </div>
                    <div class="col-2 vertical-center">
                        <p class="m-0">Rp. {{ i.Medicine.price }},00</p>
                    </div>
                    <div class="col-2 vertical-center">
                        <p class="m-0">{{ i.count }}</p>
                    </div>
                    <div class="col-2 vertical-center">
                        <p class="text-end">Rp. {{ i.subTotal }},00</p>
                    </div>
                </div>
                <div class="row mt-3 mb-3">
                  <div class="col-10">
                    <h6 class="text-end me-5">Total Biaya :</h6>
                  </div>
                  <div class="col-2">
                    <h6>Rp. {{ sumTotal }},00</h6>
                  </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <h5 class="mt-3">Pengiriman</h5>
                    <div class="col-3 mt-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png" 
                            class="img-fluid rounded" alt="..." style="max-height: 80px;">
                    </div>
                    <div class="col-5">
                        <h6>Pengiriman Reguler</h6>
                        <p class="mb-1">Jakarta - Surabaya</p>
                        <p class="mb-1"><span class="fw-semibold">Estimasi </span>: 2-3 Hari</p>
                        <p class="mb-1"><span class="fw-semibold">Biaya Pengiriman </span>: Rp. 2500,00</p>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <h5 class="mt-3">Pembayaran</h5>
                    <div class="col-3 mt-3">
                        <img src="https://karir.sari-mutiara.ac.id/asset/foto_berita/bd03016e20748bbd8e8e6f70022d6611.jpg" 
                            class="img-fluid rounded" alt="..." style="max-height: 150px;">
                    </div>
                    <div class="col-5">
                        <h6>Enabling Talent, Passion, Integrity and Accountability</h6>
                        <p>	Menyediakan layanan perbankan universal di Indonesia secara terpadu sabagai perusahaan dengan kinerja unggul di kawasan ASEAN dan kawasan utama lainnya, serta mendukung percepatan integrasi ASEAN dan menghubungkannya dengan kawasan lain</p>
                    </div>
                </div>
            </li>
  
        </ul>
        <div class="row mt-2 mb-5">
            <div class="col-3 offset-6">
              <router-link to="/cart"><button class="btn btn-outline-primary w-100">Batal</button></router-link>
            </div>
            <div class="col-3">
                <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#checkoutModal">Buat Pesanan</button>
            </div>
        </div>
        <ModalComponent
          title="Checkout Produk" 
          approveButtonText="Checkout" 
          cancelButtonText="Batal"
          modalId="checkoutModal"
          modalLabel="checkoutModalLabel"
          :functionHandler="checkout"
        >
          <div>
            Apakah anda yakin untuk membuat pesanan? {{selectedItem?.Medicine?.name}} dari Cart?
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
  
  const auth = useAuthStore()
  const medicineStore = useMedicineStore()
  const router = useRouter()
  
  const isLoading = ref(false);
  
  const medicineCart = ref([])
  const userProfile = ref(null) 
  async function fetchData() {
    isLoading.value = true
    medicineCart.value = await medicineStore.fetchCartItems();
    userProfile.value = await auth.getUserData()
    isLoading.value = false
  }
  
  const sumTotal = computed(() => {
      let tempTotal = 0;
      if(medicineCart.value.length > 0){
          for(let i = 0; i < medicineCart.value.length; i++){
              tempTotal += medicineCart.value[i].subTotal
          }
          return tempTotal
      }
      else return 0
  })
  
  const toastLiveExample = ref(null)
  const toastBootstrap = ref(null)
  const messages = ref('');
  
  async function checkout() {
    const orderIds = medicineCart.value.map(item => item.id);
    if(orderIds.length > 0){
      await medicineStore.createOrder(orderIds)
    }
    messages.value = 'Pesanan Anda berhasil dibuat!'
    sessionStorage.setItem('successMessage', messages.value);
    toastLiveExample.value = document.getElementById('successToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastBootstrap.value.show()
    router.push('/home');
  }
  
  onMounted(async () => {
    await fetchData()
  })
  
  </script>