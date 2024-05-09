<template>
    <div class="container">
      <div class="row vh-90">
        <div class="col d-flex align-items-center justify-content-center">
          <h4>Logo EassyPharmacy</h4>
        </div>
        <div class="col d-flex align-items-center">
          <div class="card w-70">
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <div class="card-header bg-white mb-3 ps-0"><h5>Selamat Datang !</h5></div>
                  <label for="username" class="form-label">Username</label>
                  <input type="username" class="form-control" id="username" v-model="userData.username" required>
                  <div class="invalid-feedback" v-if="!usernameIsValid">Username harus diisi.</div>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="userData.email" required>
                  <div class="invalid-feedback" v-if="!emailIsValid">Email harus diisi.</div>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="userData.password" required>
                  <div class="invalid-feedback" v-if="!passwordIsValid">Password harus diisi.</div>
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">Phone Number</label>
                  <input type="phoneNumber" class="form-control" id="phoneNumber" v-model="userData.phoneNumber" required>
                  <div class="invalid-feedback" v-if="!passwordIsValid">Phone Number harus diisi.</div>
                </div>
                <button type="submit" class="btn btn-primary w-100">Daftar</button>
              </form>
              <p class="mt-3">Sudah memiliki akun? silahkan <a href="/login">Masuk</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

  
  const userData = ref('');
  const usernameIsValid = ref(true);
  const emailIsValid = ref(true);
  const passwordIsValid = ref(true);

  const router = useRouter();

  const auth = useAuthStore()

  const {isLoggedIn} = storeToRefs(auth)

  userData.value = {
    username : '',
    email : '',
    password: '',
    phoneNumber: ''
  }
  
  async function register() {
    console.log(userData.value);
    // Validasi
    usernameIsValid.value = userData.value.username !== '';
    emailIsValid.value = userData.value.email !== '';
    passwordIsValid.value = userData.value.password !== '';
  
    if (emailIsValid.value && passwordIsValid.value && usernameIsValid.value) {
      try{
        await auth.register(userData.value);
        alert('Registrasi berhasil! Silakan login untuk melanjutkan.');
        router.push('/login');
      }catch(error){
        console.error('Error during registration:', error);
      }
      
    }
  }

  onMounted( () => {
    console.log(isLoggedIn,'<<<<');
  })
  </script>
  