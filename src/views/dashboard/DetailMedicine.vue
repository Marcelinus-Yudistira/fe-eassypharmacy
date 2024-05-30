<template>
  <div class="container">
      <div v-if="!isLoading">
        <div class="row m-mt-content">
          <div class="col-3">
            <img :src="medicine.image" class="rounded img-fluid" alt="...">
          </div>
          <div class="col-7">
            <h3>{{ medicine.name }}</h3>
            <p class="mb-1">Stok : {{ medicine.stock }}</p>
            <p class="fs-5">Harga : Rp. {{ medicine.price }}</p>
  
            <button v-if="isLoggedIn" class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#cartModal" >Tambah ke Keranjang</button>
            <button v-else class="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#mustLoginModal">Tambah ke Keranjang</button>
            <div class="mt-5">
              <h5 class="mb-1">Kategori Obat : </h5>
              <p class="mb-4">{{ medicine?.MedicineCategory?.name }}</p>
              <h5 class="mb-1">Deskripsi : </h5>
              <p class="mb-4 text-justify">{{ medicine.description }}</p>
              <h5 class="mb-1">Indikasi Umum : </h5>
              <p class="mb-4 text-justify">{{ medicine.indication }}</p>
              <h5 class="mb-1">Komposisi : </h5>
              <p class="mb-4 text-justify">{{ medicine.composition }}</p>
              <h5 class="mb-1">Dosis : </h5>
              <p class="mb-4">{{ medicine.dose }}</p>
              <h5 class="mb-1">Aturan Pakai : </h5>
              <p class="mb-4 text-justify">{{ medicine.usage }}</p>
              <h5 class="mb-1">Kontradiksi : </h5>
              <p class="mb-4 text-justify">{{ medicine.contraIndication }}</p>
              <h5 class="mb-1">Efek Samping : </h5>
              <p class="mb-4">{{ medicine.sideEffect }}</p>
            </div>
          </div>
          <div class="col-2">
            <p>Lihat Produk terkait</p>
            <div v-for="medicine in medicines" :key="medicine.id" >
              <div class="col">
                <div class="card side-card mt-4">
                  <img :src="medicine.image" class="card-img-top-side" alt="...">
                  <div class="card-body bg-dark-subtle m-rounded-bottom">
                    <h5 class="card-title">{{ medicine.name }}</h5>
                    <p class="card-text fw-medium">Harga : Rp. {{ medicine.price }},00</p>
                    <div class="row">
                      <div class="col-4">
                        <button class="btn btn-sm btn-primary w-100 ps-2"><i class="bi bi-cart"></i></button>
                      </div>
                      <div class="col-8 ps-0">
                        <button @click="selectMedicine(medicine.id)" class="btn btn-sm btn-primary w-100">Detail Produk</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="row m-mt-content">
          <div class="col-3 placeholder-glow">
            <span class="img-placeholder placeholder col-12" style="height: 150px;"></span>
          </div>
          <div class="col-7">
            <div class="col placeholder-glow">
              <h3 class="placeholder col-6"></h3>
              <p class="fs-5 class placeholder col-12"></p>
              <button class="btn btn-primary disabled placeholder col-3 mt-4"></button>
            </div>
  
            <div class="mt-5 placeholder-glow">
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
              <h5 class="mb-1 placeholder col-6"></h5>
              <p class="placeholder mb-0 col-12"></p>
              <p class="mb-4 placeholder col-12"></p>
            </div>
          </div>
          <div class="col-2">
            <p>Lihat Produk terkait</p>
            <div v-for="i in 4" :key="i" >
              <div class="col">
                <div class="card side-card mt-4">
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
              <img :src="medicine.image" class="rounded img-fluid" alt="...">
            </div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Nama</div>
            <div class="col-8">: <span class="ms-2">{{ medicine.name }}</span></div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Harga</div>
            <div class="col-8">: <span class="ms-2">Rp. {{ medicine.price }},00</span></div>
          </div>
          <div class="row mb-1">
            <div class="col-4 fw-semibold">Stok Tersedia</div>
            <div class="col-8">: <span class="ms-2">{{ medicine.stock }} buah</span></div>
          </div>
          <div class="row">
            <div class="col-4 fw-semibold" style="align-content: center;">Jumlah Pesanan</div>
            <div class="col-8" style="align-items: center;">:
              <span class="ms-2" style="width: fit-content; color: #808080;">
                <span class="fs-4" :class="quantity < 2 ? 'is-disabled' : ''" type="button" @click="quantity--"><i class="bi bi-dash-square"></i></span>
                <span class="mx-2 fs-5">{{ quantity }}</span>
                <span class="fs-4" :class="medicine.stock == quantity ? 'is-disabled' : ''" type="button" @click="quantity++"><i class="bi bi-plus-square"></i></span>
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
import { ref, onMounted, watch } from 'vue';
import { useMedicineStore } from '@/stores/medicine';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import ModalComponent from '../../components/ModalComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';

const medicineStore = useMedicineStore()
const medicine = ref([]);
const relatedMedicines = ref([]);
const medicines = ref([]);
const isLoggedIn = ref(false);
const route = useRoute()
const userData = ref(null)
let quantity = ref(1);

const auth = useAuthStore()

isLoggedIn.value = auth.isLoggedIn || !!localStorage.getItem('token');

const router = useRouter()

const isLoading = ref(false);

async function getUserData() {
  userData.value = await auth.getUserData();
}

async function fetchData() {
  isLoading.value = true
  medicine.value = await medicineStore.getDetail(route.params.id);
  isLoading.value = false
}

async function fetchRelatedMedicine() {
  medicines.value = await medicineStore.fetchMedicineItems({
    categoryId: medicine.value.categoryId,
    pageSize : 5
  });

  let index = medicines.value.findIndex(obj => obj.id === medicine.value.id)

  relatedMedicines.value = index !== -1 ? medicines.value.splice(index, 1) : ''
}

const selectedMedicine = ref(null);

const selectMedicine = async (medicineId) => {
  isLoading.value = true
  router.push({ name: 'detailMedicine', params: { id: medicineId } });
  medicine.value = await medicineStore.getDetail(medicineId);
  await fetchRelatedMedicine()
  isLoading.value = false
};

onMounted(async () => {
  await fetchData()
  await fetchRelatedMedicine()
})

// async function addToCart() {
//   console.log(auth.accessToken,'<<< datanya accesstoken');
//   await getUserData()
//   console.log(medicine.value,'<<< datanya produk');
//   console.log(auth.user,'<<< datanya user');
//   router.push({ name: 'cart' })
// }

async function login() {
  router.push({ name: 'login' })
}

const toastLiveExample = ref(null)
const toastBootstrap = ref(null)
const messages = ref('');

async function addToCart() {
  const isProductInCart = await medicineStore.checkProductInCart(medicine.value.id)
  if(!isProductInCart) {
    let payload = {
      medicineId: medicine.value.id,
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
  quantity.value = 0
}
</script>
