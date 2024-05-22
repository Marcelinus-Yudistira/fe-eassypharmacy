<template>
  <div class="menu container">
    <div class="row mt-5">
      <div class="col-2">
        <div class="card border-dark-subtle mb-3" style="max-width: auto;">
          <div class="card-header fs-5 fw-semibold">Kategori Obat</div>
          <div class="card-body p-0">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action list-group-item-light">
                <!-- <i class="bi bi-person-circle"></i> -->
                Obat Batuk
              </a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-primary">Vitamin</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-light">Suplemen</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-primary">Pereda Nyeri</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-light">Mual</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-primary">Mata</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-light">Maag / Lambung</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-primary">Sendi / Tulang</a>
              <a href="#" class="list-group-item list-group-item-action list-group-item-light">Obat Herbal</a>
            </div>
          </div>
          </div>
      </div>
      <div class="col-10">
        <div v-if="medicines">
          <ListMedicine :medicines="medicines" @select-medicine="selectMedicine" />
        </div>
        <div v-else>
            <p>Anda harus login untuk melihat data.</p>
            <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import ListMedicine from '../../components/ListMedicine.vue';
import { useMedicineStore } from '@/stores/medicine';
import { useRouter} from 'vue-router';
// import { useAuthStore } from '@/stores/auth';

const medicineStore = useMedicineStore()
const medicines = ref([]);
const router = useRouter()

// const auth = useAuthStore()

// const isLoggedIn = ref(auth.isLoggedIn)

const props = defineProps({ 
  searchTerm: String
});


async function fetchData() {
  medicines.value = await medicineStore.fetchMedicineItems();
}

async function fetchFilteredData() {
  medicines.value = await medicineStore.fetchMedicineItemsFilter(props.searchTerm);
}

watch(() => props.searchTerm, (newValue) => {
  if (newValue !== null) {
    fetchFilteredData()
  }
});

onMounted(async () => {
  await fetchData()
})

const selectedMedicine = ref(null);

const selectMedicine = (medicine) => {
  selectedMedicine.value = medicine;
  router.push({ name: 'detailMedicine', params: { id: medicine.id } });
};
</script>

