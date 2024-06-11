<template>
    <div class="container">
      <div class="row" :class=" isWeb ? 'vh-80' : 'mt-250'">
        <div class="col d-flex align-items-center justify-content-center">
          <img v-if="isWeb" src="/src/assets/logo.png" alt="logo" width="400px">
          <img v-else src="/src/assets/logo2-1.png" class="ps-5 pe-5 mb-5" alt="logo" width="300px">
        </div>
        <div class="col d-flex align-items-center" :class=" isWeb ? '' : 'ps-5 pe-5' ">
          <div class="card w-70" :class=" !isWeb ? 'w-100': 'mt-5' ">
            <div class="card-body">
              <form @submit.prevent="register">
                <div class="mb-3">
                  <div class="card-header bg-white mb-3 ps-0"><h5>Selamat Datang !</h5></div>
                  <label for="username" class="form-label">Username</label>
                  <input type="username" class="form-control" :class="!usernameIsValid ? 'is-invalid' : ''" id="username" v-model="userData.username">
                  <p class="text-danger" v-if="!usernameIsValid">{{ usernameValidationMessage }}</p>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                  <input class="form-control" id="email" :class="!emailIsValid ? 'is-invalid' : ''" v-model="userData.email">
                  <p class="text-danger" v-if="!emailIsValid">{{ emailValidationMessage }}</p>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" :class="!passwordIsValid ? 'is-invalid' : ''" id="password" v-model="userData.password">
                  <p class="text-danger" v-if="!passwordIsValid">{{ passwordValidationMessage }}</p>
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">Phone Number</label>
                  <input type="phoneNumber" class="form-control" :class="!phoneNumberIsValid ? 'is-invalid' : ''" id="phoneNumber" v-model="userData.phoneNumber">
                  <p class="text-danger" v-if="!phoneNumberIsValid">{{ phoneNumberValidationMessage }}</p>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <input type="address" class="form-control" :class="!addressIsValid ? 'is-invalid' : ''" id="address" v-model="userData.address">
                  <p class="text-danger" v-if="!addressIsValid">{{ addressValidationMessage }}</p>
                </div>
                <button type="submit" class="btn btn-primary w-100">Daftar</button>
              </form>
              <p class="mt-3">Sudah memiliki akun? silahkan <span class="is-clickable text-decoration-underline text-primary" @click="goToLogin">Masuk</span></p>
            </div>
          </div>
        </div>
      </div>
      <ToastComponent :messages="toastMessages" :status="toastStatus"></ToastComponent>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores/authentication';
  import { useRouter } from 'vue-router';
  import ToastComponent from '../../components/ToastComponent.vue';
  
  const router = useRouter();
  const auth = useAuthStore();

  const toastLiveExample = ref(null)
  const toastBootstrap = ref(null)
  let toastStatus = ref(true)
  let toastMessages = ref('')

  const userData = ref('');
  
  userData.value = {
    username : '',
    email : '',
    password: '',
    phoneNumber: '',
    address: ''
  }

  const emailIsValid = ref(true);
  const passwordIsValid = ref(true);
  const usernameIsValid = ref(true);
  const addressIsValid = ref(true);
  const phoneNumberIsValid = ref(true);

  let emailValidationMessage = ref('');
  let passwordValidationMessage = ref('');
  let phoneNumberValidationMessage = ref('');
  let addressValidationMessage = ref('');
  let usernameValidationMessage = ref('');
  
  function goToLogin() {
  router.push({ name: 'register' });
}
  const validateEmail = (email) => {
    return email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const validatePassword = (password) => {
    return password !== '' && password.length >= 6;
  }

  const validateEmptyValue = (value) => {
    return value !== ''
  }

  const validationForm = (userData) => {
    emailIsValid.value = validateEmail(userData.email)
    passwordIsValid.value = validatePassword(userData.password)
    usernameIsValid.value = validateEmptyValue(userData.username)
    addressIsValid.value = validateEmptyValue(userData.address)
    phoneNumberIsValid.value = validateEmptyValue(userData.phoneNumber)

    if(userData.email == '') emailValidationMessage.value ='Email tidak boleh kosong!'
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) emailValidationMessage.value ='Format email tidak valid!'

    if(userData.password == '') passwordValidationMessage.value ='Password tidak boleh kosong!'
    else if(userData.password.length <= 6) passwordValidationMessage.value ='Panjang password minimal 6 karakter!'

    if(userData.username == '') usernameValidationMessage.value ='Username tidak boleh kosong!'

    if(userData.address == '') addressValidationMessage.value ='Address tidak boleh kosong!'

    if(userData.phoneNumber == '') phoneNumberValidationMessage.value ='Phone Number tidak boleh kosong!'
  }

  async function register() {
    validationForm(userData.value)
    toastLiveExample.value = document.getElementById('liveToast')
    toastBootstrap.value = new bootstrap.Toast(toastLiveExample.value)
  
    if (emailIsValid.value && passwordIsValid.value && usernameIsValid.value && addressIsValid.value && phoneNumberIsValid.value) {
      try{
        await auth.register(userData.value);
        router.push('/login');
        toastMessages.value = 'Berhasil Register'
        toastBootstrap.value.show()
      }catch(error){
        toastMessages.value = error.message
        toastStatus.value = false
        toastBootstrap.value.show()
      }
    }
  }

  
const width = ref(window.innerWidth);
const isWeb = ref(window.innerWidth > 767 ? true : false)

window.addEventListener('resize', () => {
  width.value = window.innerWidth;
  isWeb.value = window.innerWidth > 767 ? true : false
});
</script>
  