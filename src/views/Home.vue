<template>
  <div class="bg-zinc-100 min-h-screen px-4 sm:px-16 lg:px-64 py-16">
    <h2 class="text-3xl font-bold text-left text-orange-600 mb-6">Available Cars</h2>

    <div v-if="loading" class="text-center text-orange-500 text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="car in cars" :key="car._id" class="relative flex flex-col bg-zinc-200 rounded-md shadow-md">
        
        <div class="relative m-0 overflow-hidden rounded-md">
          <img :src="car.imageURL" alt="Car Image" class="w-full h-64 object-cover mb-4">
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between">
            <h4 class="font-sans text-2xl font-semibold leading-snug tracking-normal text-zinc-900">
              {{ car.brand }} - {{ car.model }}
            </h4>

            <p class="text-xl font-semibold text-orange-600">{{ car.price }} DKK</p>
          </div>

          <p class="text-gray-600 text-sm mt-3">Engine: {{ car.engine }} | Year: {{ car.year }}</p>
          <p class="text-gray-600 text-sm mt-1">In Stock: {{ car.stock }}</p>
          <p v-if="car.isHidden" class="text-zinc-100 sm:text-lg text-sm mt-6 bg-red-600 rounded-md p-4 text-center">Sold Out!</p>
          <p v-if="car.discount" class="text-red-500 text-sm mt-1">Discount: {{ car.discount }}%</p>
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