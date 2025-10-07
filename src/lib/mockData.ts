import { User, Product, Order,ProductC } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '1234567890',
    role: 'seller',
    profileImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952',
    userAdditional: {
      id: 1,
      customorder: true
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '0987654321',
    role: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    userAdditional: {
      id: 2,
      customorder: false
    }
  }
];

export const mockProducts: Product[] = [
  {
    id: '101',
    image: 'https://images.unsplash.com/photo-1518069024422-79b44c53cb83?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Organic Apples',
    price: 2.99,
    category: { id: 1, name: 'Fruits' },
    description: 'Freshly picked organic apples from local farms.',
    sellunit: 'kg',
    seller: mockUsers[0],
  },
  {
    id: '102',
    image: 'https://images.unsplash.com/photo-1560807707-8cc756ca4fdf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D%3D',
    name: 'Fresh Carrots',
    price: 1.49,
    category: { id: 2, name: 'Vegetables' },
    description: 'Crisp and sweet carrots, perfect for snacking.',
    sellunit: 'kg',
    seller: mockUsers[1],
  },
  {
    id: '103',
    image: 'https://images.unsplash.com/photo-1608686264061-c73bf3903387?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D',
    name: 'Sweet Bananas',
    price: 0.79,
    category: { id: 1, name: 'Fruits' },
    description: 'Ripe and delicious bananas, a healthy treat.',
    sellunit: 'pic',
    seller: mockUsers[0],
  },
  {
    id: '104',
    image: 'https://images.unsplash.com/photo-1563734247033-9ca7a6cb6645?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D%3D',
    name: 'Green Broccoli',
    price: 1.99,
    category: { id: 2, name: 'Vegetables' },
    description: 'Nutritious green broccoli, great for any meal.',
    sellunit: 'kg',
    seller: mockUsers[1],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    orderProducts: [],
    orderdate: new Date(),
    finalprice: 5.98,
    seller: mockUsers[0],
    buyer: mockUsers[1],
    status: 'pending',
    locality: 'Downtown',
    city: 'Los Angeles',
    state: 'CA',
    district: 'LA District',
    pincode: '90001',
  },
  {
    id: 'order2',
    orderProducts: [],
    orderdate: new Date(),
    finalprice: 1.49,
    seller: mockUsers[1],
    buyer: mockUsers[0],
    status: 'confirmed',
    locality: 'Midtown',
    city: 'New York',
    state: 'NY',
    district: 'NY District',
    pincode: '10001',
  },
];

export const allCategories = ["All", "Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Beverages"];
export const allLocations = ["All", "New York", "Los Angeles", "Chicago", "Miami"];


export const mockProductCs: ProductC[]  = [
  { id: "101", name: "Organic Rice", price: 120, category: "Groceries" },
  { id: "102", name: "Bamboo Toothbrush", price: 40, category: "Personal Care" },
  { id: "103", name: "Reusable Bags", price: 80, category: "Home" },
  { id: "104", name: "Eco-friendly Dishwash", price: 100, category: "Kitchen" },
  { id: "105", name: "Organic Tea", price: 60, category: "Groceries" },
  { id: "106", name: "Natural Shampoo", price: 150, category: "Personal Care" },
  { id: "107", name: "Hemp Sandals", price: 250, category: "Fashion" },
  { id: "108", name: "Solar Charger", price: 350, category: "Electronics" }
];
