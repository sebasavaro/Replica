
import React, { useState, useMemo, useEffect } from 'react';
import { VehicleCard } from './components/VehicleCard';
import { VEHICLES, CIRCULAR_CATEGORIES, SELLERS, BRAND_LOGO_URL, BRANDS } from './constants';
import { FilterState, Vehicle } from './types';

type Page = 'Inicio' | 'Catálogo' | 'Financiación' | 'Vendé tu Auto' | 'Detalle';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('Inicio');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    brand: '',
    category: '',
    minYear: 1956
  });

  const [sortOrder, setSortOrder] = useState('aleatorio');

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
    setCurrentPage('Detalle');
  };

  const navigateToPage = (page: Page) => {
    setCurrentPage(page);
    setSelectedVehicle(null);
  };

  const renderCatalogo = () => (
    <section className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-pink-100/30 border border-pink-50 p-4 md:p-6 mb-12 sticky top-24 z-30 backdrop-blur-md bg-white/90">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 ml-4">¿Qué buscás?</span>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Marca o modelo..."
                className="w-full bg-pink-50/30 border border-pink-100 rounded-2xl py-3.5 px-12 text-sm outline-none focus:ring-2 focus:ring-[#E97D8E] focus:bg-white transition-all"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
              <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[#E97D8E]"></i>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 ml-4">Marca</span>
            <select 
              className="w-full bg-pink-50/30 border border-pink-100 rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-[#E97D8E] focus:bg-white transition-all"
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            >
              <option value="">Todas las marcas</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 ml-4">Tipo</span>
            <div className="flex bg-pink-50/30 p-1 rounded-2xl border border-pink-100 h-[50px]">
              {['', 'Autos', 'Motos'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilters({...filters, category: cat})}
                  className={`flex-1 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filters.category === cat ? 'bg-white text-[#E97D8E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {cat || 'Todos'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 ml-4">Ordenar</span>
            <select 
              className="w-full bg-pink-50/30 border border-pink-100 rounded-2xl py-3.5 px-5 text-sm font-bold text-gray-700 outline-none cursor-pointer focus:ring-2 focus:ring-[#E97D8E] focus:bg-white transition-all"
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
        {(filters.search || filters.brand || filters.category) && (
          <div className="mt-4 pt-4 border-t border-pink-50 flex flex-wrap gap-2 items-center">
            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mr-2">Filtros activos:</span>
            {filters.brand && <span className="bg-pink-50 text-[#E97D8E] text-[10px] font-bold px-3 py-1 rounded-full border border-pink-100">{filters.brand}</span>}
            {filters.category && <span className="bg-pink-50 text-[#E97D8E] text-[10px] font-bold px-3 py-1 rounded-full border border-pink-100">{filters.category}</span>}
            <button 
              onClick={() => setFilters({search:'', brand:'', category:'', minYear:1956})}
              className="text-[9px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 ml-auto"
            >
              Borrar todo <i className="fa-solid fa-xmark ml-1"></i>
            </button>
          </div>
        )}
      </div>
      <div className="mb-6 px-4">
        <p className="text-sm text-gray-400 font-medium italic">Mostrando <span className="text-gray-900 font-black not-italic">{filteredVehicles.length} de {VEHICLES.length}</span> unidades disponibles</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredVehicles.map(v => (
          <VehicleCard key={v.id} vehicle={v} onSelect={navigateToDetail} />
        ))}
      </div>
      {filteredVehicles.length === 0 && (
        <div className="py-40 text-center bg-pink-50/10 rounded-[4rem] border-2 border-dashed border-pink-100">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-pink-100">
            <i className="fa-solid fa-car-rear text-3xl text-pink-200"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tighter mb-2">Sin resultados</h3>
          <p className="text-gray-400 font-light mb-10 max-w-xs mx-auto">No encontramos vehículos que coincidan con tu búsqueda. Intentá con otros criterios.</p>
          <button 
            onClick={() => setFilters({search:'', brand:'', category:'', minYear:1956})}
            className="bg-[#E97D8E] text-white px-10 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-pink-200 hover:scale-105 transition-all"
          >
            Restablecer Catálogo
          </button>
        </div>
      )}
    </section>
  );

  const renderInicio = () => (
    <div className="animate-in fade-in duration-700">
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
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed text-gray-100">
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

      {/* Ítems de Categoría Redondeados */}
      <section className="py-24 bg-white">
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
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-pink-100 flex items-center justify-center text-3xl transition-all duration-500 bg-white text-[#E97D8E] group-hover:bg-[#E97D8E] group-hover:text-white group-hover:border-[#E97D8E] shadow-sm group-hover:shadow-xl group-hover:shadow-pink-200">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <span className="mt-6 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-800 transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=2000" 
            alt="Financing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white max-w-7xl">
          <div className="max-w-2xl animate-in slide-in-from-left duration-1000">
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              FINANCIÁ TU <br/><span className="text-[#E97D8E]">NUEVO AUTO</span>
            </h2>
            <p className="text-lg md:text-xl mb-12 font-light text-gray-300 leading-relaxed max-w-lg">
              Alcanzá el vehículo que querés con planes a tu medida. Trabajamos con los bancos líderes para brindarte la mejor tasa del mercado.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#pasos-financia" className="bg-[#E97D8E] hover:bg-white hover:text-[#E97D8E] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-2xl shadow-pink-500/20 active:scale-95">
                Ver Proceso
              </a>
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                Simular Crédito
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="pasos-financia" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Pasos para financiar</h2>
            <div className="h-1.5 w-24 bg-[#E97D8E] mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-16 relative">
            <div className="hidden md:block absolute left-[23px] top-6 bottom-6 w-0.5 bg-pink-100"></div>
            <div className="space-y-16 w-full">
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
                    <div className="w-12 h-12 bg-white border-2 border-[#E97D8E] group-hover:bg-[#E97D8E] rotate-45 flex items-center justify-center transition-all duration-500 shadow-lg shadow-pink-100">
                      <span className="-rotate-45 text-[#E97D8E] group-hover:text-white font-black text-lg">{step.n}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8 flex-1 items-start md:items-center bg-pink-50/20 p-8 rounded-[2.5rem] border border-transparent hover:border-pink-100 hover:bg-white hover:shadow-xl hover:shadow-pink-100/50 transition-all duration-500">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-pink-50">
                      <i className={`fa-solid ${step.i} text-2xl text-[#E97D8E]`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight mb-2">{step.t}</h3>
                      <p className="text-gray-500 font-light leading-relaxed text-sm md:text-base">{step.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter mb-4">Preguntas Frecuentes</h2>
            <div className="h-1.5 w-24 bg-[#E97D8E] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { q: "¿Qué es Autodream?", a: "Somos el concesionario líder en Córdoba de vehículos seleccionados, con más de una década de experiencia y transparencia total." },
              { q: "¿Cómo financio?", a: "Contamos con acuerdos exclusivos con bancos para ofrecerte créditos prendarios solo con tu DNI y aprobación exprés." },
              { q: "¿Papeles necesarios?", a: "Buscamos la simplicidad: DNI y, en algunos casos, un recibo de sueldo. Analizamos cada situación de forma personalizada." },
              { q: "¿Tienen garantía?", a: "Por supuesto. Todas nuestras unidades pasan por una revisión técnica exhaustiva y cuentan con garantía por escrito de 3 a 6 meses." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] border border-pink-50 shadow-sm flex flex-col h-full hover:shadow-xl hover:shadow-pink-100/50 hover:border-[#E97D8E] transition-all duration-500 group">
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E97D8E] transition-colors">
                    <i className="fa-solid fa-question text-[10px] text-[#E97D8E] group-hover:text-white"></i>
                  </div>
                  <h4 className="text-sm font-black text-gray-800 uppercase tracking-tight leading-tight group-hover:text-[#E97D8E] transition-colors">{faq.q}</h4>
                </div>
                <div className="w-full h-px bg-pink-50 mb-8"></div>
                <p className="text-gray-400 font-light leading-relaxed text-sm flex-grow italic">"{faq.a}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
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

      <div className="flex-grow">
        {currentPage === 'Inicio' && renderInicio()}
        {currentPage === 'Catálogo' && renderCatalogo()}
        {currentPage === 'Detalle' && renderDetalle()}
        {currentPage === 'Financiación' && renderFinanciacion()}
        {currentPage === 'Vendé tu Auto' && renderVende()}
      </div>

      <footer className="bg-gray-900 text-white pt-24 pb-12 rounded-t-[5rem] mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 bg-[#E97D8E] rounded-full flex items-center justify-center p-1"><img src={directLogoUrl} className="w-full h-full rounded-full" /></div>
                <span className="text-2xl font-black uppercase tracking-tighter">AUTODREAM</span>
              </div>
              <p className="text-gray-400 font-light text-sm max-w-xs mx-auto md:mx-0">Donde tus sueños se ponen en marcha. Líderes en vehículos seleccionados en Córdoba.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
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

            <div className="rounded-3xl overflow-hidden h-48 border border-gray-800">
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
