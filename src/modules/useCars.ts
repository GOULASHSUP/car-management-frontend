import { ref } from "vue";
import type { Car, newCar } from "../interfaces/interfaces";

export const useCars = () => {
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const cars = ref<Car[]>([]);

  const fetchCars = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch(
        "https://ments-api.onrender.com/api/cars"
      );
      if (!response.ok) {
        throw new Error("No data available");
      }
      const data: Car[] = await response.json();
      cars.value = data;
      console.log("Cars fetched successfully", cars.value);
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const getTokenAndUserId = (): { token: string; userId: string } => {
    const token = localStorage.getItem("lsToken");
    const userId = localStorage.getItem("userIdToken");
    if (!token) {
      throw new Error("No token available");
    }
    if (!userId) {
      throw new Error("No user id available");
    }
    return { token, userId };
  };

  const validateCar = (Car: newCar): void => {
    if (!Car.brand) {
      throw new Error("Car name is required");
    }
  };

  const setDefaultValues = (Car: newCar, userId: string) => {
    return {
      brand: Car.brand,
      model: Car.model || "Car Description Default Value",
      year: Car.year || 2021,
      engine: Car.engine || "2.0L",
      imageURL: Car.imageURL || "https://picsum.photos/500/500",
      price: Car.price || 2,
      stock: Car.stock || 45,
      discount: Car.discount || false,
      discountPct: Car.discountPct || 0,
      soldout: Car.soldout || false,
      _createdBy: userId,
    };
  };

  const addCar = async (Car: newCar): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      validateCar(Car);
      const CarWithDefaults = setDefaultValues(Car, userId);

      const response = await fetch(
        "https://ments-api.onrender.com/api/cars",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(CarWithDefaults),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "No data available");
      }
      const newCar: Car = await response.json();
      cars.value.push(newCar);
      console.log("Car added successfully", newCar);
      await fetchCars();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const updateCar = async (id: string, updatedCar: Partial<Car>): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      
      const response = await fetch(`https://ments-api.onrender.com/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(updatedCar),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error updating car:", errorResponse);
        throw new Error(errorResponse.error || "Failed to update car");
      }
  
      console.log("Car updated successfully");
  
      // Fetch again to refresh the list
      await fetchCars();
    } catch (err) {
      console.error("Failed to update car:", err);
      error.value = (err as Error).message;
    }
  };


  const deleteCarFromServer = async (
    id: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(
      `https://ments-api.onrender.com/api/cars/${id}`,
      {
        method: "DELETE",
        headers: {
          "auth-token": token,
        },
      }
    );
    if (!response.ok) {
      console.log("Car not deleted");
      throw new Error("No data available");
    }
  };

  const removeCarFromState = (id: string): void => {
    cars.value = cars.value.filter((car) => car._id !== id);
    console.log("Car deleted successfully", id);
  };

  const deleteCar = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();
      await deleteCarFromServer(id, token);
      removeCarFromState(id);
      console.log("Deleting Car with id", id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  return {
    error,
    loading,
    cars,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    getTokenAndUserId,
  };
};

export async function getCarById(id: string): Promise<Car> {
  try {
    const response = await fetch(`https://ments-api.onrender.com/api/cars/${id}`);
    if (!response.ok) {
      throw new Error("Car not found");
    }
    const result = await response.json();
    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    }
    throw new Error("Car not found");
  } catch (error) {
    throw error;
  }
}