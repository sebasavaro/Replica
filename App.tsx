
import React, { useState, useMemo, useEffect } from 'react';
import { VehicleCard } from './components/VehicleCard';
import { VEHICLES, CIRCULAR_CATEGORIES, SELLERS, BRAND_LOGO_URL } from './constants';
import { FilterState, Vehicle } from './types';

type Page = 'Inicio' | 'Catálogo' | 'Financiación' | 'Vendé tu Auto' | 'Detalle';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Inicio');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: '',
    category: '',
    minYear: 0
  });

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedVehicle]);

  const getDirectImageUrl = (url: string) => {
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }
    return url;
  };

  const directLogoUrl = getDirectImageUrl(BRAND_LOGO_URL);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      const matchSearch = v.model.toLowerCase().includes(filters.search.toLowerCase()) || 
                          v.brand.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === '' || 
                            (filters.category === 'Autos' && v.category === 'Auto') ||
                            (filters.category === 'Motos' && v.category === 'Moto');
      const matchYear = v.year >= (filters.minYear || 0);
      return matchSearch && matchCategory && matchYear;
    });
  }, [filters]);

  const navigateToDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('Detalle');
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setSelectedVehicle(null);
  };

  // --- RENDERING COMPONENTS ---

  const renderInicio = () => (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-pink-900/20 to-pink-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6 drop-shadow-2xl tracking-tighter">
            Donde tus sueños <br/> <span className="text-[#E97D8E] italic">se ponen en marcha</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            En Autodream transformamos la búsqueda de tu vehículo en una experiencia placentera. Calidad certificada y atención personalizada.
          </p>
          <button 
            onClick={() => navigateToPage('Catálogo')}
            className="bg-[#E97D8E] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-pink-500/20"
          >
            Explorar Inventario
          </button>
        </div>
      </section>

      {/* Quick Filters on Home */}
      <section className="relative z-20 -mt-16 px-4">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-pink-200/50 border border-pink-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Modelo</label>
              <input 
                type="text" 
                placeholder="Buscar..."
                className="w-full bg-pink-50/30 border border-pink-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#E97D8E] outline-none"
                value={filters.search}
                onChange={(e) => { setFilters({ ...filters, search: e.target.value }); }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Tipo</label>
              <select 
                className="w-full bg-pink-50/30 border border-pink-100 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-[#E97D8E] outline-none"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Todos</option>
                <option value="Autos">Autos</option>
                <option value="Motos">Motos</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Año desde</label>
              <input 
                type="number" 
                placeholder="2010"
                className="w-full bg-pink-50/30 border border-pink-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#E97D8E] outline-none"
                value={filters.minYear || ''}
                onChange={(e) => setFilters({ ...filters, minYear: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => navigateToPage('Catálogo')}
                className="w-full bg-gray-900 text-white font-bold rounded-xl py-4 hover:bg-[#E97D8E] transition-all uppercase text-xs tracking-widest shadow-lg active:scale-95"
              >
                Ver Resultados
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Circles */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
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
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2.5rem] flex items-center justify-center text-3xl transition-all duration-500 bg-pink-50 text-[#E97D8E] group-hover:bg-[#E97D8E] group-hover:text-white group-hover:rotate-12 shadow-sm group-hover:shadow-pink-200 group-hover:shadow-lg">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <span className="mt-4 font-bold text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-800 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-pink-50">
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Unidades Destacadas</h2>
            <div className="h-1.5 w-20 bg-[#E97D8E] rounded-full"></div>
          </div>
          <button onClick={() => navigateToPage('Catálogo')} className="text-[#E97D8E] font-bold uppercase tracking-widest text-sm hover:translate-x-1 transition-transform">Ver Catálogo Completo <i className="fa-solid fa-arrow-right ml-1"></i></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VEHICLES.slice(0, 3).map(v => (
            <VehicleCard key={v.id} vehicle={v} onSelect={navigateToDetail} />
          ))}
        </div>
      </section>

      {/* Sellers */}
      <section className="py-24 bg-pink-50/30 rounded-[5rem]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter mb-16">Nuestros Especialistas</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {SELLERS.map((seller, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 group-hover:border-[#E97D8E] group-hover:scale-105">
                  <img src={seller.image} alt={seller.name} className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                </div>
                <h4 className="mt-6 font-bold text-gray-800 text-lg uppercase tracking-tight">{seller.name}</h4>
                <p className="text-pink-400 text-xs font-bold uppercase tracking-widest mt-1">Asesor Comercial</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderCatalogo = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-left">
        <h2 className="text-5xl font-black text-gray-900 uppercase tracking-tighter">Nuestro Catálogo</h2>
        <p className="text-gray-500 font-medium mt-2">Encontrá el vehículo que mejor se adapte a vos entre nuestras {VEHICLES.length} unidades.</p>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-pink-100 border border-pink-50 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Categoría</label>
            <div className="flex gap-2">
              {['', 'Autos', 'Motos'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase transition-all ${filters.category === cat ? 'bg-[#E97D8E] text-white' : 'bg-pink-50 text-pink-400 hover:bg-pink-100'}`}
                >
                  {cat || 'Todas'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-pink-400 uppercase tracking-widest ml-1">Año Mínimo</label>
            <input 
              type="number" 
              className="w-full bg-pink-50/50 border border-pink-100 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#E97D8E] outline-none"
              placeholder="Ej: 2018"
              value={filters.minYear || ''}
              onChange={(e) => setFilters({...filters, minYear: parseInt(e.target.value) || 0})}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={() => setFilters({search: '', brand: '', category: '', minYear: 0})}
              className="w-full bg-gray-100 text-gray-400 font-bold rounded-xl py-3.5 hover:bg-pink-50 hover:text-[#E97D8E] transition-all uppercase text-xs tracking-widest"
            >
              Resetear Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredVehicles.map(v => <VehicleCard key={v.id} vehicle={v} onSelect={navigateToDetail} />)}
      </div>
      
      {filteredVehicles.length === 0 && (
        <div className="text-center py-32 bg-pink-50/20 rounded-[3rem]">
          <i className="fa-solid fa-search text-6xl text-pink-100 mb-6 block"></i>
          <p className="text-gray-400 font-bold uppercase tracking-widest">No encontramos vehículos con esos criterios</p>
          <button onClick={() => setFilters({search:'', brand:'', category:'', minYear:0})} className="mt-4 text-[#E97D8E] font-bold uppercase text-xs border-b border-[#E97D8E]">Mostrar todo el stock</button>
        </div>
      )}
    </div>
  );

  const renderDetalle = () => {
    if (!selectedVehicle) return null;
    return (
      <main className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
        <button onClick={() => navigateToPage('Catálogo')} className="flex items-center gap-2 text-[#E97D8E] font-bold text-xs uppercase tracking-widest mb-10 group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Volver al catálogo
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-pink-100 border border-pink-50 aspect-[4/3] bg-gray-100">
            <img src={selectedVehicle.image} className="w-full h-full object-cover" alt={selectedVehicle.model} />
          </div>
          <div className="space-y-8">
            <div>
              <span className="bg-pink-100 text-[#E97D8E] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedVehicle.category}</span>
              <h1 className="text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mt-4">
                {selectedVehicle.brand} <br/><span className="text-[#E97D8E]">{selectedVehicle.model}</span>
              </h1>
            </div>
            <p className="text-5xl font-black text-gray-800 tracking-tight">
              <span className="text-2xl font-bold text-[#E97D8E] mr-1">{selectedVehicle.currency === 'USD' ? 'USD' : '$'}</span>
              {selectedVehicle.price.toLocaleString()}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[{l:'Año', v:selectedVehicle.year}, {l:'KM', v:selectedVehicle.kilometers.toLocaleString()}, {l:'Combustible', v:selectedVehicle.fuel}, {l:'Caja', v:selectedVehicle.transmission}].map((it, i) => (
                <div key={i} className="bg-pink-50/50 p-6 rounded-[2rem] border border-pink-100">
                  <p className="text-[10px] font-bold text-pink-300 uppercase mb-1 tracking-widest">{it.l}</p>
                  <p className="text-xl font-black text-gray-800">{it.v}</p>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/549351000000?text=Hola! Consulto por el ${selectedVehicle.brand} ${selectedVehicle.model}`} target="_blank" className="block w-full bg-[#E97D8E] text-white text-center font-bold py-6 rounded-2xl shadow-xl hover:bg-[#d66a7a] transition-all uppercase tracking-widest text-sm">
              <i className="fa-brands fa-whatsapp mr-2 text-lg"></i> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    );
  };

  const renderFinanciacion = () => (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
      <i className="fa-solid fa-hand-holding-dollar text-8xl text-[#E97D8E] mb-8"></i>
      <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Financiación Flexible</h2>
      <p className="text-xl text-gray-500 mb-12 leading-relaxed font-light">Accedé a tu próximo vehículo con planes de pago personalizados y las mejores tasas de Córdoba.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-pink-50 text-left">
          <h3 className="text-2xl font-bold mb-4">Créditos UVA</h3>
          <p className="text-gray-400 text-sm mb-6">Financiamos hasta el 60% del valor de la unidad en cuotas fijas o variables.</p>
          <ul className="space-y-2 text-xs font-bold text-pink-400 uppercase tracking-widest">
            <li><i className="fa-solid fa-check mr-2"></i> Mínimos Requisitos</li>
            <li><i className="fa-solid fa-check mr-2"></i> Aprobación en 24hs</li>
          </ul>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-pink-50 text-left">
          <h3 className="text-2xl font-bold mb-4">Créditos Prendarios</h3>
          <p className="text-gray-400 text-sm mb-6">La forma más rápida de subirte a tu auto. Solo con tu DNI.</p>
          <ul className="space-y-2 text-xs font-bold text-pink-400 uppercase tracking-widest">
            <li><i className="fa-solid fa-check mr-2"></i> Cuotas Fijas en Pesos</li>
            <li><i className="fa-solid fa-check mr-2"></i> Plazos de 12 a 48 meses</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderVende = () => (
    <div className="max-w-4xl mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
      <div className="mb-12">
        <i className="fa-solid fa-car-side text-8xl text-[#E97D8E] mb-8"></i>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">Tasamos tu Vehículo</h2>
        <p className="text-xl text-gray-500 mb-12">Tomamos tu usado al mejor precio del mercado como parte de pago o compra directa.</p>
      </div>
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-pink-50 max-w-2xl mx-auto">
        <form className="space-y-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Marca" className="bg-pink-50/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#E97D8E] w-full" />
            <input type="text" placeholder="Modelo" className="bg-pink-50/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#E97D8E] w-full" />
          </div>
          <input type="number" placeholder="Año" className="bg-pink-50/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#E97D8E] w-full" />
          <textarea placeholder="Comentarios adicionales..." className="bg-pink-50/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-[#E97D8E] w-full h-32"></textarea>
          <button className="w-full bg-gray-900 text-white font-bold py-5 rounded-2xl hover:bg-[#E97D8E] transition-all uppercase tracking-widest">Enviar Solicitud</button>
        </form>
      </div>
    </div>
  );

  // --- MAIN APP STRUCTURE ---

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* HEADER SIEMPRE VISIBLE */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 w-full z-50 border-b border-pink-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateToPage('Inicio')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#E97D8E] rounded-full flex items-center justify-center shadow-lg shadow-pink-200 overflow-hidden transition-transform group-hover:scale-110">
                <img src={directLogoUrl} alt="Logo" className="w-full h-full object-cover p-1" />
              </div>
              <span className="hidden sm:block text-xl md:text-2xl font-extrabold tracking-tighter text-gray-800 uppercase">AUTODREAM</span>
            </button>
          </div>

          <div className="flex-grow max-w-md px-4 hidden lg:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="¿Qué vehículo buscas?"
                className="w-full bg-pink-50/50 border border-pink-100 rounded-full py-2 px-10 text-sm focus:ring-2 focus:ring-[#E97D8E] outline-none"
                value={filters.search}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value });
                  if(currentPage !== 'Catálogo' && currentPage !== 'Detalle') setCurrentPage('Catálogo');
                }}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[#E97D8E] text-xs"></i>
            </div>
          </div>

          <nav className="flex items-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {(['Inicio', 'Catálogo', 'Financiación', 'Vendé tu Auto'] as const).map((page) => (
              <button 
                key={page}
                onClick={() => navigateToPage(page)}
                className={`relative py-2 transition-all hover:text-[#E97D8E] ${currentPage === page ? 'text-[#E97D8E]' : ''}`}
              >
                {page}
                {(currentPage === page || (currentPage === 'Detalle' && page === 'Catálogo')) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E97D8E] rounded-full animate-in slide-in-from-left-2 duration-300"></span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* RENDER PAGES */}
      <div className="flex-grow">
        {currentPage === 'Inicio' && renderInicio()}
        {currentPage === 'Catálogo' && renderCatalogo()}
        {currentPage === 'Detalle' && renderDetalle()}
        {currentPage === 'Financiación' && renderFinanciacion()}
        {currentPage === 'Vendé tu Auto' && renderVende()}
      </div>

      <footer className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[5rem] mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-[#E97D8E] rounded-full flex items-center justify-center p-1"><img src={directLogoUrl} className="w-full h-full rounded-full" /></div>
                <span className="text-2xl font-black uppercase tracking-tighter">AUTODREAM</span>
              </div>
              <p className="text-gray-400 font-light text-sm max-w-xs">Donde tus sueños se ponen en marcha. Líderes en vehículos seleccionados en Córdoba.</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E97D8E] transition-colors"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E97D8E] transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-center md:text-left">
              <div>
                <h4 className="text-[#E97D8E] font-bold text-xs uppercase tracking-widest mb-6">Secciones</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><button onClick={() => navigateToPage('Inicio')} className="hover:text-white transition-colors">Inicio</button></li>
                  <li><button onClick={() => navigateToPage('Catálogo')} className="hover:text-white transition-colors">Catálogo</button></li>
                  <li><button onClick={() => navigateToPage('Financiación')} className="hover:text-white transition-colors">Financiación</button></li>
                  <li><button onClick={() => navigateToPage('Vendé tu Auto')} className="hover:text-white transition-colors">Vendé tu Auto</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#E97D8E] font-bold text-xs uppercase tracking-widest mb-6">Ubicación</h4>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  Av. Castro Barros 1500<br/>
                  Córdoba, Argentina<br/>
                  <span className="text-white block mt-4">+54 351 000 0000</span>
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden h-48 border border-gray-800 shadow-2xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.6565!2d-64.19!3d-31.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943298f3b1e7e0d7%3A0xdfa326fad25a2c04!2sFerez%20Automotores!5e0!3m2!1ses!2sar!4v1700000000000" 
                className="w-full h-full grayscale opacity-40 hover:opacity-100 transition-opacity" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="text-center pt-12 border-t border-gray-800 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">
            © 2025 AUTODREAM | Córdoba, Argentina
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
