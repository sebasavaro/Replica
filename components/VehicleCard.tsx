
import React from 'react';
import { Vehicle } from '../types';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(vehicle)}
      className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-500 overflow-hidden group border border-pink-50 flex flex-col h-full cursor-pointer active:scale-[0.98]"
    >
      {/* Imagen con Badge de Categoría */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-50">
        <img 
          src={vehicle.image} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-gray-800 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-sm border border-white/20">
            {vehicle.category}
          </span>
        </div>
      </div>
      
      {/* Contenido de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-1">{vehicle.brand}</p>
          <h3 className="font-bold text-lg text-gray-800 leading-tight uppercase tracking-tight group-hover:text-[#E97D8E] transition-colors">
            {vehicle.model}
          </h3>
        </div>

        {/* Specs Rápidas */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium">
            <i className="fa-solid fa-calendar-day text-pink-200"></i>
            {vehicle.year}
          </div>
          <div className="w-1 h-1 bg-pink-100 rounded-full"></div>
          <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium">
            <i className="fa-solid fa-road text-pink-200"></i>
            {vehicle.kilometers.toLocaleString()} km
          </div>
        </div>

        {/* Pie de Tarjeta con Precio a la izquierda y Detalle a la derecha */}
        <div className="mt-auto pt-4 border-t border-pink-50 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xl font-black text-gray-900 tracking-tighter">
              <span className="text-xs font-bold text-[#E97D8E] mr-1">{vehicle.currency === 'USD' ? 'USD' : '$'}</span>
              {vehicle.price.toLocaleString()}
            </p>
          </div>
          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-[#E97D8E] transition-colors">
            Ver detalle <i className="fa-solid fa-chevron-right ml-1 text-[8px]"></i>
          </span>
        </div>
      </div>
    </div>
  );
};
