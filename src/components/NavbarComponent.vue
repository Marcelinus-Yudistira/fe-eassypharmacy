<template>
    <nav class="navbar navbar-expand-lg bg-dark-subtle m-h-70 fixed-top">
        <div class="container-fluid ms-5 me-5">
            <router-link to="/home" class="navbar-brand">Easy Pharmacy</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse is-content-end" id="navbarSupportedContent">
                <div v-if="$route.name !== 'login' && $route.name !== 'register'" class="d-flex">
                    <div class="input-group me-2" @submit.prevent="submitSearch">
                        <input type="search" v-model="searchTerm" class="form-control m-rounded-left" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <button type="button" @click="submitSearch" class="btn btn-primary"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                <ul class="navbar-nav mb-2 mb-lg-0" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link to="/cart" class="nav-link p-1 fs-3 ms-2 me-2"><i class="bi bi-cart"></i></router-link>
                    </li>
                    <li class="nav-item">
                        <!-- <a class="nav-link p-1 fs-3" href="" @click="logout"><i class="bi bi-person-circle"></i></a> -->
                        <div class="dropdown">
                            <div class="p-1 fs-3 dropdown-toggle" type="button" href="" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-circle"></i></div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><a class="dropdown-item" href="#" type="button" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <button v-if="!isLoggedIn && $route.name !== 'login' && $route.name !== 'register'" class="btn btn-outline-success" @click="this.$router.push({name: 'login'})">Login</button>
                <button v-if="$route.name === 'register'" class="btn btn-outline-success" @click="this.$router.push({name: 'login'})">Login</button>
                <button v-if="$route.name === 'login'" class="btn btn-outline-success" @click="this.$router.push({name: 'register'})">Register</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, defineEmits, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore()

const searchTerm = ref('');
const isLoggedIn = ref('');

const props = defineProps({ 
  resetSearch: Boolean
});

const submitSearch = () => {
  const data = searchTerm.value
  emit('search', data);
};
const emit = defineEmits(['search']);

watch(() => auth.isLoggedIn, (newValue) => {
  isLoggedIn.value = newValue;
});

watch(() => props.resetSearch, (newValue) => {
  if (newValue) {
    console.log('mlebu kah?');
    searchTerm.value = null
  }
});

onMounted(() => {
    const tokenRefresh = localStorage.getItem('token');
    if(tokenRefresh){
        isLoggedIn.value = true;
    }
})
</script>