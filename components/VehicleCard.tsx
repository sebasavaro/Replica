
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { getDirectImageUrl } from '../App';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <div 
      onClick={() => onSelect(vehicle)}
      className="bg-white rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(233,125,142,0.3)] transition-all duration-500 overflow-hidden group border border-pink-100/50 flex flex-col h-full cursor-pointer active:scale-[0.98]"
    >
      {/* Imagen con Carrusel */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gray-100">
        <img 
          src={getDirectImageUrl(vehicle.images[currentImgIndex])} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Controles de Carrusel en Hover */}
        {vehicle.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImg}
              className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-[#E97D8E] hover:bg-[#E97D8E] hover:text-white transition-all"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </button>
            <button 
              onClick={nextImg}
              className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-[#E97D8E] hover:bg-[#E97D8E] hover:text-white transition-all"
            >
              <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        )}

        {/* Indicadores de Imágenes */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 backdrop-blur-sm px-2 py-1 rounded-full">
          {vehicle.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`}
            ></div>
          ))}
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-white shadow-md text-gray-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.15em] border border-pink-50">
            {vehicle.category}
          </span>
        </div>
      </div>
      
      {/* Contenido de la Tarjeta */}
      <div className="p-7 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-[11px] font-black text-[#E97D8E] uppercase tracking-[0.2em] mb-1.5">{vehicle.brand}</p>
          <h3 className="font-extrabold text-xl text-gray-900 leading-tight uppercase tracking-tight group-hover:text-[#E97D8E] transition-colors">
            {vehicle.model}
          </h3>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
            <i className="fa-solid fa-calendar-day text-[#E97D8E]"></i>
            {vehicle.year}
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
            <i className="fa-solid fa-road text-[#E97D8E]"></i>
            {vehicle.kilometers.toLocaleString()} km
          </div>
        </div>

        <div className="mt-auto pt-5 border-t-2 border-pink-50 flex items-center justify-between">
          <div className="text-left">
            <p className="text-2xl font-black text-gray-900 tracking-tighter">
              <span className="text-sm font-black text-[#E97D8E] mr-1">{vehicle.currency === 'USD' ? 'USD' : '$'}</span>
              {vehicle.price.toLocaleString()}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-[#E97D8E] group-hover:bg-[#E97D8E] group-hover:text-white transition-all shadow-inner">
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
