export type Car = {
    _id: string;
    brand: string;
    model: string;
    year: number;
    engine: string;
    imageURL: string;
    price: number;
    stock: number;
    discount: boolean;
    discountPct: number;
    isHidden: boolean;
    _createdBy: string;
  };
  export type newCar = Omit<Car, "_id"> & {
    _createdBy?: string;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    registerDate: string;
  };