
import { Vehicle } from './types';

export const BRAND_LOGO_URL = "https://drive.google.com/file/d/1AbVPDPBJhuh6ACBvc645T64m1y3H-6T6/view?usp=sharing"; 

export const VEHICLES: Vehicle[] = [
  {
    id: 'P1948',
    brand: 'Renault',
    model: 'Logan',
    year: 2024,
    price: 33000000,
    currency: 'ARS',
    kilometers: 180689,
    fuel: 'Diesel',
    transmission: 'Automática',
    images: [
      '1drui2WjblQPeLvdL-38nbdL9LslYI7-U',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Auto'
  },
  {
    id: 'M2023',
    brand: 'Bajaj',
    model: 'Rouser 200',
    year: 2024,
    price: 5800000,
    currency: 'ARS',
    kilometers: 1800,
    fuel: 'Nafta',
    transmission: 'Manual',
    images: [
      '1ztydiORv6PI-8PtQP5W2uG0zhGF3o5KK',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Moto'
  },
  {
    id: 'P2090',
    brand: 'Volkswagen',
    model: 'Amarok',
    year: 2018,
    price: 24900000,
    currency: 'ARS',
    kilometers: 231594,
    fuel: 'Nafta y GNC',
    transmission: 'Automática',
    images: [
      '1CAfdRVFN2aKabi-aEgDNBBPaWNmsi_TI',
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
  { name: 'Andrés', image: 'https://44653809.fs1.hubspotusercontent-na1.net/hubfs/44653809/cualidades-para-ser-un-empresario-exitoso.jpg' },
  { name: 'Rodrigo', image: 'https://st2.depositphotos.com/3889193/8014/i/450/depositphotos_80142372-stock-photo-confident-businessman-posing-at-desk.jpg' }
];
