
import React from 'react';
// @ts-ignore: Assuming BRANDS and CIRCULAR_CATEGORIES are available as seen in constants.tsx
import { BRANDS, CIRCULAR_CATEGORIES } from '../constants';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  // Extract category names from CIRCULAR_CATEGORIES constant
  const categories = CIRCULAR_CATEGORIES.map(c => c.name);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-sliders text-blue-600"></i>
          Filtros
        </h2>
        
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Búsqueda</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ej: Hilux..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
              <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Marca</label>
            <select 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={filters.brand}
              onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            >
              <option value="">Todas las marcas</option>
              {BRANDS.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Categoría</label>
            <div className="space-y-2">
              <button 
                onClick={() => setFilters({ ...filters, category: '' })}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${filters.category === '' ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilters({ ...filters, category: cat })}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${filters.category === cat ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Desde el año</label>
            <input 
              type="number" 
              placeholder="2015"
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={filters.minYear || ''}
              onChange={(e) => setFilters({ ...filters, minYear: parseInt(e.target.value) || 0 })}
            />
          </div>

          <button 
            onClick={() => setFilters({ search: '', brand: '', category: '', minYear: 0 })}
            className="w-full py-3 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
    </aside>
  );
};
