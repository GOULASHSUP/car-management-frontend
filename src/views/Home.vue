<template>
  <div class="bg-gray-50 min-h-screen px-4 sm:px-16 lg:px-64 py-16">
    <h2 class="text-3xl font-bold text-left text-orange-600 mb-6">Available Cars</h2>

    <div v-if="loading" class="text-center text-orange-500 text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="car in cars" :key="car._id" class="relative flex flex-col bg-white rounded-md shadow-md">
        
        <!-- Car Image Section -->
        <div class="relative m-0 overflow-hidden rounded-md">
          <img :src="car.imageURL" alt="Car Image" class="w-full h-64 object-cover mb-4">
        </div>

        <!-- Car Details Section -->
        <div class="p-6">
          <div class="flex items-center justify-between">
            <!-- Car Brand and Model -->
            <h4 class="font-sans text-2xl font-semibold leading-snug tracking-normal text-gray-900">
              {{ car.brand }} - {{ car.model }}
            </h4>
            
            <!-- Price -->
            <p class="text-xl font-semibold text-orange-600">{{ car.price }} DKK</p>
          </div>

          <p class="text-gray-600 text-sm mt-3">Engine: {{ car.engine }} | Year: {{ car.year }}</p>
          <p class="text-gray-600 text-sm mt-1">Stock: {{ car.stock }}</p>

          <!-- Discount (if exists) -->
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