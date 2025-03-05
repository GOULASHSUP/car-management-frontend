<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold">Admin Panel - Manage Cars 🚗</h1>
  
      <form @submit.prevent="addCar" class="mt-4 bg-gray-100 p-4 rounded">
        <input v-model="newCar.make" placeholder="Make" class="p-2 border rounded w-full mb-2" required />
        <input v-model="newCar.model" placeholder="Model" class="p-2 border rounded w-full mb-2" required />
        <input v-model="newCar.year" placeholder="Year" type="number" class="p-2 border rounded w-full mb-2" required />
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Car</button>
      </form>
  
      <div v-for="car in cars" :key="car._id" class="mt-4 p-4 bg-gray-100 rounded">
        <h2 class="text-lg font-bold">{{ car.make }} - {{ car.model }}</h2>
        <p>Year: {{ car.year }}</p>
  
        <button @click="editCar(car)" class="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
        <button @click="deleteCar(car._id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
      </div>
  
      <router-link to="/" class="mt-4 block bg-gray-700 text-white px-4 py-2 rounded text-center">Back to Homepage</router-link>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        cars: [],
        newCar: { make: "", model: "", year: "" },
      };
    },
    methods: {
      async fetchCars() {
        try {
          const response = await axios.get("http://localhost:3000/cars");
          this.cars = response.data;
        } catch (error) {
          console.error("Error fetching cars:", error);
        }
      },
      async addCar() {
        try {
          await axios.post("http://localhost:3000/cars", this.newCar);
          this.fetchCars();
          this.newCar = { make: "", model: "", year: "" };
        } catch (error) {
          console.error("Error adding car:", error);
        }
      },
      async deleteCar(carId) {
        try {
          await axios.delete(`http://localhost:3000/cars/${carId}`);
          this.fetchCars();
        } catch (error) {
          console.error("Error deleting car:", error);
        }
      },
      editCar(car) {
        this.newCar = { ...car };
      }
    },
    mounted() {
      this.fetchCars();
    }
  };
  </script>