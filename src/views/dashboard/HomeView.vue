<template>
  <div class="menu container">
    <div class="row mt-5">
      <div class="col-2">
        <div class="card border-dark-subtle mb-3" style="max-width: auto;">
          <div class="card-header fs-5 fw-semibold">Kategori Obat</div>
            <div class="card-body p-0">
              <div class="list-group">
                <a href="#" type="button" @click="fetchByCategory({ id: null, name: 'Semua Obat' })" class="list-group-item list-group-item-action list-group-item-light">
                  Semua Kategori
                </a>
                <div v-for="category in categories" :key="category.id">
                  <a href="#" type="button" @click="fetchByCategory(category)" class="list-group-item list-group-item-action list-group-item-light">
                    {{ category.name }}
                  </a>
                </div>
              </div>
          </div>
        </div>

        <div class="card border-dark-subtle mb-3 mt-4" style="max-width: auto;">
          <div class="card-header fs-5 fw-semibold">Urutkan Data</div>
            <div class="card-body p-0">
              <div class="list-group">
                <div class="list-group-item">
                  <div class="form-check is-clickable">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked value="ASC" v-model="selectedSorting">
                    <label class="form-check-label" for="flexRadioDefault1">
                      Ascending (A-Z)
                    </label>
                  </div>
                </div>
                <div class="list-group-item">
                  <div class="form-check is-clickable">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  value="DESC" v-model="selectedSorting">
                    <label class="form-check-label" for="flexRadioDefault2">
                      Descending (Z-A)
                    </label>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <button class="btn btn-primary w-100" @click="fetchBySorting()">Terapkan</button>
      </div>
      <div class="col-10" v-if="medicines.length > 0">
        <ListMedicine 
          :medicines="medicines" 
          @select-medicine="selectMedicine" 
          :isLoading="isLoading" 
          :totalData="pagination?.totalData" 
          :categorySelect="selectedCategory"
        />
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end mt-5">
            <li class="page-item" :class="{disabled: pagination?.currentPage == 1}">
              <a class="page-link" href="#" @click="changePage('prev')">Previous</a>
            </li>
            <li class="page-item"><a class="page-link">{{ pagination?.currentPage }}</a></li>
            <li class="page-item" :class="{disabled: pagination?.currentPage == pagination?.totalPage}">
              <a class="page-link" href="#" @click="changePage('next')">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-10 align-content-center" v-else>
        <p class="text-center fs-3 mb-0"><i class="bi bi-search"></i></p>
        <p class="text-center">Data tidak ditemukan</p>
      </div>

      <ToastComponent :messages="successMessages"></ToastComponent>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue';
import ListMedicine from '../../components/ListMedicine.vue';
import { useMedicineStore } from '@/stores/medicine';
import { useRouter} from 'vue-router';
import ToastComponent from '../../components/ToastComponent.vue';

const medicineStore = useMedicineStore()
const medicines = ref([]);
const categories = ref([]);
const router = useRouter()
const isLoading = ref(false);
const pagination = ref(null)
const selectedSorting = ref('ASC'); 
const resetSearchKeyword = ref(true)

const props = defineProps({ 
  searchTerm: String
});

const emit = defineEmits(['resetSearch']);

async function fetchData() {
  isLoading.value = true
  medicines.value = await medicineStore.fetchMedicineItems();
  pagination.value = medicineStore.pagination
  categories.value = await medicineStore.getCategory();
  resetSearchKeyword.value = true
  emit('resetSearch', resetSearchKeyword.value);
  isLoading.value = false
}

async function fetchByKeyword() {
  isLoading.value = true
  resetSearchKeyword.value = false
  emit('resetSearch', false);
  medicines.value = await medicineStore.fetchMedicineItems({keyword: props.searchTerm});
  pagination.value = medicineStore.pagination
  isLoading.value = false
}

async function fetchByCategory(item){
  isLoading.value = true
  if (item.id == null) fetchData()
  else medicines.value = await medicineStore.fetchMedicineItems({categoryId: item.id});
  pagination.value = medicineStore.pagination
  selectedCategory.value = item
  resetSearchKeyword.value = true
  emit('resetSearch', resetSearchKeyword.value);
  isLoading.value = false
}

async function fetchBySorting(){
  isLoading.value = true
  const params = {
    orderType: selectedSorting.value
  }

  if (selectedCategory?.value?.id != null) params.categoryId = selectedCategory.value.id;
  if (props.searchTerm != null && !resetSearchKeyword.value) params.keyword = props.searchTerm;

  medicines.value = await medicineStore.fetchMedicineItems(params);
  pagination.value = medicineStore.pagination;
  resetSearchKeyword.value = true
  emit('resetSearch', resetSearchKeyword.value);

  isLoading.value = false
}

watch(() => props.searchTerm, (newValue) => {
  if (newValue !== null) {
    fetchByKeyword()
  }
});

  const toastLiveExample = ref(null)
  const toastBootstrap = ref(null)
  const successMessages = ref(sessionStorage.getItem('successMessage') || ' ');

onMounted(async () => {
  await fetchData()
  pagination.value = medicineStore.pagination

  if(successMessages.value != ' '){    
    toastLiveExample.value = document.getElementById('liveToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastBootstrap.value.show()
    sessionStorage.removeItem('successMessage');
  }
})

const selectedMedicine = ref(null);
const selectedCategory = ref(null);

const selectMedicine = (medicine) => {
  selectedMedicine.value = medicine;
  router.push({ name: 'detailMedicine', params: { id: medicine.id } });
};

const changePage = async (action) => {
  isLoading.value = true
  if(action == 'next'){
    pagination.value.currentPage += 1
    medicines.value = await medicineStore.fetchMedicineItems({page: pagination.value.currentPage});
  }else if(action == 'prev' && pagination.value.currentPage > 1){
    pagination.value.currentPage -= 1
    medicines.value = await medicineStore.fetchMedicineItems({page: pagination.value.currentPage});
  }
  isLoading.value = false
}

</script>

