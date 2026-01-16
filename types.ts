
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: 'USD' | 'ARS';
  kilometers: number;
  fuel: string;
  transmission: 'Manual' | 'Automática';
  image: string;
  category: string;
}

export interface FilterState {
  search: string;
  brand: string;
  category: string;
  minYear: number;
}
