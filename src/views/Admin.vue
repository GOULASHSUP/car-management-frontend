<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">
      <!-- add new product section -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Add Product</h2>
        <form @submit.prevent="addCarHandler" class="space-y-4 bg-[#222] p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-semibold text-white mb-4">Add New Car</h2>
          
          <div>
            <label class="block text-white font-semibold">Brand</label>
            <input v-model="newCar.brand" type="text" placeholder="Brand" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div>
            <label class="block text-white font-semibold">Model</label>
            <input v-model="newCar.model" type="text" placeholder="Model" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div>
            <label class="block text-white font-semibold">Year</label>
            <input v-model.number="newCar.year" type="number" placeholder="Year" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div>
            <label class="block text-white font-semibold">Engine</label>
            <input v-model="newCar.engine" type="text" placeholder="Engine" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div>
            <label class="block text-white font-semibold">Price (DKK)</label>
            <input v-model.number="newCar.price" type="number" placeholder="Price" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div>
            <label class="block text-white font-semibold">Stock</label>
            <input v-model.number="newCar.stock" type="number" placeholder="Stock" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" required />
          </div>

          <div class="flex items-center space-x-2">
            <input v-model="newCar.discount" type="checkbox" class="w-5 h-5" />
            <label class="text-white font-semibold">Discount</label>
          </div>

          <div v-if="newCar.discount">
            <label class="block text-white font-semibold">Discount %</label>
            <input v-model.number="newCar.discountPct" type="number" placeholder="Discount %" class="w-full p-2 border rounded bg-[#2b2b2b] text-white" />
          </div>

          <div>
            <label class="block text-white font-semibold">Image URL</label>
            <input v-model="newCar.imageURL" type="text" placeholder="Image URL" class="w-full p-2 border rounded bg-[#2b2b2b] text-white"/>
          </div>

          <div class="flex items-center space-x-2">
            <input v-model="newCar.isHidden" type="checkbox" class="w-5 h-5" />
            <label class="text-white font-semibold">Hidden Product</label>
          </div>

          <button type="submit" class="mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 w-full">
            Add Car
          </button>
        </form>
      </div>

      <!-- Edit existing products -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Products</h2>
        <div
          v-for="car in cars"
          :key="car._id"
          class="mb-4 p-4 border rounded bg-[#181818]"
        >
          <!-- Loop through the products -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              v-model="car.brand"
              type="text"
              placeholder="Name"
              class="p-2 border rounded"
            />
            <!-- Product name -->
            <input
              v-model="car.model"
              type="text"
              placeholder="Description"
              class="p-2 border rounded"
            />
            <!-- Product description -->
            <div class="p-2 border rounded">
              <span class="uppercase font-bold">Product Price: </span>
              <input
                v-model="car.price"
                type="number"
                placeholder="Price"
                class="pl-2"
              />
              <!-- Product price -->
            </div>
            <div class="p-2 border rounded">
              <span class="uppercase font-bold">Product Stock: </span>
              <input
                v-model="car.stock"
                type="number"
                placeholder="Stock"
                class="pl-2"
              />
              <!-- Product stock -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                v-model="car.discount"
                type="checkbox"
                class="border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Discount in %:</span>
              <!-- Discount in % -->
              <input
                v-model="car.discountPct"
                type="number"
                placeholder="Discount %"
                class="ml-2 pl-2"
              />
              <!-- Discount % -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                v-model="car.isHidden"
                type="checkbox"
                class="p-2 border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Hidden product</span>
              <!-- Hidden product -->
            </div>
            <input
              v-model="car.imageURL"
              type="text"
              placeholder="Image URL"
              class="p-2 border rounded h-10"
            />
            <!-- Image URL -->
            <span>
              Thumbnail img:
              <img
                :src="car.imageURL"
                alt="Product Image"
                class="w-full h-24 object-cover mb-4 rounded-lg"
              />
              <!-- Product image -->
            </span>
          </div>

          <div class="mt-4 flex space-x-2">
            <!-- Update and delete buttons -->
            <p>ID:</p>
            <!-- Product ID for testing -->
            <button
              @click="deleteCar(car._id)"
              class="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
            <!-- Delete button -->
            <button class="bg-green-600 text-white p-2 rounded hover:bg-green-700">
              Edit
            </button>

            <!-- Edit button -->
          </div>
        </div>
      </div>
    </div>
    <!-- Custom confirmation dialog -->
  </div>
</template>

<script setup lang="ts">
import { useCars } from "../modules/useCars";
import { onMounted, ref } from "vue";
//import type { Car } from "../interfaces/interfaces";

const {
  cars,
  loading,
  error,
  fetchCars,
  addCar,
  //updateCar,
  deleteCar,
  getTokenAndUserId,
} = useCars();

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
  isHidden: false,
  imageURL: "",
  _createdBy: "",
});

const addCarHandler = async () => {
  const { userId } = getTokenAndUserId(); // Get the user ID from the useProduct module
  newCar.value._createdBy = userId; // Assign the user ID to the new product
  await addCar(newCar.value); // Add the new product
  newCar.value = {
    ...newCar.value,
  };
};

/*
const editCarHandler = async (car: Car) => {
  await updateCar(car._id, car);
};
*/

</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696;
}

input[type="checkbox"] {
  accent-color: var(--input-field-color);
}
</style>