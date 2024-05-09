<template>
  <!-- <div class="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
    <div class="bg-body-tertiary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 p-3">
        <h2 class="display-5">Headrine</h2>
        <p class="lead">And an even wittier subheading.</p>
      </div>
      <div class="bg-dark shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
    </div>
    <div class="text-bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
      <div class="my-3 py-3">
        <h2 class="display-5">Another headline</h2>
        <p class="lead">And an even wittier subheading.</p>
      </div>
      <div class="bg-body-tertiary shadow-sm mx-auto" style="width: 80%; height: 300px; border-radius: 21px 21px 0 0;"></div>
    </div>
  </div> -->

  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <h2>Petunjuk Penggunaan Obat</h2>
      </div>
      <div class="col">
        <h2 class="text-center">Detail Obat</h2>
        <div v-if="medicineDetail">
          <h4>{{ medicineDetail.name }}</h4>
          <p>Deskripsi: {{ medicineDetail.description }}</p>
          <p>Harga: Rp. {{ medicineDetail.price }}</p>
          <p>Stok: {{ medicineDetail.stock }} Buah</p>
        </div>
        <div v-else>
          <p>Obat tidak ditemukan.</p>
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
const medicineDetail = ref([]);
const route = useRoute()

async function fetchData() {
  medicine.value = await medicineStore.getDetail(route.params.id);
}

onMounted(async () => {
  await fetchData()
  medicineDetail.value = medicine.value.data
})
</script>
