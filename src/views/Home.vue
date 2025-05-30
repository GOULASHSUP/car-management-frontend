<template>
  <div class="bg-zinc-100 min-h-screen px-4 sm:px-16 lg:px-64 py-16">
    <h2 class="text-3xl font-bold text-left text-orange-600 mb-6">Available Cars</h2>

    <div v-if="loading" class="text-center text-orange-500 text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="car in cars" :key="car._id" :class="['relative flex flex-col bg-zinc-200 rounded-md shadow-md', car.soldout ? 'opacity-50 grayscale' : '']">
        
        <p
          v-if="car.soldout"
          class="absolute top-24 left-1/2 -translate-x-1/2 rotate-[-10deg] text-2xl font-extrabold text-white bg-red-700 px-6 py-3 rounded shadow-xl z-30 saturate-150"
        >
          Sold Out!
        </p>

        <div class="relative m-0 overflow-hidden rounded-md">
          <img :src="car.imageURL" alt="Car Image" class="w-full h-64 object-cover mb-4">
        </div>

        <div class="p-6">
          <div>
            <h4 class="font-sans text-2xl font-semibold leading-snug tracking-normal text-zinc-900">
              {{ car.brand }} - {{ car.model }}
            </h4>
            <p class="text-xl font-semibold text-orange-600 mt-1">{{ car.price }} DKK</p>
          </div>

          <p class="text-gray-600 text-sm mt-3">Engine: {{ car.engine }} | Year: {{ car.year }}</p>
          <p class="text-gray-600 text-sm mt-1">In Stock: {{ car.stock }}</p>
          <p class="text-orange-600 sm:text-md text-sm font-bold mt-3">Discount: {{ car.discountPct }}%</p>
          <router-link
            v-if="!car.soldout"
            :to="`/cars/${car._id}`"
            class="mt-4 inline-block text-center bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCars } from '../modules/useCars'

const { loading, error, cars, fetchCars } = useCars();

onMounted(() => {
  fetchCars();
});
</script>