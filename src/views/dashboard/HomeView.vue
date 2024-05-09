<template>
  <div class="menu container">
    <h2 class="text-center mb-4 mt-4">Daftar Obat</h2>
    <div v-if="token">
      <ListMedicine :medicines="medicines" @select-medicine="selectMedicine" />
    </div>
    <div v-else>
        <p>Anda harus login untuk melihat data.</p>
        <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import ListMedicine from '../../components/ListMedicine.vue';
import { useMedicineStore } from '@/stores/medicine';
import { useRouter} from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const medicineStore = useMedicineStore()
const medicines = ref([]);
const router = useRouter()

const auth = useAuthStore()
const token = ref(localStorage.getItem('token'))
// const isLoggedIn = ref(auth.isLoggedIn)

const props = defineProps({ 
  searchTerm: String
});
async function fetchData() {
  console.log(token.value, '<<token');
  // cara pake access token
  if(token.value){
    medicines.value = await medicineStore.fetchMedicineItems(localStorage.getItem('token'));
    console.log('masuk sini kah?');
  }
  
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

