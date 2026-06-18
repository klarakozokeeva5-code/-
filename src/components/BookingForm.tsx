import React, { useState, useEffect } from 'react';
import { RoomClass, Booking } from '../types';
import { ROOMS_INFO } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarCheck, 
  Phone, 
  CheckSquare, 
  Trash2, 
  Clock, 
  Send, 
  CheckCircle2, 
  QrCode, 
  History,
  FileSpreadsheet,
  MapPin,
  Utensils
} from 'lucide-react';

interface BookingFormProps {
  days: number;
  guests: number;
  roomClass: RoomClass;
  totalPrice: number;
  formRef: React.RefObject<HTMLDivElement | null>;
}

export default function BookingForm({
  days,
  guests,
  roomClass,
  totalPrice,
  formRef
}: BookingFormProps) {
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeVoucher, setActiveVoucher] = useState<Booking | null>(null);
  const [savedBookings, setSavedBookings] = useState<Booking[]>([]);

  // Load inquiries from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem('issyk_kul_reservations');
    if (data) {
      try {
        setSavedBookings(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse past reservations", e);
      }
    }
  }, []);

  // Set default arrival date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setArrivalDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Save reservations to localStorage helper
  const saveReservations = (updated: Booking[]) => {
    localStorage.setItem('issyk_kul_reservations', JSON.stringify(updated));
    setSavedBookings(updated);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !arrivalDate) {
      alert("Сураныч, бардык керектүү талааларды толтуруңуз!");
      return;
    }

    setIsSubmitting(true);

    // Simulate clean API/Server submitting
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'GIR-' + Math.floor(100000 + Math.random() * 900000),
        fullName,
        phone,
        date: arrivalDate,
        roomClass,
        days,
        guests,
        totalPrice,
        notes,
        createdAt: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };

      const updated = [newBooking, ...savedBookings];
      saveReservations(updated);
      setActiveVoucher(newBooking);
      setIsSubmitting(false);

      // Clear input fields
      setFullName('');
      setPhone('');
      setNotes('');
    }, 1200);
  };

  const handleDeleteBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Бул брондоо суроо-талабын тизмеден өчүрүүнү каалайсызбы?")) {
      const updated = savedBookings.filter(b => b.id !== id);
      saveReservations(updated);
      if (activeVoucher?.id === id) {
        setActiveVoucher(null);
      }
    }
  };

  const getRoomName = (type: RoomClass) => {
    const room = ROOMS_INFO.find(r => r.type === type);
    return room ? room.name : type;
  };

  // Generate premade whatsapp link for high quality user experience
  const getWhatsAppLink = (b: Booking) => {
    const text = `Саламатсызбы! Мен "Голубой Иссык-Куль" санаторийине жарнама сайты аркылуу брондоо суроо-талабын жөнөткөм.
*Буйрутма №:* ${b.id}
*Кардардын аты:* ${b.fullName}
*Телефон номери:* ${b.phone}
*Бөлмөнүн түрү:* ${getRoomName(b.roomClass)}
*Келүү күнү:* ${b.date}
*Эс алуу мөөнөтү:* ${b.days} күн / ${b.guests} адам
*Жалпы баасы:* ${b.totalPrice.toLocaleString('ru')} сом
*Үч маал тамактануу:* Кошулган
Сураныч, орунду тастыктап бериңизчи! Рахмат.`;
    return `https://wa.me/996555123456?text=${encodeURIComponent(text)}`;
  };

  return (
    <div id="booking-form" ref={formRef} className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <CalendarCheck className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight uppercase">
            ОРУНДУ БРОНДОО ФОРМАСЫ
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Тандаган кундөрүңүздү, бөлмөнү жана байланыш маалыматыңызды калтырыңыз. Тынч, жайлуу жана коопсуз эс алууну азыртан камсыздаңыз.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Booking Input form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200">
            <h3 className="text-xl font-display font-black text-slate-800 mb-6 uppercase flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 h-7 w-7 rounded-lg text-xs font-bold inline-flex items-center justify-center">1</span>
              <span>Маалыматтарды толтуруңуз</span>
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* Selected stats summary in form */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-gray-500">
                <div>
                  <span className="block text-gray-400">Бөлмөнүн түрү</span>
                  <strong className="text-slate-800 text-sm block mt-0.5">{getRoomName(roomClass)}</strong>
                </div>
                <div>
                  <span className="block text-gray-400">Мөөнөт</span>
                  <strong className="text-slate-800 text-sm block mt-0.5">{days} кун</strong>
                </div>
                <div>
                  <span className="block text-gray-400">Коноктор</span>
                  <strong className="text-slate-800 text-sm block mt-0.5">{guests} адам</strong>
                </div>
                <div>
                  <span className="block text-gray-400">Төлөм суммасы</span>
                  <strong className="text-emerald-600 text-sm block mt-0.5 font-bold">{totalPrice.toLocaleString('ru')} сом</strong>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 block text-left">Толук Аты-Жөнүңүз (ФИО): <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="Мисалы: Асанов Руслан"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl py-3 px-4 text-slate-800 text-sm transition-all focus:outline-hidden"
                />
              </div>

              {/* Phone number */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 block text-left">Телефон Номериңиз: <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-sm font-semibold text-slate-400 select-none">+996</span>
                  <input
                    type="tel"
                    required
                    placeholder=" (555) 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl py-3 pl-16 pr-4 text-slate-800 text-sm font-semibold transition-all focus:outline-hidden"
                  />
                </div>
                <span className="text-2xs text-gray-400 block text-left">Буйрутмаңызды тастыктоо үчүн ушул номерге байланышабыз.</span>
              </div>

              {/* Date of Arrival */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 block text-left">Качан Келесиз? (Келүү күнү): <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  required
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl py-3 px-4 text-slate-800 text-sm font-medium transition-all focus:outline-hidden"
                />
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 block text-left">Кошумча Каалоолор / Суроолор (Эгер болсо):</label>
                <textarea
                  placeholder="Мисалы: Биринчи кабаттан бөлмө берилсин, балдар үчүн кошумча керебет ж.б."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white rounded-xl py-3 px-4 text-slate-800 text-sm transition-all focus:outline-hidden resize-none"
                />
              </div>

              {/* Form buttons */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl active:scale-98 transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/25 flex items-center justify-center space-x-2 text-sm uppercase tracking-wider cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Арыз кабыл алынууда...</span>
                  </>
                ) : (
                  <>
                    <CheckSquare className="h-5 w-5" />
                    <span>Брондоону Растоо</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Side: Active Voucher Details or Past Bookings */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Newly Created Voucher Display */}
            <AnimatePresence mode="wait">
              {activeVoucher ? (
                <motion.div
                  key="voucher-active"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-emerald-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative stamp background */}
                  <div className="absolute right-0 bottom-0 opacity-5 -mr-16 -mb-16">
                    <QrCode className="h-64 w-64" />
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div>
                      <span className="text-2xs bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">Купон кабыл алынды</span>
                      <h4 className="font-display font-black text-white text-lg mt-1 uppercase">ЭС АЛУУ ЖОЛДОМОСУ</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-2xs text-slate-400 block">Буйрутма номери</span>
                      <span className="text-sm font-bold text-emerald-400 block">{activeVoucher.id}</span>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs font-medium text-slate-300">
                    
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-2xs text-slate-400 block uppercase">Кабыл алынды! Менин атымдан:</span>
                        <span className="text-sm font-bold text-white block">{activeVoucher.fullName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-2xs text-slate-400 block uppercase">Бөлмөнүн катар саны:</span>
                        <span className="text-sm font-bold text-white block">{getRoomName(activeVoucher.roomClass)}</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-2xs text-slate-400 block uppercase">Адам саны:</span>
                        <span className="text-sm font-bold text-white block">{activeVoucher.guests} киши</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-2xs text-slate-400 block uppercase">Эс алуу убактысы:</span>
                        <span className="text-sm font-bold text-white block">{activeVoucher.days} күн</span>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-2xs text-slate-400 block uppercase">Келүү күнү:</span>
                        <span className="text-sm font-bold text-white block">{activeVoucher.date}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 grid grid-cols-2 gap-2 text-emerald-300">
                      <div>
                        <span className="text-2xs block uppercase opacity-80">3 Маал Тамак:</span>
                        <span className="text-xs font-black block">АКЫСЫЗ КИРЕТ</span>
                      </div>
                      <div>
                        <span className="text-2xs block uppercase opacity-80">Процедуралар:</span>
                        <span className="text-xs font-black block">КИРГИЗИЛГЕН</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-2">
                      <div>
                        <span className="text-2xs block text-slate-400 uppercase">Менеджерге Төлөм:</span>
                        <span className="text-2xs text-slate-400">(Байланыш оператор аркылуу)</span>
                      </div>
                      <span className="text-2xl font-black text-emerald-400">
                        {activeVoucher.totalPrice.toLocaleString('ru')} сом
                      </span>
                    </div>

                    <div className="pt-4 space-y-3">
                      {/* Interactive click and send details directly via WhatsApp */}
                      <a
                        href={getWhatsAppLink(activeVoucher)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-transform hover:-translate-y-0.5"
                      >
                        <Send className="h-4 w-4 shrink-0" />
                        <span>Менеджерге WhatsApp-тан жөнөтүү</span>
                      </a>
                      <p className="text-center text-3xs text-slate-400 leading-normal">
                        Орундар чектелген! Өзүңүздүн ваучер - купонуңузду тастыктоо үчүн жогорудагы баскычты басып, адисибизге WhatsApp аркылуу жөнөтүңүз же <b>+996 555 12 34 56</b> номерине телефон чалыңыз.
                      </p>
                    </div>

                  </div>
                </motion.div>
              ) : (
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 text-center text-gray-500 space-y-4">
                  <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <QrCode className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">Брондоо Купонуңуз даяр боло элек</h4>
                    <p className="text-xs text-gray-400 mt-1">Олтургучта сол жактагы форманы толтуруп брондоо баскычын баскандан кийин, сизге атайын буйрутма купону жаралат.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Saved Bookings / Inquiries History LocalStorage */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
              <div className="flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                <History className="h-5 w-5 text-gray-600" />
                <h4 className="font-display font-extrabold text-sm text-slate-800 uppercase">Менин Срездерим ({savedBookings.length})</h4>
              </div>

              {savedBookings.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">Сизде азырынча сакталган брондоолор жок.</p>
              ) : (
                <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                  {savedBookings.map((b) => (
                    <div 
                      key={b.id} 
                      onClick={() => setActiveVoucher(b)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                        activeVoucher?.id === b.id 
                          ? 'bg-blue-50/50 border-blue-400' 
                          : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-3xs text-gray-400 uppercase font-semibold">{b.createdAt}</span>
                          <h5 className="font-bold text-slate-800 text-xs mt-0.5 truncate max-w-[160px]">{b.fullName}</h5>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xs font-extrabold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm">
                            {b.totalPrice.toLocaleString('ru')} сом
                          </span>
                          <button
                            onClick={(e) => handleDeleteBooking(b.id, e)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Өчүрүү"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-3xs text-gray-400 mt-2">
                        <span>Бөлмө: {getRoomName(b.roomClass)}</span>
                        <span>{b.days} күн / {b.guests} адам</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
