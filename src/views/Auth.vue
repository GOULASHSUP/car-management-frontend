<template>
  <div class="flex h-screen">
    <!-- Right side with login and register forms -->
    <div class="w-full bg-zinc-200 flex-grow text-zinc-200 flex flex-col items-center justify-center p-8">
      
      <!-- Login Form -->
      <div class="max-w-md w-full bg-zinc-300 p-8 rounded-md shadow-lg mb-8">
        <h2 class="text-3xl font-bold text-left text-zinc-500 mb-6">Login</h2>

        <input 
          type="email" 
          class="w-full p-3 mb-4 bg-zinc-200 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700" 
          placeholder="Email" 
          v-model="email"
        />
        
        <input 
          type="password" 
          class="w-full p-3 mb-4 bg-zinc-200 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700" 
          placeholder="Password" 
          v-model="password"
        />
        
        <button 
          class="w-full py-3 mb-4 bg-orange-700 text-white rounded-lg hover:bg-orange-500"
          @click="fetchToken(email, password)"
        >
          Login
        </button>
      </div>

      <!-- Click to Register Text -->
      <div class="text-center">
        <p class="text-lg text-zinc-700">New to SecondGear?</p>
        <p 
          class="text-orange-700 hover:text-orange-500 font-semibold cursor-pointer mt-2" 
          @click="toggleRegisterDialog"
        >
          Click to register
        </p>
      </div>

      <!-- Register Form (appears when toggled) -->
      <div v-if="menuOpen" class="max-w-md w-full bg-zinc-300 p-8 rounded-md shadow-lg mt-6">
        <h3 class="text-3xl font-bold text-left text-zinc-500 mb-6">Register</h3>
        
        <form class="space-y-4">
          <input 
            type="text" 
            class="w-full p-3 mb-4 bg-zinc-200 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700" 
            placeholder="Full name" 
            v-model="name"
          />
          <input 
            type="email" 
            class="w-full p-3 mb-4 bg-zinc-200 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700" 
            placeholder="Email" 
            v-model="email"
          />
          <input 
            type="password" 
            class="w-full p-3 mb-4 bg-zinc-200 text-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700" 
            placeholder="Password" 
            v-model="password"
          />
          <button 
            class="w-full py-3 mb-4 bg-orange-700 text-white rounded-lg hover:bg-orange-500"
            @click.prevent="registerUser(name, email, password)"
          >
            Register
          </button>
        </form>

        <button 
          class="w-full py-3 mb-4 mt-4 bg-zinc-700 text-white rounded-lg hover:bg-zinc-500"
          @click="toggleRegisterDialog"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUsers } from '../modules/auth/useUsers'

const { fetchToken, registerUser, name, email, password, user } = useUsers()
const menuOpen = ref(false)

const toggleRegisterDialog = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<style scoped>
/* Style for dialog and smooth transition for the mobile menu */
dialog {
  background-color: var(--vt-c-black, #181818);
  border-left: 1px solid var(--vt-c-gray-500, #9CA3AF);
  padding: 1rem;
  position: absolute;
  top:8rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

dialog[open] {
  opacity: 1;
  pointer-events: inherit;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>