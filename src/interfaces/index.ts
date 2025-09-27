export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };

  // run time only
  quantity?: number;
}

export interface IOrder {
  _id?: string;
  user: string;
  items: IProduct[];
  totalAmount: number;
  status: "order_placed" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}