<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';
import ToastComponent from './components/ToastComponent.vue';
import ModalComponent from './components/ModalComponent.vue';

  const router = useRouter();
  const auth = useAuthStore();

  const searchTerm = ref('');
  const isLoading = ref(false)
  const resetData = ref(false)

  const search = (data) => {
    searchTerm.value = data
  };

  const width = ref(window.innerWidth);
  const isWeb = ref(window.innerWidth > 767 ? true : false)

  window.addEventListener('resize', () => {
    width.value = window.innerWidth;
    isWeb.value = window.innerWidth > 767 ? true : false
  });

  const resetSearch = (data) => {
    resetData.value = data;
  }

  onMounted(() => {
    const resetSearch = () => {
      searchTerm.value = ''
    }
  }) 

  async function logout() {
    isLoading.value = true
    sessionStorage.setItem('successMessage', 'Logout berhasil!');
    auth.logout();
    isLoading.value = false
    router.push({name: 'login'});
  };
</script>

<template>
  <header>
    <NavbarComponent @search="search" :resetSearch="resetData"/>
    <!-- <div v-if="!isWeb">
      Masuk Mobile
    </div>
    <div v-else>
      Masuk Web
    </div> -->
  </header>

  <RouterView :searchTerm="searchTerm" @resetSearch="resetSearch"/>

  <ModalComponent
    title="Log Out" 
    approveButtonText="Log Out" 
    cancelButtonText="Batal"
    modalId="logoutModal"
    modalLabel="logoutModalLabel"
    :functionHandler="logout"
  >
    <div>
      Apakah anda yakin untuk melakukan Log Out
    </div>
  </ModalComponent>

</template>
