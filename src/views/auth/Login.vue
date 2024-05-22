<template>
  <div class="container">
    <div class="row vh-80">
      <div class="col d-flex align-items-center justify-content-center">
        <h4>Logo EassyPharmacy</h4>
      </div>
      <div class="col d-flex align-items-center">
        <div class="card w-50">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <div class="card-header bg-white mb-3 ps-0"><h5>Selamat Datang !</h5></div>
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="userData.email" required>
                <div class="invalid-feedback" v-if="!emailIsValid">Email harus diisi.</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="userData.password" required>
                <div class="invalid-feedback" v-if="!passwordIsValid">Password harus diisi.</div>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="staySignedIn">
                <!-- <label class="form-check-label" for="staySignedIn">Stay signed in?</label> -->
              </div>
              <button type="submit" class="btn btn-primary w-100">Masuk</button>
            </form>
            <p class="mt-3">Belum memiliki akun? silahkan <a href="/register">Daftar</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuthStore()

const userData = ref({
  email: '',
  password: ''
});

const emailIsValid = ref(true);
const passwordIsValid = ref(true);


async function login() {
  // Validasi
  emailIsValid.value = userData.value.email !== '';
  passwordIsValid.value = userData.value.password !== '';

  if (emailIsValid.value && passwordIsValid.value) {
    try{
      await auth.login(userData.value);
      alert('Login berhasil');
      router.push('/home');
    }catch(error){
      console.error('Error during login:', error);
    }
  }
}
</script>
