'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Phone, MessageCircle, Instagram, 
  Globe, Search, X, CheckCircle2, AlertCircle, 
  UtensilsCrossed, ChevronRight, Share2 
} from 'lucide-react';
import { Locale, Dish, Category, Restaurant, UI_DICTIONARY, Allergen } from '@/types/menu';

// Mock Data for instantaneous preview
const MOCK_RESTAURANT: Restaurant = {
  id: 'rest-1',
  user_id: 'usr-1',
  slug: 'le-gourmet',
  name: 'Le Gourmet Oasis',
  tagline: {
    en: 'Mediterranean Modern Cuisine & Artisan Roastery',
    fr: 'Cuisine Méditerranéenne Moderne & Torréfaction',
    ar: 'مطبخ متوسطي معاصر ومحمصة قهوة مختصة',
    es: 'Cocina Mediterránea Moderna y Café de Especialidad'
  },
  logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop',
  cover_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
  currency: 'EUR',
  is_open: true,
  phone: '+34912345678',
  whatsapp: '34912345678',
  address: 'Paseo de la Castellana 45, Madrid',
  google_maps_url: 'https://maps.google.com',
  google_review_url: 'https://g.page/r/review',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  website: 'https://legourmet.example.com'
};

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', restaurant_id: 'rest-1', name: { en: 'Appetizers 🥗', fr: 'Entrées 🥗', ar: 'المقبلات 🥗', es: 'Entrantes 🥗' }, icon: 'Salad', sort_order: 1 },
  { id: 'cat-2', restaurant_id: 'rest-1', name: { en: 'Main Dishes 🍲', fr: 'Plats Principaux 🍲', ar: 'الأطباق الرئيسية 🍲', es: 'Platos Fuertes 🍲' }, icon: 'Utensils', sort_order: 2 },
  { id: 'cat-3', restaurant_id: 'rest-1', name: { en: 'Wood-Fired Pizza 🍕', fr: 'Pizzas au Feu 🍕', ar: 'بيتزا الحطب 🍕', es: 'Pizzas al Horno 🍕' }, icon: 'Pizza', sort_order: 3 },
  { id: 'cat-4', restaurant_id: 'rest-1', name: { en: 'Drinks & Cocktails 🍹', fr: 'Boissons & Cocktails 🍹', ar: 'المشروبات 🍹', es: 'Bebidas 🍹' }, icon: 'Wine', sort_order: 4 },
  { id: 'cat-5', restaurant_id: 'rest-1', name: { en: 'Desserts 🍰', fr: 'Desserts 🍰', ar: 'الحلويات 🍰', es: 'Postres 🍰' }, icon: 'Cake', sort_order: 5 },
];

const MOCK_DISHES: Dish[] = [
  {
    id: 'dish-1',
    restaurant_id: 'rest-1',
    category_id: 'cat-1',
    title: {
      en: 'Truffle Burrata Bruschetta',
      fr: 'Bruschetta de Burrata à la Truffe',
      ar: 'بروسكيتا بوراتا بالكمأة',
      es: 'Bruschetta de Burrata con Trufa'
    },
    description: {
      en: 'Creamy Italian burrata on toasted sourdough with summer truffle glaze and fresh heirloom tomatoes.',
      fr: 'Burrata crémeuse sur pain au levain grillé avec glaçage à la truffe et tomates d\'antan.',
      ar: 'جبنة بوراتا الإيطالية الكريمية على خبز العجين المخمر مع صوص الكمأة والطماطم الطازجة.',
      es: 'Burrata cremosa sobre pan de masa madre con glaseado de trufa y tomates cherry confitados.'
    },
    ingredients: {
      en: 'Sourdough, Burrata, Black Truffle, Heirloom Tomato, Basil, Extra Virgin Olive Oil',
      fr: 'Pain levain, Burrata, Truffe noire, Tomates, Basilic, Huile d\'olive',
      ar: 'خبز مخمر، جبن بوراتا، كمأة سوداء، طماطم، ريحان، زيت زيتون بكر',
      es: 'Masa madre, Burrata, Trufa negra, Tomate, Albahaca, Aceite de oliva virgen extra'
    },
    price: 14.50,
    allergens: ['Dairy', 'Gluten', 'Vegetarian'],
    image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600&h=450&fit=crop',
    gallery_urls: [
      'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=800&h=600&fit=crop'
    ],
    is_available: true,
    sort_order: 1
  },
  {
    id: 'dish-2',
    restaurant_id: 'rest-1',
    category_id: 'cat-2',
    title: {
      en: 'Pan-Seared Wagyu Ribeye',
      fr: 'Entrecôte Wagyu Poêlée',
      ar: 'ريب آي واغيو المشوي',
      es: 'Ojo de Bife Wagyu Sellado'
    },
    description: {
      en: 'A5 Grade Japanese Wagyu served with roasted garlic puree and rosemary-infused bone reduction.',
      fr: 'Wagyu japonais Grade A5 servi avec purée d\'ail rôti et réduction de jus au romarin.',
      ar: 'شريحة لحم واغيو يابانية درجة A5 تقدم مع هريس الثوم المشوي وصوص الروزماري الخاص.',
      es: 'Wagyu japonés Grado A5 servido con puré de ajo asado y reducción de ternera al romero.'
    },
    ingredients: {
      en: 'Wagyu Beef, Roasted Garlic, Rosemary, Sea Salt, Butter',
      fr: 'Boeuf Wagyu, Ail rôti, Romarin, Fleur de sel, Beurre',
      ar: 'لحم واغيو، ثوم مشوي، إكليل الجبل، ملح بحري، زبدة',
      es: 'Carne Wagyu, Ajo asado, Romero, Sal marina, Mantequilla'
    },
    price: 38.00,
    allergens: ['Dairy'],
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=450&fit=crop',
    gallery_urls: ['https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop'],
    is_available: false, // Out of stock example
    sort_order: 2
  },
  {
    id: 'dish-3',
    restaurant_id: 'rest-1',
    category_id: 'cat-3',
    title: {
      en: 'Neapolitan Margherita D.O.P.',
      fr: 'Margherita Napolitaine D.O.P.',
      ar: 'بيتزا مارغريتا نابوليتانا',
      es: 'Margherita Napolitana D.O.P.'
    },
    description: {
      en: 'San Marzano tomatoes, Fior di Latte mozzarella, organic basil, and cold-pressed extra virgin olive oil.',
      fr: 'Tomates San Marzano, mozzarella Fior di Latte, basilic bio et huile d\'olive vierge extra.',
      ar: 'طماطم سان مارزانو، جبنة فيور دي لاتي، ريحان عضوي وزيت زيتون بكر ممتاز معصور على البارد.',
      es: 'Tomates San Marzano, mozzarella Fior di Latte, albahaca orgánica y aceite de oliva virgen extra.'
    },
    ingredients: {
      en: '00 Flour, San Marzano Tomatoes, Fior di Latte, Basil, Extra Virgin Olive Oil',
      fr: 'Farine 00, Tomates San Marzano, Fior di Latte, Basilic, Huile d\'olive',
      ar: 'طحين نوع 00، طماطم سان مارزانو، جبن موزاريلا، ريحان، زيت زيتون',
      es: 'Harina 00, Tomates San Marzano, Fior di Latte, Albahaca, Aceite de oliva'
    },
    price: 13.00,
    allergens: ['Gluten', 'Dairy', 'Vegetarian'],
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=600&h=450&fit=crop',
    gallery_urls: ['https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=600&fit=crop'],
    is_available: true,
    sort_order: 3
  }
];

export default function RestaurantMenuCustomerView() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDish, setActiveDish] = useState<Dish | null>(null);

  const t = UI_DICTIONARY[currentLocale];
  const isRtl = currentLocale === 'ar';

  const filteredDishes = useMemo(() => {
    return MOCK_DISHES.filter((dish) => {
      const matchesCategory = selectedCategory === 'all' || dish.category_id === selectedCategory;
      const title = (dish.title[currentLocale] || dish.title.en).toLowerCase();
      const desc = (dish.description[currentLocale] || dish.description.en).toLowerCase();
      const query = searchQuery.toLowerCase();
      const matchesSearch = title.includes(query) || desc.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, currentLocale]);

  return (
    <div 
      dir={isRtl ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-stone-50 dark:bg-zinc-950 text-stone-900 dark:text-stone-100 font-sans pb-16 selection:bg-amber-500 selection:text-white`}
    >
      {/* 1. FLOATING REAL-TIME LANGUAGE SELECTOR */}
      <div className="fixed top-4 right-4 z-50 flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full p-1 border border-stone-200 dark:border-zinc-800 shadow-xl">
        {(['en', 'fr', 'es', 'ar'] as Locale[]).map((loc) => (
          <button
            key={loc}
            onClick={() => setCurrentLocale(loc)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-full uppercase tracking-wider transition-all duration-200 ${
              currentLocale === loc
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* 2. COVER & BRAND IDENTITY */}
      <div className="relative w-full h-56 sm:h-72 lg:h-80 bg-stone-800 overflow-hidden">
        <Image
          src={MOCK_RESTAURANT.cover_url}
          alt={MOCK_RESTAURANT.name}
          fill
          priority
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 sm:p-6 shadow-xl border border-stone-100 dark:border-zinc-800/80">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-zinc-900 -mt-12 sm:-mt-16 flex-shrink-0">
              <Image
                src={MOCK_RESTAURANT.logo_url}
                alt={MOCK_RESTAURANT.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-start flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-white">
                  {MOCK_RESTAURANT.name}
                </h1>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  MOCK_RESTAURANT.is_open 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' 
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${MOCK_RESTAURANT.is_open ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                  {MOCK_RESTAURANT.is_open ? t.open : t.closed}
                </span>
              </div>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                {MOCK_RESTAURANT.tagline[currentLocale]}
              </p>
            </div>
          </div>

          {/* 3. PRO SERVICE & SOCIAL ACTIONS BAR */}
          <div className="mt-5 pt-4 border-t border-stone-100 dark:border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Google Review Booster */}
            <a
              href={MOCK_RESTAURANT.google_review_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 font-medium text-xs border border-amber-200/70 dark:border-amber-800/40 hover:bg-amber-100 transition-colors"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{t.leaveReview}</span>
            </a>

            {/* Google Maps Navigate */}
            <a
              href={MOCK_RESTAURANT.google_maps_url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium text-xs transition-colors"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>{t.getDirections}</span>
            </a>

            {/* WhatsApp Direct Order / Support */}
            <a
              href={`https://wa.me/${MOCK_RESTAURANT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 font-medium text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>{t.orderWhatsApp}</span>
            </a>

            {/* Social Icons Hub */}
            <div className="flex items-center justify-around py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-zinc-800">
              {MOCK_RESTAURANT.instagram && (
                <a href={MOCK_RESTAURANT.instagram} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-pink-600 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {MOCK_RESTAURANT.phone && (
                <a href={`tel:${MOCK_RESTAURANT.phone}`} className="text-stone-500 hover:text-sky-600 transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
              )}
              {MOCK_RESTAURANT.website && (
                <a href={MOCK_RESTAURANT.website} target="_blank" rel="noreferrer" className="text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 4. SEARCH BAR */}
        <div className="relative mt-6">
          <Search className={`absolute top-3.5 ${isRtl ? 'right-4' : 'left-4'} w-5 h-5 text-stone-400`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full py-3 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600`}
          />
        </div>

        {/* 5. SMOOTH CATEGORY HORIZONTAL CAROUSEL */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-4 mt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-zinc-900 text-white dark:bg-amber-600 shadow-sm'
                : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-zinc-800 hover:bg-stone-50'
            }`}
          >
            {t.allItems}
          </button>
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white dark:bg-amber-600 shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-zinc-800 hover:bg-stone-50'
              }`}
            >
              {cat.name[currentLocale] || cat.name.en}
            </button>
          ))}
        </div>

        {/* 6. DISH CARDS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActiveDish(dish)}
                className={`relative flex gap-4 p-3.5 bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200/80 dark:border-zinc-800 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 group overflow-hidden ${
                  !dish.is_available ? 'opacity-70' : ''
                }`}
              >
                {/* Out Of Stock Banner */}
                {!dish.is_available && (
                  <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <span className="bg-rose-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-lg">
                      {t.outOfStock}
                    </span>
                  </div>
                )}

                {/* Dish Media */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-zinc-800">
                  <Image
                    src={dish.image_url}
                    alt={dish.title[currentLocale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Dish Meta */}
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white truncate group-hover:text-amber-600 transition-colors">
                      {dish.title[currentLocale]}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                      {dish.description[currentLocale]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-base text-amber-700 dark:text-amber-400 font-mono">
                      {dish.price.toFixed(2)} {MOCK_RESTAURANT.currency}
                    </span>
                    <span className="text-xs text-stone-400 group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 7. DISH DETAIL & ALLERGEN MODAL */}
      <AnimatePresence>
        {activeDish && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar border border-stone-200 dark:border-zinc-800 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDish(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Gallery Image */}
              <div className="relative w-full h-64 sm:h-72 bg-stone-100 dark:bg-zinc-800">
                <Image
                  src={activeDish.gallery_urls[0] || activeDish.image_url}
                  alt={activeDish.title[currentLocale]}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                    {activeDish.title[currentLocale]}
                  </h2>
                  <span className="text-xl font-mono font-bold text-amber-600 dark:text-amber-400 flex-shrink-0">
                    {activeDish.price.toFixed(2)} {MOCK_RESTAURANT.currency}
                  </span>
                </div>

                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {activeDish.description[currentLocale]}
                </p>

                {/* Ingredients */}
                {activeDish.ingredients && (
                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                      {t.ingredients}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                      {activeDish.ingredients[currentLocale]}
                    </p>
                  </div>
                )}

                {/* Allergen Tags */}
                {activeDish.allergens.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
                      {t.allergens}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeDish.allergens.map((alg) => (
                        <span
                          key={alg}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-stone-100 dark:bg-zinc-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-zinc-700/60"
                        >
                          {alg}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
