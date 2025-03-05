import { ref } from "vue";
import type { Car } from "../interfaces/interfaces";

export const useCars = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const cars = ref<Car[]>([]);

  const fetchCars = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch(
        "http://localhost:4000/api/cars"
      );
      if (!response.ok) {
        throw new Error("No data available");
      }
      const data: Car[] = await response.json();
      cars.value = data;
      console.log("Car fetched successfully", cars.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return {
    error,
    loading,
    cars,
    fetchCars,
  };
};