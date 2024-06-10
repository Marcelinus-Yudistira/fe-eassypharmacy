<template>
  <div  class="container">
    <div class="row">
      <div :class="isMobile ? '' : 'col-6'">
          <div class="row"><i class="bi bi-circle m-fit-content" :class="isMobile ? 'mobile-fs pe-0' : 'mr-4'"></i>
            <h5 v-if="!isMobile" class="m-fit-content">{{ categorySelect?.name ? categorySelect.name : 'Semua Obat' }}</h5>
            <h6 v-else class="m-fit-content">{{ categorySelect?.name ? categorySelect.name : 'Semua Obat' }}</h6>
          </div>
      </div>
      <div class="text-end" :class="isMobile ? 'mobile-fs' : 'col-6'"><p>Menampilkan {{ medicines.length }} dari {{ totalData }} Produk Obat</p></div>
    </div>
    <div class="medicine-list">
      <div v-if="!isLoading">
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div v-for="medicine in medicines" :key="medicine.id" >
            <div class="col">
              <div class="card">
                <img v-if="!isMobile" :src="medicine.image" class="card-img-top" alt="..." style="object-fit: cover; height: 150px;">
                <img v-else :src="medicine.image" class="card-img-top" alt="..." style="object-fit: cover; height: 100px;">
                <div class="card-body bg-dark-subtle m-rounded-bottom">
                  <h5 v-if="!isMobile" class="card-title">{{ medicine.name }}</h5>
                  <h6 v-else class="card-title">{{ medicine.name }}</h6>
                  <p class="card-text" :class="isMobile ? 'mobile-fs mb-0' : ''">Deskripsi : {{ medicine.description }}</p>
                  <p class="card-text fw-medium" :class="isMobile ? 'mobile-fs mb-2' : ''">Harga : {{ currencyFormat(medicine.price ?? 0) }}</p>
                  <div class="row">
                    <div class="col-4">
                      <button v-if="isLoggedIn" class="btn btn-primary w-100 ps-2" :class="isMobile ? 'mobile-btn' : ''" data-bs-toggle="modal" data-bs-target="#cartModal" @click="selectedItem(medicine)"><i class="bi bi-cart"></i></button>
                      <button v-else class="btn btn-primary w-100 ps-2" :class="isMobile ? 'mobile-btn' : ''" data-bs-toggle="modal" data-bs-target="#mustLoginModal" @click="selectedItem(medicine)"><i class="bi bi-cart"></i></button>
                    </div>
                    <div class="col-8 ps-0">
                      <button @click="selectMedicine(medicine)" :class="isMobile ? 'mobile-btn ' : ''" class="btn btn-primary w-100">Detail Produk</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row row-cols-1 row-cols-md-4 g-4">
          <div v-for="i in 8" :key="i">
            <div class="col">
              <div class="card">
                <!-- <div class="bg-secondary p-5 border border-secondary card-img-top placeholder-glow" style="height: 150px;"></div> -->
                <div class="col-3 placeholder-glow card-img-top">
                  <span class="img-placeholder placeholder col-12" style="height: 150px;"></span>
                </div>
                <div class="card-body bg-dark-subtle m-rounded-bottom placeholder-glow">
                  <h5 class="placeholder col-6"></h5>
                  <p class="placeholder col-8"></p>
                  <p class="placeholder col-8"></p>
                  <div class="row">
                    <div class="col-4">
                      <button class="btn btn-primary disabled placeholder col-6 w-100"></button>
                    </div>
                    <div class="col-8 ps-0">
                      <button class="btn btn-primary disabled placeholder col-6 w-100"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    
      <ModalComponent
        title="Autentikasi" 
        approveButtonText="Log In" 
        cancelButtonText="Batal"
        modalId="mustLoginModal"
        modalLabel="mustLoginModalLabel"
        :functionHandler="login"
      >
        <div>
          Anda harus Login untuk menambahkan Obat ke Keranjang
        </div>
      </ModalComponent>
      <ModalComponent
        title="Tambah Cart" 
        approveButtonText="Tambah" 
        cancelButtonText="Batal"
        modalId="cartModal"
        modalLabel="cartModalLabel"
        :functionHandler="addToCart"
      >
        <div>
          <h5>Data Produk</h5>
          <div class="row mb-3">
            <div class="col-8">
              <img :src="medicineSelect?.image" class="rounded img-fluid" alt="...">
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Nama</div>
            <div class="col-8">: <span class="ms-2">{{ medicineSelect?.name }}</span></div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Harga</div>
            <div class="col-8">: <span class="ms-2">{{ currencyFormat(medicineSelect.price ?? 0) }}</span></div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Stok Tersedia</div>
            <div class="col-8">: <span class="ms-2">{{ medicineSelect?.stock }} buah</span></div>
          </div>
          <div class="row">
            <div class="col-4 fw-semibold" style="align-content: center;">Jumlah Pesanan</div>
            <div class="col-8" style="align-items: center;">:
              <span class="ms-2" style="width: fit-content; color: #808080;">
                <span class="fs-4" :class="quantity < 2 ? 'is-disabled' : ''" type="button" @click="quantity--"><i class="bi bi-dash-square"></i></span>
                <span class="mx-2 fs-5">{{ quantity }}</span>
                <span class="fs-4" :class="medicineSelect?.stock == quantity ? 'is-disabled' : ''" type="button" @click="quantity++"><i class="bi bi-plus-square"></i></span>
              </span>
            </div>
          </div>
        </div>
      </ModalComponent>
      <ToastComponent :messages="messages" :status="true" idToast="successToast"></ToastComponent>
      <ToastComponent :messages="messages" :status="false" idToast="errorToast"></ToastComponent>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits  } from 'vue';
import ModalComponent from './ModalComponent.vue';
import ToastComponent from './ToastComponent.vue';
import { useAuthStore } from '@/stores/authentication';
import { useMedicineStore } from '@/stores/medicine';
import { useRouter } from 'vue-router';
import { currencyFormat } from '@/common.js';

const auth = useAuthStore()
const medicineStore = useMedicineStore()
const router = useRouter()

const format = currencyFormat()

const props = defineProps({
  medicines: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: true
  },
  totalData: {
    type: Number,
    default: 0
  },
  categorySelect: {
    type: String,
    default: 'Semua Kategori'
  },
  isMobile: {
    type: Boolean,
    default: false
  }
});

const medicineSelect = ref({
  id: null,
  name: '',
  price: null,
  description: '',
  stock: null,
  image: ''
});
let quantity = ref(1);
const isLoggedIn = ref(false);

isLoggedIn.value = auth.isLoggedIn || !!localStorage.getItem('token');

const selectMedicine = (medicine) => {
  emit('select-medicine', medicine);
};
const emit = defineEmits(['select-medicine']);

const selectedItem = (item) => {
  quantity.value = 1
  medicineSelect.value.id = item.id,
  medicineSelect.value.name = item.name,
  medicineSelect.value.price = item.price,
  medicineSelect.value.description = item.description,
  medicineSelect.value.stock = item.stock,
  medicineSelect.value.image = item.image
}

async function login() {
  router.push({ name: 'login' })
}

const toastLiveExample = ref(null)
const toastBootstrap = ref(null)
const messages = ref('');

async function addToCart() {
  const isProductInCart = await medicineStore.checkProductInCart(medicineSelect.value.id)
  if(!isProductInCart) {
    let payload = {
      medicineId: medicineSelect.value.id,
      count: quantity.value
    }
    await medicineStore.addCart(payload)
    messages.value = 'Berhasil Menambahkan ke dalam Cart'
    toastLiveExample.value = document.getElementById('successToast') 
  }else{
    messages.value = 'Product sudah ada di dalam Cart!'
    toastLiveExample.value = document.getElementById('errorToast') 
  }
  toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
  toastBootstrap.value.show()
  quantity.value = 1
}

// function currencyFormat(value) {

// }
</script>