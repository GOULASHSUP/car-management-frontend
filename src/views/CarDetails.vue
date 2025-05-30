<template>
    <div class="min-h-screen bg-zinc-100 px-4 sm:px-16 lg:px-64 py-16">
        <div v-if="loading" class="text-center text-orange-600">Loading...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="car" class="bg-white p-6 rounded-lg shadow-md">
            <img :src="car.imageURL" alt="Car Image" class="w-full h-80 object-cover rounded mb-4" />
            <h2 class="text-3xl font-bold text-zinc-800 mb-2">{{ car.brand }} - {{ car.model }}</h2>
            <p class="text-orange-600 font-semibold text-xl">{{ car.price }} DKK</p>
            <p class="mt-2 text-zinc-600">Engine: {{ car.engine }}</p>
            <p class="text-zinc-600">Year: {{ car.year }}</p>
            <p class="text-zinc-600">Stock: {{ car.stock }}</p>
            <p class="text-zinc-600">Discount: {{ car.discountPct }}%</p>
            <p v-if="car.soldout" class="text-red-600 font-bold mt-4">Sold Out!</p>
        </div>
        <div>
            <router-link
                to="/"
                class="mt-6 inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
            >
                Back
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Car } from '../interfaces/interfaces';
import { getCarById } from '../modules/useCars';

const route = useRoute();
console.log("Route ID:", route.params.id);
const car = ref<Car | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
    try {
        const result = await getCarById(route.params.id as string);
        car.value = result;
        console.log("API result:", result);
    } catch (err: any) {
        error.value = 'Car not found.';
    } finally {
        loading.value = false;
    }
});
</script>