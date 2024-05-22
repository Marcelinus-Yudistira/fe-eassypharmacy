<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-8">
                <div class="card mb-3" style="max-width: auto;">
                    <ul class="list-group list-group-flush">
                        <div v-for="i in 4" :key="i">
                            <li class="list-group-item">
                                <div class="row g-0">
                                    <div class="col-md-2">
                                        <img src="https://doktersehat.com/wp-content/uploads/2020/02/obat_dan_vitamin_Doktersehat_com_Biothicol_Sirup.jpg" 
                                        class="img-fluid rounded" alt="..." style="max-height: 120px;">
                                    </div>
                                    <div class="col-md-10">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-9">
                                                    <h5 class="card-title">Tusaloz</h5>
                                                    <p class="card-text"><small class="text-body-secondary">Obat Pereda Nyeri untuk Demam, Flu dan Batuk.</small></p>
                                                    <p class="card-text">Rp. 3500,00</p>
                                                </div>
                                                <div class="col-3">
                                                    <button class="btn btn-sm btn-outline-primary">Lihat Detail</button>
                                                    <div class="mt-5">
                                                        <span class="fs-4" type="button" @click="decrement"><i class="bi bi-dash-square"></i></span>
                                                        <span class="mx-2 fs-5">{{ count }}</span>
                                                        <span class="fs-4" type="button" @click="increment"><i class="bi bi-plus-square"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="col-4">
                <div class="card border-primary mb-3" style="max-width: auto; height: fit-content;">
                <div class="card-header fs-5 fw-semibold">Detail Keranjang</div>
                <div class="card-body text-primary">
                    <h5 class="card-title">Sub Total Harga</h5>
                    <div v-for="i in 4" :key="i">
                        <div class="row">
                            <div class="col-6">
                                <p class="card-text">Tusaloz</p>
                            </div>
                            <div class="col-6">
                                <p class="card-text">Rp. 3500,00</p>
                            </div>
                        </div>
                    </div>
                    <h5 class="card-title mt-5">Total Harga</h5>
                    <p class="card-text">Rp. 3500,00</p>
                    <button class="btn btn-primary w-100">Checkout</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const count = ref(0);
    const increment = () => count.value++;
    const decrement = () => count.value--;
    console.log(count);
</script>