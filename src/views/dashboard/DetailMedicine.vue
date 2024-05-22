<template>
  <div class="container">
    <div class="row m-mt-content">
      <div class="col-3">
        <img src="https://doktersehat.com/wp-content/uploads/2020/02/obat_dan_vitamin_Doktersehat_com_Biothicol_Sirup.jpg" class="rounded img-fluid" alt="...">
      </div>
      <div class="col-7">
        <div v-if="medicine">
          <h3>{{ medicine.name }}</h3>
          <p class="fs-5">Harga: Rp. {{ medicine.price }}</p>

          <button class="btn btn-primary mt-4">Tambah ke Keranjang</button>

          <div class="mt-5">
            <h5 class="mb-1">Kategori Obat : </h5>
            <p class="mb-4">Dolor sit amet</p>
            <h5 class="mb-1">Deskripsi : </h5>
            <p class="mb-4 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore perspiciatis exercitationem assumenda harum quia ratione tempore provident consequuntur optio consequatur ipsa accusantium, natus necessitatibus impedit suscipit minima eos ipsam iste?</p>
            <h5 class="mb-1">Indikasi Umum : </h5>
            <p class="mb-4 text-justify">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore perspiciatis minima eos ipsam iste?</p>
            <h5 class="mb-1">Komposisi : </h5>
            <p class="mb-4 text-justify">Ipsum orem dolor sit amet consectetur adipisicing elitnatus necessitatibus impedit suscipit minima eos ipsam iste?</p>
            <h5 class="mb-1">Dosis : </h5>
            <p class="mb-4">Lorem, suscipit minima eos ipsam iste?</p>
            <h5 class="mb-1">Aturan Pakai : </h5>
            <p class="mb-4 text-justify">Lorem, ipsum dolor sit assumenda harum quia ratione tempore provident consequuntur optio consequatur ipsa accusantium, natus necessitatibus impedit suscipit minima eos ipsam iste?</p>
            <h5 class="mb-1">Kontradiksi : </h5>
            <p class="mb-4 text-justify">Inventore perspiciatis exercitationem assumenda harum quia ratione tempore provident consequuntur optio consequatur ipsa accusantium, natus necessitatibus impedit suscipit minima eos ipsam iste?</p>
            <h5 class="mb-1">Efek Samping : </h5>
            <p class="mb-4">Consectetur adipisicing elit Inventore perspiciatis empedit suscipit minima eos ipsam iste?</p>
          </div>
          <!-- <p>Deskripsi: {{ medicineDetail.description }}</p>
          <p>Stok: {{ medicineDetail.stock }} Buah</p> -->
        </div>
        <div v-else>
          <p>Obat tidak ditemukan.</p>
        </div>
      </div>
      <div class="col-2">
        <p>Lihat Produk terkait</p>
        <div v-for="medicine in medicines" :key="medicine.id" >
          <div class="col">
            <div class="card side-card mt-4">
              <img src="https://doktersehat.com/wp-content/uploads/2020/02/obat_dan_vitamin_Doktersehat_com_Biothicol_Sirup.jpg" class="card-img-top-side" alt="...">
              <div class="card-body bg-dark-subtle m-rounded-bottom">
                <h5 class="card-title">{{ medicine.name }}</h5>
                <p class="card-text fw-medium">Harga : Rp. {{ medicine.price }},00</p>
                <div class="row">
                  <div class="col-4">
                    <button class="btn btn-sm btn-primary w-100 ps-2"><i class="bi bi-cart"></i></button>
                  </div>
                  <div class="col-8 ps-0">
                    <button @click="selectMedicine(medicine)" class="btn btn-sm btn-primary w-100">Detail Produk</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMedicineStore } from '@/stores/medicine';
import { useRoute } from 'vue-router';

const medicineStore = useMedicineStore()
const medicine = ref([]);
const medicines = ref([]);
const route = useRoute()

async function fetchData() {
  medicine.value = await medicineStore.getDetail(route.params.id);
}

async function fetchAllData() {
  medicines.value = await medicineStore.fetchMedicineItems();
}

onMounted(async () => {
  await fetchData()
  await fetchAllData()
})
</script>
