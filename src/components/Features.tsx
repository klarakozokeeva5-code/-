import React, { useState } from 'react';
import { MEAL_PLAN, APP_PROCEDURES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Utensils, Award, HeartHandshake, TreePine, Droplets, Sparkles, Wind, Activity } from 'lucide-react';

export default function Features() {
  const [activeTab, setActiveTab] = useState<'food' | 'procedures' | 'park'>('food');

  // Map icon strings to Lucide elements
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="h-6 w-6 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="h-6 w-6 text-purple-600" />;
      case 'Wind': return <Wind className="h-6 w-6 text-teal-600" />;
      case 'Activity': return <Activity className="h-6 w-6 text-emerald-600" />;
      default: return <Award className="h-6 w-6 text-blue-600" />;
    }
  };

  const foodImageSrc = "/src/assets/images/three_meals_1781205301317.jpg";

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">Эмне үчүн Голубой Иссык-Куль?</span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-2 tracking-tight uppercase">
            ДЕН СООЛУК ЖАНА ЭС АЛУУ УШУЛ ЖЕРДЕ БАШТАЛАТ
          </h2>
          <p className="text-gray-600 mt-4">
            3500 сомдун ичинде сизге бир гана ыңгайлуу бөлмө эмес, эң даамдуу суткалык 3 маал тамактануу жана ден соолукту толук чыңдоочу дарылоо камтылган.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('food')}
            className={`flex items-center space-x-2 py-3 px-6 rounded-2xl font-semibold text-sm transition-all shadow-xs ${
              activeTab === 'food'
                ? 'bg-emerald-600 text-white shadow-emerald-600/10'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Utensils className="h-4 w-4" />
            <span>3 Маал Ысык Тамак</span>
          </button>
          <button
            onClick={() => setActiveTab('procedures')}
            className={`flex items-center space-x-2 py-3 px-6 rounded-2xl font-semibold text-sm transition-all shadow-xs ${
              activeTab === 'procedures'
                ? 'bg-blue-600 text-white shadow-blue-600/10'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Дарылоо Процедуралары</span>
          </button>
          <button
            onClick={() => setActiveTab('park')}
            className={`flex items-center space-x-2 py-3 px-6 rounded-2xl font-semibold text-sm transition-all shadow-xs ${
              activeTab === 'park'
                ? 'bg-blue-900 text-white shadow-blue-900/10'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <TreePine className="h-4 w-4" />
            <span>Парк & Алтын Кум Жээги</span>
          </button>
        </div>

        {/* Tab Content with Animation */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-100 border border-slate-100">
          <AnimatePresence mode="wait">
            {activeTab === 'food' && (
              <motion.div
                key="food-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                {/* Text / Timeline of Food */}
                <div id="meals" className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-slate-900 uppercase">
                      Үч Маал Жаңы Даярдалган Тамак
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Биздин башкы максатыбыз — сиздин ден соолугуңуз. Санаторийдин диетолог адистери иштеп чыккан, күнүнө 3 маал берилүүчү пайдалуу, витаминдерге бай улуттук жана европалык даамдуу меню. Бардык азык-түлүктөр Ысык-Көлдүн экологиялык таза фермаларынан күн сайын жаңы алынып келинет.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {MEAL_PLAN.map((mealItem, index) => (
                      <div key={index} className="flex space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="flex-shrink-0 bg-emerald-100 text-emerald-700 font-extrabold text-sm h-12 w-12 rounded-xl flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-slate-900 text-base">{mealItem.meal}</h4>
                            <span className="text-xs bg-emerald-500/10 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">{mealItem.time}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{mealItem.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {mealItem.menu.map((food, fIdx) => (
                              <span key={fIdx} className="text-xs bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">
                                • {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Collage Image with tag */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden aspect-square shadow-lg border border-gray-100">
                    <img 
                      src={foodImageSrc} 
                      alt="3 маал даамдуу тамактар" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="bg-emerald-500 text-white text-xs font-bold uppercase py-1 px-2.5 rounded-md mb-2 inline-block">100% Халал Меню</span>
                      <h4 className="text-white font-bold text-lg">Ысык Жана Таза Тамактануу</h4>
                      <p className="text-slate-200 text-xs mt-1">Организмди калыбына келтирүүчү атайын диетологиялык бышырылган тамак-аштар.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'procedures' && (
              <motion.div
                key="procedures-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div id="procedure-list" className="max-w-2xl">
                  <h3 className="text-2xl font-display font-black text-slate-900 uppercase">
                    Шыпаалуу Баткак Жана Минералдык Натрий Суусу
                  </h3>
                  <p className="text-gray-600 mt-2">
                    «Голубой Иссык-Куль» санаторийи өзүнүн касиеттүү баткактары жана жер астынан чыккан жылуу минералдык булак суулары менен дүйнөгө белгилүү. Пакетке төмөндөгү процедуралар толук жеңилдиктер менен кирет:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {APP_PROCEDURES.map((procedure) => (
                    <div key={procedure.id} className="p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg border border-slate-100 group transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="bg-white p-3.5 rounded-xl shadow-xs group-hover:bg-blue-50 transition-colors">
                          {getIcon(procedure.icon)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{procedure.name}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed">{procedure.description}</p>
                          <div className="bg-blue-50/50 p-2.5 rounded-xl mt-3 border border-blue-50/30">
                            <span className="text-xs font-bold text-blue-800 uppercase block">Пайдасы:</span>
                            <span className="text-xs text-blue-900">{procedure.benefits}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'park' && (
              <motion.div
                key="park-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              >
                <div className="lg:col-span-5 relative">
                  <div className="rounded-3xl overflow-hidden aspect-video lg:aspect-square bg-slate-100 flex items-center justify-center shadow-inner relative border border-slate-200">
                    {/* Fallback pattern with beautiful css placeholders */}
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/seed/beach/800/800')` }}></div>
                    <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-xs"></div>
                    <div className="relative text-center p-6 text-white z-10">
                      <TreePine className="h-16 w-16 text-emerald-400 mx-auto mb-4 drop-shadow" />
                      <h4 className="font-bold text-xl drop-shadow">Кылымдык Карагай Паркы</h4>
                      <p className="text-sm text-slate-200 mt-2 drop-shadow">Көптөгөн ийне жалбырактуу жана кайың аллеялары бар жапжашыл парк зонасы.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-slate-900 uppercase">
                      Түз Жээкте Жайгашкан Жайлуу Шарттар
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Санаторийдин аянты Чолпон-Ата шаарынын эң таза жээк тилкесин өзүнө камтыйт. Бул жерде карагай токою менен көл жээги биригип, дем алуу органдары үчүн маанилүү аэроиондордун каныгуусун камсыз кылат.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm">✓ Өздүк Алтын Кум Жээги</h4>
                      <p className="text-xs text-gray-500 mt-1">Көлгө акысыз кирүү, пирс жана жайлуу шезлонгдор.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm">✓ Экологиялык Таза Аба</h4>
                      <p className="text-xs text-gray-500 mt-1">Ийне жалбырактуу дарактар бөлгөн фитонциддер өпкөнү айыктырат.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm">✓ Коопсуз Аймак</h4>
                      <p className="text-xs text-gray-500 mt-1">24 саат кайтарылган аймак, бейпил жана санаасыз эс алуу.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-slate-800 text-sm">✓ Спорт Жана Балдар аянтчасы</h4>
                      <p className="text-xs text-gray-500 mt-1">Сыртта машыгуу үчүн бардык заманбап спорт жабдыктары.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
