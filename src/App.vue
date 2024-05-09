<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue';
import { ref } from 'vue';


const searchTerm = ref('');

const search = (data) => {
  searchTerm.value = data
  console.log('Searching for:', searchTerm.value);
};
</script>

<template>
  <header>
    <NavbarComponent @search="search"/>
  </header>

  <RouterView :searchTerm="searchTerm"/>
</template>
