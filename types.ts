
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
  images: string[]; // Cambiado de image a images
  category: string;
}

export interface FilterState {
  search: string;
  brand: string;
  category: string;
  minYear: number;
}
