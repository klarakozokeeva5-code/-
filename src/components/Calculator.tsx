import React from 'react';
import { ROOMS_INFO } from '../data';
import { RoomClass } from '../types';
import { Calendar, Users, Hotel, Check, Info } from 'lucide-react';

interface CalculatorProps {
  days: number;
  setDays: (days: number) => void;
  guests: number;
  setGuests: (guests: number) => void;
  roomClass: RoomClass;
  setRoomClass: (rc: RoomClass) => void;
  onBookNow: () => void;
}

export default function Calculator({
  days,
  setDays,
  guests,
  setGuests,
  roomClass,
  setRoomClass,
  onBookNow,
}: CalculatorProps) {
  
  // Find current room configuration
  const currentRoom = ROOMS_INFO.find((r) => r.type === roomClass) || ROOMS_INFO[0];
  
  // Total cost formula: Price per person * days * guests
  const totalPrice = currentRoom.price * days * guests;

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.08),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">Бааларды эсептөө</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4 tracking-tight uppercase">
            ООЗУҢДАН ИНТЕРАКТИВДҮҮ БАА ЭСЕПТЕГИЧ
          </h2>
          <p className="text-slate-300 mt-4 text-sm sm:text-base">
            Өзүңүзгө ылайыктуу шарттарды, бөлмөнү жана каалаган убактыңызды тандаңыз. Биздин эсептегич реалдуу убакытта жалпы бааны эч кандай кошумча төлөмдөрсүз эсептеп берет.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Panels */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between">
            
            {/* 1. Room Class Selection cards */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-300 flex items-center space-x-1.5 uppercase tracking-wider">
                <Hotel className="h-4 w-4 text-emerald-400" />
                <span>Бөлмөнүн жана Тейлөөнүн Түрү:</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ROOMS_INFO.map((room) => (
                  <button
                    key={room.type}
                    type="button"
                    onClick={() => setRoomClass(room.type)}
                    className={`p-4 rounded-xl text-left border transition-all relative ${
                      roomClass === room.type
                        ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                        : 'border-white/10 bg-white/2 hover:bg-white/5'
                    }`}
                  >
                    {roomClass === room.type && (
                      <span className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                    <h4 className="font-extrabold text-sm">{room.name}</h4>
                    <span className="text-xs text-slate-300 mt-1 block">{room.description.slice(0, 48)}...</span>
                    <span className="text-base font-black text-emerald-400 mt-2 block">
                      {room.price} сом <span className="text-xs font-normal text-slate-400">/ күнгө</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Days Slider & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Days Counter */}
              <div className="bg-white/3 border border-white/5 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <span>Эс алуу мөөнөтү:</span>
                  </label>
                  <span className="text-sm font-black text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                    {days} күнгө
                  </span>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="21"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                
                <div className="flex justify-between text-2xs text-slate-400">
                  <span>1 күн</span>
                  <span>7 күн</span>
                  <span>14 күн</span>
                  <span>21 күн</span>
                </div>
              </div>

              {/* Guests Counter */}
              <div className="bg-white/3 border border-white/5 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <Users className="h-4 w-4 text-emerald-400" />
                    <span>Кишилердин саны:</span>
                  </label>
                  <span className="text-sm font-black text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/10">
                    {guests} киши
                  </span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 border border-white/5 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="h-9 w-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm">{guests} адам</span>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="h-9 w-9 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
                  >
                    +
                  </button>
                </div>

                <div className="text-center text-2xs text-slate-400">
                  максималдуу 10 киши
                </div>
              </div>

            </div>

            {/* Meal detail banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/25 p-3.5 rounded-2xl flex items-start space-x-2.5">
              <Info className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-200">
                <strong className="text-emerald-300">Сунушталат:</strong> Күнүмдүк тандалган бөлмө баасына <strong>күнүнө 3 маал пайдалуу ысык тамак</strong> жана дарылоо процедуралары толугу менен кошулган, эч кандай жашыруун төлөмдөр жок!
              </div>
            </div>

          </div>

          {/* Checkout Breakdown Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-emerald-900/60 to-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display font-extrabold text-lg text-emerald-300 uppercase tracking-wide">
                  ЭДЕМ ЭС АЛУУ ПЛАНЫНЫЗ
                </h3>
                <p className="text-xs text-slate-300 mt-1">Тандалган параметрлер боюнча өзгөчөлүктөрү</p>
              </div>

              {/* Items */}
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center bg-white/2 p-2.5 rounded-xl border border-white/2">
                  <span className="text-slate-300">Тандалган Номер:</span>
                  <span className="font-bold text-white">{currentRoom.name}</span>
                </div>
                <div className="flex justify-between items-center bg-white/2 p-2.5 rounded-xl border border-white/2">
                  <span className="text-slate-300">Түрдүү Мөөнөтү:</span>
                  <span className="font-bold text-white">{days} күн / {days} түнгө</span>
                </div>
                <div className="flex justify-between items-center bg-white/2 p-2.5 rounded-xl border border-white/2">
                  <span className="text-slate-300">Эс алуучулар:</span>
                  <span className="font-bold text-white">{guests} киши</span>
                </div>
                <div className="flex justify-between items-center bg-white/2 p-2.5 rounded-xl border border-white/2">
                  <span className="text-slate-300">Пайдалуу 3 Маал Тамак:</span>
                  <span className="text-emerald-400 font-extrabold uppercase text-xs bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">АКЫСЫЗ КОШУЛГАН</span>
                </div>
                <div className="flex justify-between items-center bg-white/2 p-2.5 rounded-xl border border-white/2">
                  <span className="text-slate-300">Шыпаа Процедуралары:</span>
                  <span className="text-teal-300 font-extrabold uppercase text-xs bg-teal-500/10 px-2 py-1 rounded-md border border-teal-500/20">ӨЗГӨЧӨ ПАКЕТКЕ КИРЕТ</span>
                </div>
              </div>

              {/* Pricing details */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block">Бир күндүк баасы (Бир адамга)</span>
                <span className="text-2xl font-black text-white block">{currentRoom.price} сом</span>
              </div>
            </div>

            {/* Total Section */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs uppercase text-slate-300 font-bold block bg-white/5 px-2 py-0.5 rounded-md">Жалпы суммасы:</span>
                  <span className="text-2xs text-slate-400">Бардык салыктарды кошкондо</span>
                </div>
                <span className="text-3xl sm:text-4xl font-display font-black text-emerald-400">
                  {totalPrice.toLocaleString('ru')} сом
                </span>
              </div>

              <button
                type="button"
                onClick={onBookNow}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-slate-950 font-black py-4 px-6 rounded-2xl text-center shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all text-sm uppercase tracking-wider"
              >
                Бул баада брондоону баштоо
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
