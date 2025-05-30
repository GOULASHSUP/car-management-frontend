<template>
    <div class="min-h-screen bg-zinc-100 px-4 sm:px-6 lg:px-12 py-10 sm:py-12 flex flex-col items-center">
        <div v-if="loading" class="text-center text-orange-600">Loading...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="car" class="bg-zinc-200 p-6 sm:p-8 rounded-2xl shadow-xl border max-w-full sm:max-w-2xl lg:max-w-3xl w-full">
            <div class="relative overflow-hidden rounded-xl aspect-video mb-6">
                <img :src="car.imageURL" alt="Car Image" class="w-full h-full object-cover" />
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-800 mb-3 tracking-tight">{{ car.brand }} {{ car.model }}</h2>
            <p class="text-lg sm:text-xl lg:text-2xl font-bold mb-4"
                :class="car.discountPct > 0 ? 'text-gray-500 line-through' : 'text-orange-600'">
                {{ car.price }} DKK
            </p>
            <p v-if="car.discountPct > 0" class="bg-green-500 px-3 sm:px-4 py-2 rounded-xl font-bold text-white text-sm sm:text-base lg:text-lg mb-4">
                <span class="text-white">Discount Price:</span>
                <span class="text-zinc-100 ml-2">{{ (car.price * (1 - car.discountPct / 100)).toFixed(0) }} DKK</span>
            </p>

            <ul class="space-y-1 text-zinc-600 text-sm sm:text-base lg:text-lg mb-6">
                <li><strong>Engine:</strong> {{ car.engine }}</li>
                <li><strong>Year:</strong> {{ car.year }}</li>
                <li><strong>Stock:</strong> {{ car.stock }}</li>
                <li v-if="car.discountPct > 0"><strong>Discount:</strong> {{ car.discountPct }}%</li>
            </ul>

            <p v-if="car.soldout" class="text-center text-white bg-red-600 py-2 px-4 rounded font-bold text-base sm:text-lg">
                Sold Out!
            </p>
            <div class="mt-6 text-left">
                <router-link
                    to="/"
                    class="inline-block bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                >
                    Back
                </router-link>
            </div>
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