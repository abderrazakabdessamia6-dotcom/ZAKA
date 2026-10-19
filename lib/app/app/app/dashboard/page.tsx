'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, Edit, Trash2, Globe2, Save, Image as ImageIcon, 
  Check, ToggleLeft, ToggleRight, Layers, Settings, Eye, ExternalLink
} from 'lucide-react';
import { Dish, Category, Restaurant, Locale, Allergen } from '@/types/menu';

const ALLERGEN_OPTIONS: Allergen[] = [
  'Gluten', 'Dairy', 'Nuts', 'Eggs', 'Shellfish', 'Soy', 'Vegan', 'Vegetarian'
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dishes' | 'categories' | 'profile'>('dishes');
  const [selectedLanguage, setSelectedLanguage] = useState<Locale>('en');

  // Interactive local states (seeded with initial mock dataset)
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: 'd1',
      restaurant_id: 'r1',
      category_id: 'c1',
      title: { en: 'Truffle Burrata Bruschetta', fr: 'Bruschetta de Burrata', ar: 'بروسكيتا بوراتا', es: 'Bruschetta de Burrata' },
      description: { en: 'Toasted sourdough with truffle oil', fr: 'Pain grillé avec truffe', ar: 'عجين مخمر مع زيت الكمأة', es: 'Pan de masa madre con trufa' },
      ingredients: { en: 'Sourdough, burrata', fr: 'Pain, burrata', ar: 'عجين، بوراتا', es: 'Masa madre, burrata' },
      price: 14.50,
      allergens: ['Dairy', 'Gluten'],
      image_url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=300&h=200&fit=crop',
      gallery_urls: [],
      is_available: true,
      sort_order: 1
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 'c1', restaurant_id: 'r1', name: { en: 'Appetizers 🥗', fr: 'Entrées 🥗', ar: 'المقبلات 🥗', es: 'Entrantes 🥗' }, icon: 'Salad', sort_order: 1 },
    { id: 'c2', restaurant_id: 'r1', name: { en: 'Main Dishes 🍲', fr: 'Plats Principaux 🍲', ar: 'الأطباق الرئيسية 🍲', es: 'Platos 🍲' }, icon: 'Utensils', sort_order: 2 }
  ]);

  const [restaurantProfile, setRestaurantProfile] = useState<Restaurant>({
    id: 'r1',
    user_id: 'u1',
    slug: 'le-gourmet',
    name: 'Le Gourmet Oasis',
    tagline: { en: 'Artisan Modern Cuisine', fr: 'Cuisine Artisanale', ar: 'مطبخ معاصر وفخم', es: 'Cocina de Autor' },
    logo_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop',
    cover_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
    currency: 'USD',
    is_open: true,
    whatsapp: '1234567890',
    google_review_url: 'https://g.page/review',
    google_maps_url: 'https://maps.google.com'
  });

  // Modal / Form state for Dish CRUD
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Partial<Dish>>({
    title: { en: '', fr: '', ar: '', es: '' },
    description: { en: '', fr: '', ar: '', es: '' },
    ingredients: { en: '', fr: '', ar: '', es: '' },
    price: 0,
    category_id: categories[0]?.id || '',
    allergens: [],
    is_available: true,
    image_url: ''
  });

  // Instant Availability Toggle
  const toggleDishStock = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, is_available: !d.is_available } : d))
    );
  };

  const handleSaveDish = () => {
    if (editingDish.id) {
      setDishes(dishes.map(d => d.id === editingDish.id ? (editingDish as Dish) : d));
    } else {
      const newDish: Dish = {
        ...(editingDish as Dish),
        id: `dish-${Date.now()}`,
        restaurant_id: 'r1',
        sort_order: dishes.length + 1,
        gallery_urls: []
      };
      setDishes([...dishes, newDish]);
    }
    setIsDishModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 text-stone-900 dark:text-stone-100">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-stone-200 dark:border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-600 rounded-xl flex items-center justify-center text-white font-bold">
            🍽️
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">SaaS Menu Control Center</h1>
            <p className="text-xs text-stone-400">Editing: {restaurantProfile.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/p/${restaurantProfile.slug}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>Preview Client View</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>
      </header>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-2 border-b border-stone-200 dark:border-zinc-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('dishes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'dishes'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Menu Items & Stock</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-zinc-900 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Brand & Social Direct Actions</span>
          </button>
        </div>

        {/* TAB 1: DISHES & STOCK */}
        {activeTab === 'dishes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Dishes & Inventory</h2>
                <p className="text-xs text-stone-500">Toggle immediate in-stock status or edit multilingual details.</p>
              </div>
              <button
                onClick={() => {
                  setEditingDish({
                    title: { en: '', fr: '', ar: '', es: '' },
                    description: { en: '', fr: '', ar: '', es: '' },
                    ingredients: { en: '', fr: '', ar: '', es: '' },
                    price: 0,
                    category_id: categories[0]?.id || '',
                    allergens: [],
                    is_available: true,
                    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
                  });
                  setIsDishModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Dish</span>
              </button>
            </div>

            {/* Dishes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm"
                >
                  <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image src={dish.image_url} alt={dish.title.en} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm truncate">{dish.title.en}</h4>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{dish.description.en}</p>
                      <p className="font-mono text-sm font-bold text-amber-600 mt-2">
                        {dish.price.toFixed(2)} {restaurantProfile.currency}
                      </p>
                    </div>
                  </div>

                  {/* Stock Toggle & Control Bar */}
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-zinc-800 flex items-center justify-between">
                    <button
                      onClick={() => toggleDishStock(dish.id)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                        dish.is_available
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {dish.is_available ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      <span>{dish.is_available ? 'In Stock' : 'Out of Stock'}</span>
                    </button>

                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditingDish(dish);
                          setIsDishModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-stone-100 dark:hover:bg-zinc-800 rounded-lg text-stone-500"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDishes(dishes.filter((d) => d.id !== dish.id))}
                        className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & LINKS */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 max-w-2xl">
            <h3 className="text-lg font-bold mb-4">Direct Actions & Google Links</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-stone-500">Google Review Booster URL</label>
                <input
                  type="text"
                  value={restaurantProfile.google_review_url || ''}
                  onChange={(e) => setRestaurantProfile({ ...restaurantProfile, google_review_url: e.target.value })}
                  placeholder="https://g.page/r/your-id/review"
                  className="w-full mt-1 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-500">Google Maps Direction URL</label>
                <input
                  type="text"
                  value={restaurantProfile.google_maps_url || ''}
                  onChange={(e) => setRestaurantProfile({ ...restaurantProfile, google_maps_url: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full mt-1 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-stone-500">WhatsApp Number (with country code)</label>
                <input
                  type="text"
                  value={restaurantProfile.whatsapp || ''}
                  onChange={(e) => setRestaurantProfile({ ...restaurantProfile, whatsapp: e.target.value })}
                  placeholder="34612345678"
                  className="w-full mt-1 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                />
              </div>

              <button 
                onClick={() => alert('Profile updated in Supabase successfully!')}
                className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-amber-600 text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Save Identity Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MULTI-LANGUAGE DISH BUILDER MODAL */}
      {isDishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 border border-stone-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold mb-4">
              {editingDish.id ? 'Edit Dish' : 'Add New Dish'}
            </h3>

            {/* Language Switcher for Dish Fields */}
            <div className="flex items-center gap-2 mb-6 p-1.5 bg-stone-100 dark:bg-zinc-800 rounded-2xl">
              <Globe2 className="w-4 h-4 ml-2 text-stone-400" />
              {(['en', 'fr', 'ar', 'es'] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLanguage(loc)}
                  className={`px-3 py-1 text-xs font-bold rounded-xl uppercase transition-all ${
                    selectedLanguage === loc
                      ? 'bg-white dark:bg-zinc-900 text-amber-600 shadow-sm'
                      : 'text-stone-500'
                  }`}
                >
                  {loc} {loc === 'ar' ? '(RTL)' : ''}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {/* Dynamic Localized Title */}
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase">
                  Dish Title ({selectedLanguage.toUpperCase()})
                </label>
                <input
                  type="text"
                  dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  value={editingDish.title?.[selectedLanguage] || ''}
                  onChange={(e) =>
                    setEditingDish({
                      ...editingDish,
                      title: { ...editingDish.title!, [selectedLanguage]: e.target.value } as any
                    })
                  }
                  className="w-full mt-1.5 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                  placeholder="e.g. Signature Truffle Pasta"
                />
              </div>

              {/* Dynamic Localized Description */}
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase">
                  Description ({selectedLanguage.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  dir={selectedLanguage === 'ar' ? 'rtl' : 'ltr'}
                  value={editingDish.description?.[selectedLanguage] || ''}
                  onChange={(e) =>
                    setEditingDish({
                      ...editingDish,
                      description: { ...editingDish.description!, [selectedLanguage]: e.target.value } as any
                    })
                  }
                  className="w-full mt-1.5 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                />
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-500 uppercase">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingDish.price || 0}
                    onChange={(e) => setEditingDish({ ...editingDish, price: parseFloat(e.target.value) })}
                    className="w-full mt-1.5 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 uppercase">Category</label>
                  <select
                    value={editingDish.category_id}
                    onChange={(e) => setEditingDish({ ...editingDish, category_id: e.target.value })}
                    className="w-full mt-1.5 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name.en}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL preview */}
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase">Image URL (Supabase Storage)</label>
                <input
                  type="text"
                  value={editingDish.image_url || ''}
                  onChange={(e) => setEditingDish({ ...editingDish, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full mt-1.5 px-3.5 py-2.5 bg-stone-50 dark:bg-zinc-800 border rounded-xl text-sm"
                />
              </div>

              {/* Allergens Selector */}
              <div>
                <label className="text-xs font-semibold text-stone-500 uppercase mb-2 block">Allergen Tags</label>
                <div className="flex flex-wrap gap-2">
                  {ALLERGEN_OPTIONS.map((alg) => {
                    const isSelected = editingDish.allergens?.includes(alg);
                    return (
                      <button
                        key={alg}
                        type="button"
                        onClick={() => {
                          const current = editingDish.allergens || [];
                          const updated = isSelected
                            ? current.filter((a) => a !== alg)
                            : [...current, alg];
                          setEditingDish({ ...editingDish, allergens: updated });
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-stone-50 dark:bg-zinc-800 text-stone-500 border-stone-200 dark:border-zinc-700'
                        }`}
                      >
                        {alg}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-stone-100 dark:border-zinc-800">
              <button
                onClick={() => setIsDishModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-stone-500 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDish}
                className="px-5 py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow transition-colors"
              >
                Save Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
