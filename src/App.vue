<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-orange-700 text-zinc-100">
      <div class="sm:px-64 px-4 py-4 flex justify-between items-center">
        <!-- Logo or Brand (Optional) -->
        <div class="text-zinc-100 text-xl font-bold">SecondGear</div>

        <!-- Navbar Links for Large Screens -->
        <div class="hidden sm:flex space-x-4">
          <router-link to="/" class="px-4 py-2 hover:bg-orange-600 rounded">Home</router-link>
          <router-link to="/admin" class="px-4 py-2 hover:bg-orange-600 rounded">Admin</router-link>
          <router-link to="/auth" class="px-4 py-2 hover:bg-orange-600 rounded">Login/Register</router-link>
        </div>

        <!-- Hamburger Menu for Medium and Small Screens -->
        <div class="sm:hidden">
          <button @click="toggleMenu" class="text-zinc-100">
            <i class="fas fa-bars text-2xl"></i> <!-- Hamburger icon -->
          </button>
        </div>
      </div>

      <!-- Mobile Menu (Hidden by Default, Visible when `menuOpen` is true) -->
      <div v-if="menuOpen" class="sm:hidden flex flex-col items-left bg-orange-700 py-4">
        <router-link to="/" class="px-4 py-2 text-zinc-200 hover:bg-orange-600 w-full text-center">Home</router-link>
        <router-link to="/admin" class="px-4 py-2 text-zinc-200 hover:bg-orange-600 w-full text-center">Admin</router-link>
        <router-link to="/auth" class="px-4 py-2 text-zinc-200 hover:bg-orange-600 w-full text-center">Login/Register</router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
/* Optional - Adds a smooth transition for the mobile menu */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>