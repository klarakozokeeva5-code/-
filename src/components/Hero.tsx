import React from 'react';
import { motion } from 'motion/react';
import { Star, Flame, ShieldCheck, Utensils, CheckCircle } from 'lucide-react';

interface HeroProps {
  onScrollToCalculator: () => void;
}

export default function Hero({ onScrollToCalculator }: HeroProps) {
  // Let's use the exactly generated image path
  const heroImageSrc = "/src/assets/images/issyk_kul_hero_1781205280090.jpg";

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Image with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImageSrc} 
          alt="Голубой Иссык-Куль Санаторийи" 
          className="w-full h-full object-cover opacity-60 scale-102 transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-xxs bottom-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent h-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-500/25 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-blue-300 backdrop-blur-xs text-xs sm:text-sm font-semibold tracking-wide"
            >
              <Flame className="h-4 w-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Ысык-Көлдөгү Эң Белгилүү Санаторий</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight leading-tight uppercase"
            >
              «Голубой Иссык-Куль» <br />
              <span className="text-blue-400 bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">Санаторийи</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed"
            >
              Сиз каалаган эң сонун эс алуу жана ден соолукту чыңдоо мезгили келди! Көл жээгиндеги таза аба, шипаалуу термалдык булактар жана заманбап медициналык дарылоо процедуралары сизди күтөт.
            </motion.p>

            {/* Quick Badges Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4"
            >
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="bg-emerald-500 text-white rounded-lg p-2 flex items-center justify-center">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300">Үч Маал Тамак Бекер!</h3>
                  <p className="text-xs text-slate-300">Толук пайдалуу улуттук ашкана</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                <div className="bg-blue-500 text-white rounded-lg p-2 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-blue-300">Медициналык Дарылоо</h3>
                  <p className="text-xs text-slate-300">Пакет баасына толук камтылган</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <button 
                onClick={onScrollToCalculator}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-98 transition-all text-center"
              >
                Орун Брондоо — 3500 сомдон
              </button>
              <a 
                href="#meals"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-8 py-4 rounded-2xl text-center backdrop-blur-xs transition-colors"
              >
                Тамак & Шарттарды көрүү
              </a>
            </motion.div>
          </div>

          {/* Majestic Price Promo Card */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950/95 border-2 border-emerald-500/50 p-6 sm:p-8 rounded-3xl shadow-2xl relative"
          >
            {/* Tag / Badge */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-black uppercase px-3.5 py-1.5 rounded-xl shadow-lg tracking-widest flex items-center space-x-1 animate-bounce">
              <span>Ысык Сунуш!</span>
            </div>

            <div className="space-y-4">
              <div className="text-center pb-2 border-b border-white/10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block mb-1">Күнүмдүк Пакет</span>
                <span className="text-4xl sm:text-5xl font-display font-black text-white block">
                  3500 <span className="text-xl font-normal text-slate-300">сом</span>
                </span>
                <span className="text-xs text-slate-400 mt-1 block">Күнүнө бир адамга, баары ичинде</span>
              </div>

              <h4 className="font-bold text-sm text-slate-300 uppercase tracking-wider">Пакетке эмне кошулган?</h4>
              <ul className="space-y-2.5 text-sm my-4">
                <li className="flex items-start space-x-2.5 text-slate-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 fill-emerald-400/20 shrink-0 mt-0.5" />
                  <span><strong>3 маал тамактар:</strong> Эртең мененки, түшкү, кечки тамак (ысык, сапаттуу меню)</span>
                </li>
                <li className="flex items-start space-x-2.5 text-slate-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 fill-emerald-400/20 shrink-0 mt-0.5" />
                  <span><strong>Дарылоо процедуралары:</strong> Санаторийдин шипаалуу баткагы жана минералдык жылуу суусу</span>
                </li>
                <li className="flex items-start space-x-2.5 text-slate-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 fill-emerald-400/20 shrink-0 mt-0.5" />
                  <span><strong>Жайлуу бөлмөлөр:</strong> Душ, телевизор, муздаткыч менен толук камсыздалган шарттар</span>
                </li>
                <li className="flex items-start space-x-2.5 text-slate-200">
                  <CheckCircle className="h-5 w-5 text-emerald-400 fill-emerald-400/20 shrink-0 mt-0.5" />
                  <span><strong>Ысык-Көл кумдуу жээги:</strong> Санаторийдин өздүк тосулган таза жээгине акысыз кирүү</span>
                </li>
              </ul>

              <div className="pt-2">
                <button 
                  onClick={onScrollToCalculator}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 flex items-center justify-center space-x-2"
                >
                  <span>Бааларды эсептөө & Заказ</span>
                </button>
              </div>

              <div className="flex justify-center items-center space-x-1 text-xs text-slate-400 pt-2">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="pl-1 text-slate-300 font-semibold">1,200+ Бактылуу Кардарлар</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
