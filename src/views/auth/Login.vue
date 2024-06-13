<template>
  <div class="container">
    <div class="row" :class=" isWeb ? 'vh-80' : 'mt-250'">
      <div class="col d-flex align-items-center justify-content-center">
        <img v-if="isWeb" src="/src/assets/logo.png" alt="logo" width="400px">
        <img v-else src="/src/assets/logo2-1.png" class="ps-5 pe-5 mb-5" alt="logo" width="300px">
      </div>
      <div class="col d-flex align-items-center" :class=" isWeb ? '' : 'ps-5 pe-5' ">
        <div class="card w-50" :class=" !isWeb ? 'w-100': 'mt-5' ">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <div class="card-header bg-white mb-3 ps-0"><h5>Selamat Datang !</h5></div>
                <label for="email" class="form-label">Email</label>
                <input class="form-control" id="email" v-model="userData.email">
                <p v-if="!emailIsValid" class="text-danger">{{ emailValidationMessage }}</p>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="userData.password">
                <p v-if="!passwordIsValid" class="text-danger">{{ passwordValidationMessage }}</p>
              </div>
              <button v-if="!isLoading" type="submit" class="btn btn-primary w-100 ">Masuk</button>
              <button v-else class="btn btn-primary w-100" type="button" disabled>
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status"> Loading...</span>
              </button>
            </form>
            <p class="mt-3">Belum memiliki akun? silahkan <span class="is-clickable text-decoration-underline text-primary" @click="goToRegister">Daftar</span></p>
          </div>
        </div>
      </div>
    </div>
    <ToastComponent :messages="toastMessages" :status="toastStatus"></ToastComponent>
    <ToastComponent idToast="errorToast" :messages="toastMessages" :status="false"></ToastComponent>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authentication';
import { useRouter } from 'vue-router';
import ToastComponent from '../../components/ToastComponent.vue';

const router = useRouter();
const auth = useAuthStore()
let emailValidationMessage = ref('');
let passwordValidationMessage = ref('');
let toastStatus = ref(true)
let toastMessages = ref('')

const userData = ref({
  email: '',
  password: ''
});

const isLoading = ref(false)
const emailIsValid = ref(true);
const passwordIsValid = ref(true);

const toastLiveExample = ref(null)
const toastBootstrap = ref(null)

const successMessages = ref(sessionStorage.getItem('successMessage') || ' ');
const errorMessage = ref(sessionStorage.getItem('errorMessage') || ' ');

function goToRegister() {
  router.push({ name: 'register' });
}

const validateEmail = (email) => {
  return email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const validatePassword = (password) => {
  return password !== '' && password.length >= 6;
}

const validationForm = (userData) => {
  emailIsValid.value = validateEmail(userData.email)
  passwordIsValid.value = validatePassword(userData.password)

  if(userData.email == '') emailValidationMessage.value ='Email tidak boleh kosong!'
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) emailValidationMessage.value ='Format email tidak valid!'
  if(userData.password == '') passwordValidationMessage.value ='Password tidak boleh kosong!'
  else if(userData.password.length <= 6) passwordValidationMessage.value ='Panjang password minimal 6 karakter!'
}

async function login() {
  // Validasi
  validationForm(userData.value)
  toastLiveExample.value = document.getElementById('liveToast')
  toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)

  if (emailIsValid.value && passwordIsValid.value) {
    try{
      isLoading.value = true
      await auth.login(userData.value);
      isLoading.value = false
      toastMessages.value = 'Berhasil Login'
      toastBootstrap.value.show()
      sessionStorage.setItem('successMessage', 'Login berhasil!');
      router.push('/home');
    }catch(error){
      toastLiveExample.value = document.getElementById('errorToast')
      toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
      toastMessages.value = 'Pengguna tidak ditemukan!'
      toastBootstrap.value.show()
      isLoading.value = false
    }
  }
}

const status = ref(false)

onMounted(async () => {
  if(successMessages.value != ' '){    
    toastLiveExample.value = document.getElementById('liveToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastMessages.value = successMessages.value
    toastBootstrap.value.show()
    sessionStorage.removeItem('successMessage');
  } else if (errorMessage.value != ' '){
    toastLiveExample.value = document.getElementById('errorToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
    toastMessages.value = errorMessage.value
    toastBootstrap.value.show()
    sessionStorage.removeItem('errorMessage');
  }
})

const width = ref(window.innerWidth);
const isWeb = ref(window.innerWidth > 767 ? true : false)

window.addEventListener('resize', () => {
  width.value = window.innerWidth;
  isWeb.value = window.innerWidth > 767 ? true : false
});
</script>
