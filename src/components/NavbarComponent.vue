<template>
    <nav class="navbar navbar-expand-lg bg-dark-subtle" :class="isWeb ? 'm-h-70 fixed-top' : 'fixed-top'">
        <div class="container-fluid ms-5 me-5">
            <router-link to="/home" class="navbar-brand">
                <img v-if="isWeb" src="/src/assets/logo_transparent.png" alt="logo" width="200px">
                <img v-else src="/src/assets/logo2-1.png" alt="logo" width="100px">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div v-if="isWeb" class="collapse navbar-collapse is-content-end" id="navbarSupportedContent">
                <div v-if="$route.name === 'home'" class="d-flex">
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
                                <li><a class="dropdown-item" href="#" @click="goToProfile">Profile</a></li>
                                <li><a class="dropdown-item" href="#" type="button" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <button v-if="!isLoggedIn && $route.name !== 'login' && $route.name !== 'register'" class="btn btn-outline-success" @click="goToLogin">Login</button>
                <button v-if="$route.name === 'register'" class="btn btn-outline-success" @click="goToLogin">Login</button>
                <button v-if="$route.name === 'login'" class="btn btn-outline-success" @click="goToRegister">Register</button>
            </div>
            <div v-else class="collapse navbar-collapse is-content-end" id="navbarSupportedContent">
                <div class="row mb-1"  :class="$route.name == 'detailMedicine' ? 'justify-content-end me-1' : ''">
   
                    <div v-if="$route.name === 'home'" class="d-flex col-9 p-0">
                        <div class="input-group me-2 mt-3" @submit.prevent="submitSearch">
                            <input type="search" v-model="searchTerm" class="form-control m-rounded-left" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" @click="submitSearch" class="btn btn-primary"><i class="bi bi-search"></i></button>
                        </div>
                    </div>
            
                    <ul class="navbar-nav col-3" style="height: 39px;" v-if="isLoggedIn">
                        <div class="row mt-2">
                            <li class="nav-item col-6">
                                <router-link to="/cart" class="nav-link p-1 fs-3 ms-2 me-2"><i class="bi bi-cart"></i></router-link>
                            </li>
                            <li class="nav-item col-6">
                                <!-- <a class="nav-link p-1 fs-3" href="" @click="logout"><i class="bi bi-person-circle"></i></a> -->
                                <div class="dropdown">
                                    <div class="p-1 fs-3 dropdown-toggle" type="button" href="" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-person-circle"></i></div>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#" @click="goToProfile">Profile</a></li>
                                        <li><a class="dropdown-item" href="#" type="button" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        </div>
                    </ul>
                
                    <button v-if="!isLoggedIn && $route.name !== 'login' && $route.name !== 'register'" class="btn btn-outline-success col-4" @click="goToLogin" style="width: fit-content; height: 39px; margin-top: 12.5px;">Login</button>
                    <div class="row justify-content-end p-0">
                        <button v-if="$route.name === 'register'" class="btn btn-outline-success" @click="goToLogin" style="width: fit-content; height: 39px; margin-top: 12.5px;">Login</button>
                        <button v-if="$route.name === 'login'" class="btn btn-outline-success mt-2" @click="goToRegister" style="width: fit-content; height: 39px; margin-top: 12.5px;">Register</button>
                    </div>
            
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, defineEmits, watch, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';
// import { isWebApp } from '@/common.js'

const router = useRouter();
const auth = useAuthStore()

const searchTerm = ref('');
const isLoggedIn = ref('');

const props = defineProps({ 
  resetSearch: Boolean
});

const width = ref(window.innerWidth);
const isWeb = ref(window.innerWidth > 767 ? true : false)

watch(width, (newWidth, oldWidth) => {
    console.log('Width changed from', oldWidth, 'to', newWidth);
    console.log(isWeb.value,'<<< Kondisi apakah dalam tampilan web?');
});

// Update width when window is resized
window.addEventListener('resize', () => {
    width.value = window.innerWidth;
    isWeb.value = window.innerWidth > 767 ? true : false
});

const submitSearch = () => {
  const data = searchTerm.value
  emit('search', data);
};
const emit = defineEmits(['search']);

function goToLogin(){
  router.push({ name: 'login' });
};  

function goToRegister(){
  router.push({ name: 'register' });
};

function gotToProfile(){
  router.push({ name: 'profile' });
};

watch(() => auth.isLoggedIn, (newValue) => {
  isLoggedIn.value = newValue;
});

watch(() => props.resetSearch, (newValue) => {
  if (newValue) {
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