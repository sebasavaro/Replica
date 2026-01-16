
import React, { useState, useMemo, useEffect } from 'react';
import { VehicleCard } from './components/VehicleCard';
import { VEHICLES, CIRCULAR_CATEGORIES, SELLERS, BRAND_LOGO_URL, BRANDS } from './constants';
import { FilterState, Vehicle } from './types';

type Page = 'Inicio' | 'Catálogo' | 'Financiación' | 'Vendé tu Auto' | 'Detalle';

// Función de utilidad para transformar IDs de Drive o URLs en enlaces directos de imagen
export const getDirectImageUrl = (urlOrId: string) => {
  if (!urlOrId) return '';
  // Si parece un ID de Drive (longitud típica y sin protocolos)
  if (!urlOrId.startsWith('http') && urlOrId.length > 20) {
    return `https://lh3.googleusercontent.com/d/${urlOrId}`;
  }
  // Si es una URL de Drive completa
  if (urlOrId.includes('drive.google.com')) {
    const idMatch = urlOrId.match(/\/d\/([^/]+)/) || urlOrId.match(/id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }
  return urlOrId;
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Inicio');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0); 
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: '',
    category: '',
    minYear: 1956
  });

  const [sortOrder, setSortOrder] = useState('aleatorio');
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedVehicle]);

  const directLogoUrl = getDirectImageUrl(BRAND_LOGO_URL);

  const filteredVehicles = useMemo(() => {
    let result = VEHICLES.filter(v => {
      const matchSearch = v.model.toLowerCase().includes(filters.search.toLowerCase()) || 
                          v.brand.toLowerCase().includes(filters.search.toLowerCase());
      const matchBrand = filters.brand === '' || v.brand === filters.brand;
      const matchCategory = filters.category === '' || 
                            (filters.category === 'Autos' && v.category === 'Auto') ||
                            (filters.category === 'Motos' && v.category === 'Moto');
      const matchYear = v.year >= filters.minYear;
      
      return matchSearch && matchBrand && matchCategory && matchYear;
    });

    if (sortOrder === 'mas-nuevos') result.sort((a, b) => b.year - a.year);
    if (sortOrder === 'menor-precio') result.sort((a, b) => a.price - b.price);
    if (sortOrder === 'mayor-precio') result.sort((a, b) => b.price - a.price);

    return result;
  }, [filters, sortOrder]);

  const navigateToDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setActiveImgIndex(0); 
    setCurrentPage('Detalle');
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setSelectedVehicle(null);
  };

  const nextCarousel = () => {
    const maxIndex = Math.max(0, VEHICLES.length - 3);
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevCarousel = () => {
    const maxIndex = Math.max(0, VEHICLES.length - 3);
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const renderCatalogo = () => (
    <section className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-pink-100 p-4 md:p-8 mb-16 sticky top-24 z-30 backdrop-blur-xl bg-white/95">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">¿Qué buscás?</span>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Marca o modelo..."
                className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-2xl py-4 px-12 text-sm font-bold text-gray-800 outline-none focus:border-[#E97D8E] focus:bg-white transition-all shadow-inner"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[#E97D8E] text-lg"></i>
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Marca</span>
            <select 
              className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-2xl py-4 px-5 text-sm font-black text-gray-800 outline-none cursor-pointer focus:border-[#E97D8E] focus:bg-white transition-all shadow-inner"
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            >
              <option value="">Todas las marcas</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Tipo de vehículo</span>
            <div className="flex bg-pink-100/50 p-1.5 rounded-2xl border-2 border-pink-100 h-[60px] shadow-inner">
              {['', 'Autos', 'Motos'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`flex-1 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${filters.category === cat ? 'bg-white text-[#E97D8E] shadow-md border border-pink-50' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {cat || 'Todos'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 ml-4">Ordenar por</span>
            <select 
              className="w-full bg-pink-50/50 border-2 border-pink-100 rounded-2xl py-4 px-5 text-sm font-black text-gray-800 outline-none cursor-pointer focus:border-[#E97D8E] focus:bg-white transition-all shadow-inner"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="aleatorio">Aleatorio</option>
              <option value="mas-nuevos">Más nuevos</option>
              <option value="menor-precio">Menor precio</option>
              <option value="mayor-precio">Mayor precio</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredVehicles.map(v => (
          <VehicleCard key={v.id} vehicle={v} onSelect={navigateToDetail} />
        ))}
      </div>
    </section>
  );

  const renderInicio = () => (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase mb-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-tighter leading-[1.1]">
            Donde tus sueños <br/> <span className="text-[#E97D8E] italic">se ponen en marcha</span>
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto font-bold leading-relaxed text-gray-100 drop-shadow-md">
            En Autodream transformamos la búsqueda de tu vehículo en una experiencia placentera. Calidad certificada y atención personalizada.
          </p>
          <button 
            onClick={() => navigateToPage('Catálogo')}
            className="bg-[#E97D8E] text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white hover:text-[#E97D8E] transition-all border-2 border-[#E97D8E] shadow-xl text-sm active:scale-95"
          >
            Ver Catálogo <i className="fa-solid fa-chevron-right ml-2"></i>
          </button>
        </div>
      </section>

      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {CIRCULAR_CATEGORIES.map((cat, i) => (
              <div 
                key={i} 
                onClick={() => {
                  if (cat.name === 'Autos' || cat.name === 'Motos') {
                    setFilters({...filters, category: cat.name});
                    navigateToPage('Catálogo');
                  } else if (cat.name === 'Financiación') {
                    navigateToPage('Financiación');
                  }
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-pink-100/50 p-3 flex items-center justify-center transition-all duration-500 bg-pink-50/50 shadow-sm group-hover:shadow-md group-hover:border-[#E97D8E] group-hover:bg-white">
                  <div className="w-full h-full rounded-full bg-white shadow-inner flex items-center justify-center text-3xl md:text-4xl text-[#E97D8E] group-hover:bg-[#E97D8E] group-hover:text-white transition-all duration-500 border border-pink-50">
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </div>
                </div>
                <span className="mt-6 font-black text-xs uppercase tracking-[0.2em] text-gray-600 group-hover:text-[#E97D8E] transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unidades Destacadas con Carrusel Ajustado para Simetría Total */}
      <section className="max-w-7xl mx-auto px-4 py-24 overflow-hidden border-t-2 border-pink-50 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
          <div>
            <span className="text-[#E97D8E] font-black uppercase tracking-[0.3em] text-xs mb-3 block">Recomendados para vos</span>
            <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Unidades Destacadas</h2>
            <div className="h-2 w-24 bg-[#E97D8E] rounded-full mx-auto md:mx-0"></div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevCarousel}
              className="w-14 h-14 rounded-2xl border-2 border-pink-100 flex items-center justify-center text-[#E97D8E] hover:bg-[#E97D8E] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <button 
              onClick={nextCarousel}
              className="w-14 h-14 rounded-2xl border-2 border-pink-100 flex items-center justify-center text-[#E97D8E] hover:bg-[#E97D8E] hover:text-white transition-all shadow-sm active:scale-95"
            >
              <i className="fa-solid fa-arrow-right text-xl"></i>
            </button>
          </div>
        </div>

        <div className="relative">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ 
              gap: '2rem',
              transform: `translateX(calc(-${carouselIndex} * (100% / 3 + 2rem / 3)))` 
            }}
          >
            {VEHICLES.map((v) => (
              <div 
                key={v.id} 
                className="min-w-full md:min-w-[calc(100%/3-4rem/3)]"
              >
                <VehicleCard vehicle={v} onSelect={navigateToDetail} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-pink-50/30 border-t-2 border-pink-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-16">
            Conocé a nuestros vendedores
          </h3>
          <div className="flex justify-center gap-16 md:gap-32 flex-wrap">
            {SELLERS.map((seller, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-8 border-white shadow-2xl overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-[#E97D8E]">
                  <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-8 font-black text-lg text-gray-900 uppercase tracking-tight">{seller.name}</p>
                <div className="flex gap-4 mt-4">
                   <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E97D8E] shadow-md hover:bg-[#E97D8E] hover:text-white transition-all cursor-pointer">
                    <i className="fa-brands fa-whatsapp text-xl"></i>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#E97D8E] shadow-md hover:bg-[#E97D8E] hover:text-white transition-all cursor-pointer">
                    <i className="fa-brands fa-instagram text-xl"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderDetalle = () => {
    if (!selectedVehicle) return null;
    return (
      <main className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
        <button onClick={() => navigateToPage('Catálogo')} className="flex items-center gap-3 text-gray-900 font-black text-sm uppercase tracking-[0.2em] mb-12 group bg-pink-50 px-6 py-3 rounded-full hover:bg-[#E97D8E] hover:text-white transition-all w-fit shadow-md">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i> Volver al catálogo
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <div className="rounded-[4rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)] border-4 border-white aspect-[4/3] bg-gray-100">
              <img 
                src={getDirectImageUrl(selectedVehicle.images[activeImgIndex])} 
                className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-700" 
                alt={selectedVehicle.model} 
              />
            </div>
            {selectedVehicle.images.length > 1 && (
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {selectedVehicle.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-24 h-24 rounded-[1.5rem] overflow-hidden border-4 transition-all shadow-md ${activeImgIndex === idx ? 'border-[#E97D8E] scale-110 shadow-xl' : 'border-white opacity-60 hover:opacity-100'}`}
                  >
                    <img src={getDirectImageUrl(img)} className="w-full h-full object-cover" alt={`Miniatura ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-12">
            <div>
              <span className="bg-[#E97D8E] text-white px-5 py-2 rounded-full text-[12px] font-black uppercase tracking-[0.2em] shadow-lg inline-block mb-6">{selectedVehicle.category}</span>
              <h1 className="text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.85]">
                {selectedVehicle.brand} <br/><span className="text-[#E97D8E]">{selectedVehicle.model}</span>
              </h1>
            </div>
            <p className="text-6xl font-black text-gray-900 tracking-tighter flex items-center">
              <span className="text-3xl font-black text-[#E97D8E] mr-3">{selectedVehicle.currency === 'USD' ? 'USD' : '$'}</span>
              {selectedVehicle.price.toLocaleString()}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[{l:'Año', v:selectedVehicle.year, i:'fa-calendar'}, {l:'Kilometraje', v:selectedVehicle.kilometers.toLocaleString() + ' km', i:'fa-road'}, {l:'Combustible', v:selectedVehicle.fuel, i:'fa-gas-pump'}, {l:'Transmisión', v:selectedVehicle.transmission, i:'fa-gears'}].map((it, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-pink-50 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <i className={`fa-solid ${it.i} text-[#E97D8E] text-lg`}></i>
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{it.l}</p>
                  </div>
                  <p className="text-2xl font-black text-gray-900">{it.v}</p>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/549351000000?text=Hola! Consulto por el ${selectedVehicle.brand} ${selectedVehicle.model}`} target="_blank" className="block w-full bg-[#E97D8E] text-white text-center font-black py-7 rounded-[2rem] shadow-xl hover:bg-gray-900 hover:shadow-gray-200 transition-all uppercase tracking-[0.2em] text-lg group">
              <i className="fa-brands fa-whatsapp mr-3 text-2xl group-hover:scale-125 transition-transform"></i> Consultar Ahora
            </a>
          </div>
        </div>
      </main>
    );
  };

  const renderFinanciacion = () => (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=2000" 
            alt="Financing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white max-w-7xl">
          <div className="max-w-4xl animate-in slide-in-from-left duration-1000">
            <h2 className="text-6xl md:text-9xl font-black uppercase leading-[0.95] tracking-tighter mb-10 overflow-visible">
              FINANCIÁ TU <br/><span className="text-[#E97D8E]">NUEVO AUTO</span>
            </h2>
            <p className="text-xl md:text-2xl mb-14 font-medium text-gray-200 leading-relaxed max-w-lg drop-shadow-md">
              Alcanzá el vehículo que querés con planes a tu medida. Trabajamos con los bancos líderes para brindarte la mejor tasa del mercado.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#pasos-financia" className="bg-[#E97D8E] hover:bg-white hover:text-gray-900 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl active:scale-95 text-sm">
                Ver Proceso
              </a>
              <button className="bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all text-sm">
                Simular Crédito
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="pasos-financia" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <span className="text-[#E97D8E] font-black uppercase tracking-[0.4em] text-xs mb-4 block">Gestión Ágil</span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter mb-6">Pasos para financiar</h2>
            <div className="h-2 w-28 bg-[#E97D8E] mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row gap-16 relative">
            <div className="hidden md:block absolute left-[23px] top-6 bottom-6 w-1 bg-pink-100/50"></div>
            <div className="space-y-20 w-full">
              {[
                { n: "1", t: "Elegí tu auto", d: "Explorá nuestro catálogo de unidades seleccionadas y elegí la que mejor se adapte a tu estilo de vida.", i: "fa-car-side" },
                { n: "2", t: "Seleccioná el plan", d: "Disponemos de Créditos UVA, Prendarios y Financiación propia. Elegí la cuota que te quede cómoda.", i: "fa-calculator" },
                { n: "3", t: "Presentá tu DNI", d: "Solo con tu documento nacional de identidad iniciamos la gestión. Sin trámites complejos ni burocracia.", i: "fa-id-card" },
                { n: "4", t: "Preaprobación inmediata", d: "Nuestro equipo califica tu solicitud con el banco en menos de 24 horas hábiles.", i: "fa-bolt" },
                { n: "5", t: "Firma y Cierre", d: "Revisamos las condiciones finales y firmamos la documentación para asegurar tu transparencia total.", i: "fa-file-signature" },
                { n: "6", t: "¡Retiro de Unidad!", d: "¡Felicidades! Ya podés subirte a tu auto y empezar a disfrutarlo. Entrega inmediata garantizada.", i: "fa-key" }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-10 group">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 bg-white border-4 border-[#E97D8E] group-hover:bg-[#E97D8E] rotate-45 flex items-center justify-center transition-all duration-500 shadow-xl">
                      <span className="-rotate-45 text-gray-900 group-hover:text-white font-black text-xl">{step.n}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 flex-1 items-start md:items-center bg-pink-50/20 p-10 rounded-[3rem] border-2 border-transparent hover:border-pink-200 hover:bg-white hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md border-2 border-pink-50 text-3xl text-[#E97D8E]">
                      <i className={`fa-solid ${step.i}`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-3">{step.t}</h3>
                      <p className="text-gray-600 font-bold leading-relaxed text-base md:text-lg">{step.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderVende = () => (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
      <div className="mb-16">
        <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <i className="fa-solid fa-car-side text-6xl text-[#E97D8E]"></i>
        </div>
        <h2 className="text-6xl font-black uppercase tracking-tighter mb-8">Tasamos tu Vehículo</h2>
        <p className="text-2xl text-gray-500 font-bold mb-12">Tomamos tu usado al mejor precio del mercado como parte de pago o compra directa.</p>
      </div>
      <div className="bg-white p-16 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-2 border-pink-50 max-w-2xl mx-auto">
        <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Marca</label>
              <input type="text" placeholder="Ej: Toyota" className="bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none focus:border-[#E97D8E] focus:bg-white w-full font-bold shadow-inner" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Modelo</label>
              <input type="text" placeholder="Ej: Hilux" className="bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none focus:border-[#E97D8E] focus:bg-white w-full font-bold shadow-inner" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Año del vehículo</label>
            <input type="number" placeholder="Ej: 2020" className="bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none focus:border-[#E97D8E] focus:bg-white w-full font-bold shadow-inner" />
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Detalles adicionales</label>
            <textarea placeholder="Contanos el estado, kilómetros y equipamiento..." className="bg-gray-50 border-2 border-gray-100 p-5 rounded-2xl outline-none focus:border-[#E97D8E] focus:bg-white w-full h-40 font-bold shadow-inner"></textarea>
          </div>
          <button className="w-full bg-gray-900 text-white font-black py-6 rounded-2xl hover:bg-[#E97D8E] transition-all uppercase tracking-[0.3em] text-sm shadow-xl">Enviar Solicitud <i className="fa-solid fa-paper-plane ml-2"></i></button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white/95 backdrop-blur-xl sticky top-0 w-full z-50 border-b-2 border-pink-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateToPage('Inicio')} className="flex items-center gap-4 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-pink-50 overflow-hidden transition-all group-hover:scale-110 group-hover:border-[#E97D8E]">
                <img 
                  src={directLogoUrl} 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-full" 
                />
              </div>
              <span className="hidden sm:block text-2xl md:text-3xl font-black tracking-tighter text-gray-900 uppercase">AUTODREAM</span>
            </button>
          </div>
          <nav className="flex items-center gap-6 md:gap-12 text-[10px] md:text-[13px] font-black uppercase tracking-[0.25em] text-gray-600">
            {(['Inicio', 'Catálogo', 'Financiación', 'Vendé tu Auto'] as const).map((page) => (
              <button 
                key={page}
                onClick={() => navigateToPage(page)}
                className={`relative py-2 transition-all hover:text-[#E97D8E] ${currentPage === page ? 'text-gray-900 scale-105 font-black' : ''}`}
              >
                {page}
                {(currentPage === page || (currentPage === 'Detalle' && page === 'Catálogo')) && (
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#E97D8E] rounded-full animate-in slide-in-from-left-4 duration-500"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <div className="flex-grow">
        {currentPage === 'Inicio' && renderInicio()}
        {currentPage === 'Catálogo' && renderCatalogo()}
        {currentPage === 'Detalle' && renderDetalle()}
        {currentPage === 'Financiación' && renderFinanciacion()}
        {currentPage === 'Vendé tu Auto' && renderVende()}
      </div>
      <footer className="bg-gray-900 text-white pt-32 pb-16 rounded-t-[6rem] mt-32 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-0.5 overflow-hidden shadow-xl">
                  <img src={directLogoUrl} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-3xl font-black uppercase tracking-tighter">AUTODREAM</span>
              </div>
              <p className="text-gray-400 font-bold text-lg max-w-sm mx-auto md:mx-0 leading-relaxed">Donde tus sueños se ponen en marcha. Líderes en vehículos seleccionados en Córdoba.</p>
            </div>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="text-[#E97D8E] font-black text-xs uppercase tracking-[0.3em] mb-10">Explorar</h4>
                <ul className="space-y-6 text-[15px] text-gray-400 font-bold">
                  <li><button onClick={() => navigateToPage('Inicio')} className="hover:text-white transition-colors">Inicio</button></li>
                  <li><button onClick={() => navigateToPage('Catálogo')} className="hover:text-white transition-colors">Catálogo</button></li>
                  <li><button onClick={() => navigateToPage('Financiación')} className="hover:text-white transition-colors">Financiación</button></li>
                  <li><button onClick={() => navigateToPage('Vendé tu Auto')} className="hover:text-white transition-colors">Vendé tu Auto</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#E97D8E] font-black text-xs uppercase tracking-[0.3em] mb-10">Contacto</h4>
                <p className="text-[15px] text-gray-400 font-bold leading-relaxed">
                  Bv. Los Granaderos 2565, Córdoba<br/>
                  <span className="text-white block mt-6 text-xl font-black">+54 351 000 0000</span>
                </p>
              </div>
            </div>
            <div className="rounded-[3rem] overflow-hidden h-60 border-4 border-gray-800 shadow-2xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3273.302132778823!2d-64.2078185!3d-31.376544799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432997204ba0603%3A0x5955f369d6f3cc7e!2sAutodream!5e1!3m2!1ses!2sar!4v1768559380426!5m2!1ses!2sar" 
                className="w-full h-full grayscale opacity-50 hover:opacity-100 transition-opacity" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="text-center pt-16 border-t-2 border-gray-800 text-[11px] font-black text-gray-600 uppercase tracking-[0.5em]">
            © 2026 AUTODREAM | Córdoba, Argentina
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
