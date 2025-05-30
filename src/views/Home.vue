<template>
  <div class="bg-zinc-100 min-h-screen px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-10 md:py-16">
    <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-left text-orange-600 mb-6">Available Cars</h2>

    <div v-if="loading" class="text-center text-orange-500 text-lg">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-lg">{{ error }}</div>

    <div v-else>
      <div class="mb-6">
        <select id="sort" v-model="sortBy" class="bg-orange-600 rounded px-2 py-2 text-md text-zinc-100">
          <option value="default">Default Sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount">Highest Discount</option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div v-for="car in paginatedCars" :key="car._id" :class="['relative flex flex-col bg-zinc-200 rounded-md shadow-md', car.soldout ? 'opacity-50 grayscale' : '']">
          
          <p
            v-if="car.soldout"
            class="absolute top-24 left-1/2 -translate-x-1/2 rotate-[-10deg] sm:text-1xl text-md font-extrabold text-white bg-red-700 px-6 py-3 rounded shadow-xl z-30 saturate-150"
          >
            Sold Out!
          </p>

          <div class="relative m-0 overflow-hidden rounded-md">
            <img :src="car.imageURL" alt="Car Image" class="w-full aspect-video object-cover mb-4">
          </div>

          <div class="p-6">
            <div>
              <h4 class="font-sans sm:text-2xl text-lg font-semibold leading-snug tracking-normal text-zinc-900">
                {{ car.brand }} - {{ car.model }}
              </h4>
              <div class="flex flex-wrap items-center gap-2 mt-1">
                <p class="sm:text-xl text-lg font-semibold"
                    :class="car.discountPct > 0 ? 'text-gray-500 line-through' : 'text-orange-600'">
                    {{ car.price }} DKK
                </p>
                <p v-if="car.discountPct > 0" class="bg-green-500 px-2 py-1 rounded-xl sm:text-base text-sm font-bold">
                  <span class="text-green-100">Price:</span>
                  <span class="text-zinc-100 ml-1">{{ (car.price * (1 - car.discountPct / 100)).toFixed(0) }} DKK</span>
                </p>
              </div>
            </div>
            <p v-if="car.discountPct > 0" class="text-orange-600 sm:text-md text-sm font-bold mt-2 mb-4">
              Discount: {{ car.discountPct }}%
            </p>
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
      <div class="mt-6 flex justify-center items-center gap-4">
        <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span class="text-zinc-700 font-medium">Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCars } from '../modules/useCars'

const { loading, error, cars, fetchCars } = useCars();

const sortBy = ref('default');

const currentPage = ref(1);
const pageSize = 8;

const paginatedCars = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return cars.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(cars.value.length / pageSize));

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

watch(sortBy, (newVal) => {
  if (newVal === 'price-asc') {
    cars.value.sort((a, b) => a.price - b.price);
  } else if (newVal === 'price-desc') {
    cars.value.sort((a, b) => b.price - a.price);
  } else if (newVal === 'discount') {
    cars.value.sort((a, b) => b.discountPct - a.discountPct);
  } else {
    fetchCars();
  }
  currentPage.value = 1;
});

onMounted(() => {
  fetchCars();
});
</script>