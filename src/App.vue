<template>
  <div>
    <nav class="bg-orange-600 text-zinc-100 font-semibold sticky top-0 z-50 shadow-lg">
      <div class="px-4 sm:px-8 lg:px-8 py-4 flex justify-between items-center">
        <div class="sm:text-3xl text-xl font-bold">SecondGear</div>
        <div class="hidden md:flex space-x-6">
          <router-link to="/" class="px-4 py-2 hover:bg-orange-500 rounded-md transition">Home</router-link>
          <router-link to="/admin" class="px-4 py-2 hover:bg-orange-500 rounded-md transition">Admin</router-link>
          <router-link to="/auth" class="px-4 py-2 hover:bg-orange-500 rounded-md transition">Login/Register</router-link>
        </div>
        <button @click="toggleMenu" class="md:hidden text-zinc-100 focus:outline-none">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
      
      <transition name="slide">
        <div v-if="menuOpen" class="md:hidden bg-orange-600">
          <router-link @click="closeMenu" to="/" class="block px-4 py-3 text-zinc-100 hover:bg-orange-500 transition">Home</router-link>
          <router-link @click="closeMenu" to="/admin" class="block px-4 py-3 text-zinc-100 hover:bg-orange-500 transition">Admin</router-link>
          <router-link @click="closeMenu" to="/auth" class="block px-4 py-3 text-zinc-100 hover:bg-orange-500 transition">Login/Register</router-link>
        </div>
      </transition>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-enter-to, .slide-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>