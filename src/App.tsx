import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import BookingForm from './components/BookingForm';
import { RoomClass } from './types';
import { ROOMS_INFO } from './data';
import { 
  HelpCircle, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  ChevronDown, 
  Clock, 
  Heart 
} from 'lucide-react';

export default function App() {
  // Shared interactive states for calculator and booking form
  const [days, setDays] = useState<number>(5);
  const [guests, setGuests] = useState<number>(2);
  const [roomClass, setRoomClass] = useState<RoomClass>('standard');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const formRef = useRef<HTMLDivElement | null>(null);

  const currentRoom = ROOMS_INFO.find((r) => r.type === roomClass) || ROOMS_INFO[0];
  const totalPrice = currentRoom.price * days * guests;

  const handleScrollToBooking = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqData = [
    {
      q: "3500 сомдук баага үч маал тамак чын эле киреби?",
      a: "Ооба, чын! Голубой Иссык-Куль санаторийинин сунуштаган стандарттык баасына суткасына 3 маал пайдалуу жана толук кандуу тамактануу (эртең мененки, түшкү жана кечки ысык тамак) толугу менен кошулган."
    },
    {
      q: "Дарылоо процедураларынын кайсы түрлөрү баанын ичинде камтылган?",
      a: "Суу менен дарылоо (минералдык ванналар), шыпаалуу баткак жапмалары, ингаляция жана туз бөлмөсүнө кирүү сыяктуу негизги процедуралар кароодон кийин пакетке киргизилет."
    },
    {
      q: "Балдарды алып баруу шарттары кандай жана арзандатуулар барбы?",
      a: "3 жашка чейинки балдар ата-энесинин жанында жаңы жатак орунсуз жана тамак-ашсыз акысыз эс ала алышат. 3 жаштан 10 жашка чейинки балдар үчүн макулдашуу негизинде атайын жеңилдиктер каралат."
    },
    {
      q: "Өзүбүз менен кошо кандай документтерди ала баруубуз керек?",
      a: "Ар бир чоң киши үчүн Кыргыз Республикасынын жаранынын паспорту (же эл аралык паспорт) жана балдардын туулгандыгы тууралуу күбөлүгү талап кылынат. Мүмкүн болсо, үй-бүлөлүк дарыгердин амбулатордук картасын алып алганыңыз оң."
    },
    {
      q: "Брондолгон акыны кантип жана качан төлөйбүз?",
      a: "Алдын ала жарнама сайты аркылуу арыз толтурганыңыздан кийин, биздин менеджер сиз менен байланышып, орун бар экенин ырастайт. Сиз төлөмдү санаторийге катталганда накталай же Элкарт/О!Деньги мобилдик тиркемелери аркылуу өткөрө аласыз."
    }
  ];

  return (
    <div id="full-app-root" className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Header onScrollToCalculator={handleScrollToBooking} />

      {/* 2. Main Hero Section */}
      <Hero onScrollToCalculator={handleScrollToBooking} />

      {/* 3. Features section (Meals, treatments, beach, trees) */}
      <Features />

      {/* 4. Cost Calculator */}
      <Calculator 
        days={days}
        setDays={setDays}
        guests={guests}
        setGuests={setGuests}
        roomClass={roomClass}
        setRoomClass={setRoomClass}
        onBookNow={handleScrollToBooking}
      />

      {/* 5. Booking Inquiry Form */}
      <BookingForm 
        days={days}
        guests={guests}
        roomClass={roomClass}
        totalPrice={totalPrice}
        formRef={formRef}
      />

      {/* 6. FAQ Section */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="h-9 w-9 text-blue-600 mx-auto mb-2" />
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 uppercase">Популярдуу Суроолор</h2>
            <p className="text-gray-500 mt-2 text-sm">Санаторий тууралуу эң көп берилүүчү суроолорго расмий жооптор</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100/75 text-left transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === index && (
                  <div className="p-5 bg-white border-t border-slate-100 text-sm text-gray-600 leading-relaxed text-left">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Details / Map Section */}
      <section className="bg-slate-900 text-white py-14 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-10">
            
            {/* Contact Card 1 */}
            <div className="flex items-center space-x-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="bg-blue-600 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Биздин Дарек</h4>
                <p className="text-sm text-slate-200 font-semibold mt-0.5">Кыргызстан, Чолпон-Ата ш., Ысык-Көл жээги</p>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="flex items-center space-x-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="bg-emerald-600 p-3 rounded-xl">
                <PhoneCall className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Байланыш оператор</h4>
                <p className="text-sm text-slate-200 font-semibold mt-0.5">+996 (555) 123-456</p>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="flex items-center space-x-4 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
              <div className="bg-blue-900 p-3 rounded-xl">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Электрондук почта</h4>
                <p className="text-sm text-slate-200 font-semibold mt-0.5">info@goluboyissyk-kul.kg</p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-slate-500">
            <p>© 2026. «Голубой Иссык-Куль» Санаторийинин расмий промо жарнама баракчасы.</p>
            <p className="flex items-center mt-3 sm:mt-0 space-x-1">
              <span>Ысык-Көл алтын куму менен сизди кутат</span>
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
