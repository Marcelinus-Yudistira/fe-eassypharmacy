<template>
  <div  class="container">
    <div class="row">
      <div class="col-6">
          <div class="row"><i class="bi bi-circle mr-4 m-fit-content"></i><h5 class="m-fit-content">Obat Flu dan Batuk</h5></div>
      </div>
      <div class="col-6 text-end"><p>Menampilkan 10 dari 27 Produk Obat</p></div>
    </div>
    <div class="medicine-list">
      <div class="row row-cols-1 row-cols-md-4 g-4">
        <div v-for="medicine in medicines" :key="medicine.id" >
          <div class="col">
            <div class="card">
              <img src="https://doktersehat.com/wp-content/uploads/2020/02/obat_dan_vitamin_Doktersehat_com_Biothicol_Sirup.jpg" class="card-img-top" alt="...">
              <div class="card-body bg-dark-subtle m-rounded-bottom">
                <h5 class="card-title">{{ medicine.name }}</h5>
                <p class="card-text">Deskripsi : {{ medicine.description }}</p>
                <p class="card-text fw-medium">Harga : Rp. {{ medicine.price }},00</p>
                <div class="row">
                  <div class="col-4">
                    <button class="btn btn-primary w-100 ps-2"><i class="bi bi-cart"></i></button>
                  </div>
                  <div class="col-8 ps-0">
                    <button @click="selectMedicine(medicine)" class="btn btn-primary w-100">Detail Produk</button>
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
import { defineProps, defineEmits  } from 'vue';

const props = defineProps({
  medicines: {
    type: Array,
    required: true
  },
});
const selectMedicine = (medicine) => {
  emit('select-medicine', medicine);
};
const emit = defineEmits(['select-medicine']);
</script>