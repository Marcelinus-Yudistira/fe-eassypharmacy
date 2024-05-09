<template>
  <div  class="container">
    <div class="medicine-list">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <div v-for="medicine in medicines" :key="medicine.id" >
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ medicine.name }}</h5>
                <p class="card-text">Harga: Rp. {{ medicine.price }}</p>
                <div class="row">
                  <div class="col">
                    <button @click="selectMedicine(medicine)" class="btn btn-primary w-100">Detail</button>
                  </div>
                  <div class="col ps-0">
                    <button class="btn btn-primary w-100 ps-2">Add To Cart</button>
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