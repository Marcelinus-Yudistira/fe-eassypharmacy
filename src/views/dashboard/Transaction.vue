<template>
    <div class="container">
        <h4>Checkout</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <h5 class="mt-3">Alamat Pengiriman</h5>
                <div class="row">
                    <div class="col-3">
                        <p>Marcelinus Yudistira Yoga P</p>
                        <p>+62-034-9983-1023</p>
                    </div>
                    <div class="col-6">
                        <p>Soroyo Rt04/RW01, Pekalong, Seyegan, Wonosobo, Jawa Tengah</p>
                    </div>
                    <div class="col-3">
                        <span class="badge text-bg-primary">Lunas</span>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row mt-3">
                    <div class="col-3"><h5>Produk dipesan</h5></div>
                    <div class="col-3"><h6>Nama</h6></div>
                    <div class="col-2"><h6>Harga</h6></div>
                    <div class="col-2"><h6>Jumlah</h6></div>
                    <div class="col-2"><h6>Total</h6></div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <img src="https://doktersehat.com/wp-content/uploads/2020/02/obat_dan_vitamin_Doktersehat_com_Biothicol_Sirup.jpg" 
                        class="img-fluid rounded" alt="..." style="max-height: 120px;">
                    </div>
                    <div class="col-3">
                        <p>Tuzalos</p>
                    </div>
                    <div class="col-2">
                        <p>Rp. 9000,00</p>
                    </div>
                    <div class="col-2">
                        <p>1</p>
                    </div>
                    <div class="col-2">
                        <p>Rp. 12000,00</p>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <h5 class="mt-3">Pengiriman</h5>
                    <div class="col-3 mt-3">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/New_Logo_JNE.png" 
                            class="img-fluid rounded" alt="..." style="max-height: 80px;">
                    </div>
                    <div class="col-5">
                        <h6>Pengiriman Reguler</h6>
                        <p class="mb-1">Jakarta - Surabaya</p>
                        <p class="mb-1"><span class="fw-semibold">Estimasi </span>: 2-3 Hari</p>
                        <p class="mb-1"><span class="fw-semibold">Biaya Pengiriman </span>: Rp. 2500,00</p>
                    </div>
                </div>
            </li>
            <li class="list-group-item">
                <div class="row">
                    <h5 class="mt-3">Pembayaran</h5>
                    <div class="col-3 mt-3">
                        <img src="https://karir.sari-mutiara.ac.id/asset/foto_berita/bd03016e20748bbd8e8e6f70022d6611.jpg" 
                            class="img-fluid rounded" alt="..." style="max-height: 150px;">
                    </div>
                    <div class="col-5">
                        <h6>Enabling Talent, Passion, Integrity and Accountability</h6>
                        <p>	Menyediakan layanan perbankan universal di Indonesia secara terpadu sabagai perusahaan dengan kinerja unggul di kawasan ASEAN dan kawasan utama lainnya, serta mendukung percepatan integrasi ASEAN dan menghubungkannya dengan kawasan lain</p>
                    </div>
                </div>
            </li>
        </ul>
        <div class="col-4">
            <div class="card border-black mb-3" style="max-width: auto; height: fit-content;">
            <div class="card-body text-black">
                <h5 class="card-title">Sub Total Harga</h5>
                <p class="card-text">Rp. 3500,00</p>
                <h5 class="card-title mt-3">Total Harga</h5>
                <p class="card-text">Rp. 3500,00</p>
                <div class="row">
                    <div class="col-6">
                        <button class="btn btn-outline-primary w-100">Batalkan Pesanan</button>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary w-100">Buat Pesanan</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { defineProps, defineEmits  } from 'vue';
import ModalComponent from '../../components/ModalComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';
import { useAuthStore } from '@/stores/authentication';
import { useMedicineStore } from '@/stores/medicine';
import { useRoute, useRouter } from 'vue-router';

const auth = useAuthStore()
const medicineStore = useMedicineStore()

const medicineCart = ref([])
const userProfile = ref(null)
async function fetchData() {
  isLoading.value = true
  medicineCart.value = await medicineStore.fetchCartItems();
  userProfile.value = await auth.getUserData()
  isLoading.value = false
}

onMounted(async () => {
  await fetchData()
})

</script>