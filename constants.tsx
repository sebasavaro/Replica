
import { Vehicle } from './types';

export const BRAND_LOGO_URL = "https://drive.google.com/file/d/1AbVPDPBJhuh6ACBvc645T64m1y3H-6T6/view?usp=sharing"; 

export const VEHICLES: Vehicle[] = [
  {
    id: 'P1948',
    brand: 'Chevrolet',
    model: 'S10 2.8TD 4X4 LTZ AT',
    year: 2018,
    price: 33000000,
    currency: 'ARS',
    kilometers: 180689,
    fuel: 'Diesel',
    transmission: 'Automática',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Auto'
  },
  {
    id: 'M2023',
    brand: 'Honda',
    model: 'CB 250 Twister',
    year: 2023,
    price: 5800000,
    currency: 'ARS',
    kilometers: 1200,
    fuel: 'Nafta',
    transmission: 'Manual',
    images: [
      'https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Moto'
  },
  {
    id: 'P2090',
    brand: 'Fiat',
    model: 'Toro Freedom 4x2 1.8',
    year: 2018,
    price: 24900000,
    currency: 'ARS',
    kilometers: 231594,
    fuel: 'Nafta y GNC',
    transmission: 'Automática',
    images: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Auto'
  },
  {
    id: 'M2024',
    brand: 'BMW',
    model: 'R 1250 GS Adventure',
    year: 2024,
    price: 45000,
    currency: 'USD',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Manual',
    images: [
      'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Moto'
  }
];

export const BRANDS = ['BMW', 'Chevrolet', 'Fiat', 'Honda', 'Toyota', 'Volkswagen', 'Kawasaki', 'Yamaha'];

export const CIRCULAR_CATEGORIES = [
  { name: 'Bancos', icon: 'fa-building-columns' },
  { name: 'Financiación', icon: 'fa-hand-holding-dollar' },
  { name: 'Autos', icon: 'fa-car' },
  { name: 'Motos', icon: 'fa-motorcycle' }
];

export const SELLERS = [
  { name: 'Maxi Ahualli', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
  { name: 'Consuelo Tagliafico', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' }
];
