import React from 'react';
import { Waves, Phone, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onScrollToCalculator: () => void;
}

export default function Header({ onScrollToCalculator }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 shadow-xs border-b border-blue-50/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 scroll-smooth cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-blue-600 text-white p-2.5 rounded-full shadow-md shadow-blue-500/20">
              <Waves className="h-6 w-6" id="logo-waves-icon" />
            </div>
            <div>
              <span className="font-display font-extrabold text-xl tracking-tight text-blue-900 block leading-tight">
                ГОЛУБОЙ ИССЫК-КУЛЬ
              </span>
              <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider block">
                Санаторий • Ысык-Көл
              </span>
            </div>
          </div>

          {/* Center Info Highlight */}
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <a href="#features" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Бийик Кызматтар</a>
            <a href="#meals" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">3 Маал Тамак</a>
            <a href="#calculator" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Баа Эсептегич</a>
            <a href="#procedure-list" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Процедуралар</a>
          </div>

          {/* Quick Contact & Action */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+996555123456" 
              className="flex items-center space-x-1.5 text-blue-800 font-semibold bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">+996 555 12 34 56</span>
            </a>
            <button 
              onClick={onScrollToCalculator}
              className="bg-emerald-600 text-white font-semibold text-sm px-4.5 py-2.5 rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-98 transition-all flex items-center space-x-1"
            >
              <span>Брондоо</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
