<template>
    <nav class="navbar navbar-expand-lg bg-dark-subtle">
        <div class="container-fluid ms-5 me-5">
            <a class="navbar-brand" href="/">Easy Pharmacy</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse is-content-end" id="navbarSupportedContent">
                <form v-if="$route.name !== 'login' && $route.name !== 'register'" class="d-flex" @submit.prevent="submitSearch">
                    <input v-model="searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                <ul class="navbar-nav mb-2 mb-lg-0" v-if="$route.name !== 'login' && $route.name !== 'register'">
                    <li class="nav-item">
                        <a class="nav-link" href="" ><i class="bi bi-cart"></i></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="" @click="logout"><i class="bi bi-box-arrow-right"></i></a>
                    </li>
                </ul>
                <button v-if="$route.name === 'register'" class="btn btn-outline-success" @click="this.$router.push('login')">Login</button>
                <button v-if="$route.name === 'login'" class="btn btn-outline-success" @click="this.$router.push('register')">Register</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const searchTerm = ref('');

const router = useRouter();
const auth = useAuthStore()

const submitSearch = () => {
  const data = searchTerm.value
  emit('search', data);
};
const emit = defineEmits(['search']);

async function logout() {
    console.log('masuk');
  if (window.confirm('Apakah Anda yakin ingin logout?')) {
    await auth.logout(); 
    router.push('login');
  }
};
</script>