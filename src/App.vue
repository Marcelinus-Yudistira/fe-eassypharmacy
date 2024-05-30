<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import { onMounted, ref } from 'vue';
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
    await auth.logout();
    isLoading.value = false
    router.push({name: 'login'});
  };
</script>

<template>
  <header>
    <NavbarComponent @search="search" :resetSearch="resetData"/>
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
