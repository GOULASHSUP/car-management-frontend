<template>
  <div class="bg-zinc-100 min-h-screen py-10">
    <button
      @click="handleLogout"
      class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 mb-6 w-fit mx-6 sm:float-right sm:mr-10 lg:fixed lg:top-24 lg:right-10 lg:z-50"
    >
      Logout
    </button>
    <LoadingMessage v-if="loading" />
    <div v-else-if="error" class="text-center text-lg text-red-600 font-semibold">{{ error }}</div>

    <div class="sm:px-64 px-6" v-if="!loading">
      <div v-if="showToast" class="fixed top-24 right-6 z-50 bg-green-500 text-white py-2 px-4 rounded shadow-md text-sm sm:text-base transition duration-300">
        {{ toastMessage }}
      </div>
      
      <!-- Add a new car section -->
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-3xl font-semibold text-zinc-700 mb-6">Add a New Car</h2>
        <form @submit.prevent="addCarHandler" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label class="block text-zinc-700 font-semibold">Brand</label>
            <input v-model="newCar.brand" type="text" placeholder="Enter brand" 
              minlength="1" maxlength="20"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div>
            <label class="block text-zinc-700 font-semibold">Model</label>
            <input v-model="newCar.model" type="text" placeholder="Enter model" 
              minlength="1" maxlength="20"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div>
            <label class="block text-zinc-700 font-semibold">Year</label>
            <input v-model.number="newCar.year" type="number" placeholder="Enter year" 
              :max="new Date().getFullYear()" min="1886"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div>
            <label class="block text-zinc-700 font-semibold">Engine</label>
            <input v-model="newCar.engine" type="text" placeholder="Enter engine type" 
              minlength="1" maxlength="20"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div>
            <label class="block text-zinc-700 font-semibold">Price (DKK)</label>
            <input v-model.number="newCar.price" type="number" placeholder="Enter price" 
              min="1" max="10000000"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div>
            <label class="block text-zinc-700 font-semibold">Stock</label>
            <input v-model.number="newCar.stock" type="number" placeholder="Enter stock amount" 
              min="1" max="10000"
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" required />
          </div>

          <div class="col-span-2 flex items-center space-x-3">
            <input v-model="newCar.discount" type="checkbox" class="w-5 h-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded-md" />
            <label class="text-zinc-700 font-semibold">Apply Discount</label>
          </div>

          <div v-if="newCar.discount" class="col-span-2">
            <label class="block text-zinc-700 font-semibold">Discount %</label>
            <input v-model.number="newCar.discountPct" type="number" placeholder="Enter discount percentage" 
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div class="col-span-2">
            <label class="block text-zinc-700 font-semibold">Image URL</label>
            <input v-model="newCar.imageURL" type="text" placeholder="Enter image URL" 
              class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" />
          </div>

          <div class="col-span-2 flex items-center space-x-3">
            <input v-model="newCar.soldout" type="checkbox" class="w-5 h-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded-md" />
            <label class="text-zinc-700 font-semibold">Sold Out</label>
          </div>

          <div class="col-span-2">
            <button type="submit" class="bg-orange-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-500">
              Add Car
            </button>
          </div>
        </form>
      </div>

      <!-- Edit existing cars -->
      <div class="py-6 space-y-6">
        <h2 class="text-3xl font-semibold text-zinc-700 mb-6">Edit added cars</h2>
        <div v-for="car in cars" :key="car._id" class="bg-white p-6 rounded-lg shadow-md border border-zinc-300">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input v-model="car.brand" type="text" placeholder="Brand" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />
            <input v-model="car.model" type="text" placeholder="Model" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />
            <input v-model.number="car.year" type="number" placeholder="Year" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />
            <input v-model="car.engine" type="text" placeholder="Engine" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />
            <input v-model.number="car.price" type="number" placeholder="Price (DKK)" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />
            <input v-model.number="car.stock" type="number" placeholder="Stock" class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500" />

            <div class="col-span-2 flex items-center space-x-3">
              <input v-model="car.discount" type="checkbox" class="w-5 h-5 text-orange-500 border-gray-300 rounded-md" />
              <label class="text-zinc-700 font-semibold">Apply Discount</label>
            </div>

            <div v-if="car.discount" class="col-span-2">
              <label class="block text-zinc-700 font-semibold">Discount %</label>
              <input v-model.number="car.discountPct" type="number" placeholder="Enter discount percentage" 
                class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div class="col-span-2">
              <label class="block text-zinc-700 font-semibold">Image URL</label>
              <input v-model="car.imageURL" type="text" placeholder="Image URL" 
                class="w-full p-3 border rounded bg-zinc-100 text-zinc-700 focus:ring-orange-500 focus:outline-none" />
            </div>

            <div class="col-span-2 flex items-center space-x-3">
              <input
                v-model="car.soldout"
                type="checkbox"
                class="w-5 h-5 border-gray-300 rounded-md"
              />
              <label class="text-zinc-700 font-semibold">Sold Out</label>
            </div>

            <div class="col-span-2 flex flex-col items-left">
              <span class="text-zinc-600 font-medium">Thumbnail:</span>
              <img :src="car.imageURL" alt="Car Image" class="w-40 h-24 object-cover rounded-lg border mt-2" />
            </div>
          </div>

          <div class="mt-6 space-x-4">
            <button
              @click="() => { try { deleteCar(car._id); triggerToast('Car deleted.') } catch { triggerToast('Error: Not authorized to delete') } }"
              class="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-500"
            >
              Delete
            </button>
            <button
              @click="() => { try { updateCar(car._id, car); triggerToast('Car updated.') } catch { triggerToast('Error: Not authorized to update') } }"
              class="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useCars } from "../modules/useCars";
import { onMounted, ref } from "vue";
import LoadingMessage from "../components/LoadingMessage.vue";
import { useRouter } from 'vue-router';
import { useUsers } from '../modules/auth/useUsers';

const {
  cars,
  loading,
  error,
  fetchCars,
  addCar,
  updateCar,
  deleteCar,
  getTokenAndUserId,
} = useCars();

const router = useRouter();
const { logoutUser } = useUsers();

const handleLogout = () => {
  logoutUser();
  router.push("/auth");
};

const toastMessage = ref("");
const showToast = ref(false);

function triggerToast(message: string) {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 5000);
}

onMounted(() => {
  fetchCars();
});

const newCar = ref({
  brand: "",
  model: "",
  year: 0,
  engine: "",
  price: 0,
  stock: 0,
  discount: false,
  discountPct: 0,
  soldout: false,
  imageURL: "",
  _createdBy: "",
});

const addCarHandler = async () => {
  try {
    const { userId } = getTokenAndUserId();
    newCar.value._createdBy = userId;
    await addCar(newCar.value);
    triggerToast("Car successfully added!");
    newCar.value = { ...newCar.value };
  } catch (err: any) {
    triggerToast("Error: Unauthorized or failed to add car.");
  }
};

</script>