export type Locale = 'en' | 'fr' | 'ar' | 'es';

export interface LocalizedString {
  en: string;
  fr: string;
  ar: string;
  es: string;
}

export type Allergen = 
  | 'Gluten' 
  | 'Dairy' 
  | 'Nuts' 
  | 'Eggs' 
  | 'Shellfish' 
  | 'Soy' 
  | 'Vegan' 
  | 'Vegetarian';

export interface Restaurant {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  tagline: LocalizedString;
  logo_url: string;
  cover_url: string;
  currency: string;
  is_open: boolean;
  phone?: string;
  whatsapp?: string;
  address?: string;
  google_maps_url?: string;
  google_review_url?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  website?: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: LocalizedString;
  icon: string;
  sort_order: number;
}

export interface Dish {
  id: string;
  restaurant_id: string;
  category_id: string;
  title: LocalizedString;
  description: LocalizedString;
  ingredients: LocalizedString;
  price: number;
  allergens: Allergen[];
  image_url: string;
  gallery_urls: string[];
  is_available: boolean;
  sort_order: number;
}

export const UI_DICTIONARY: Record<Locale, Record<string, string>> = {
  en: {
    open: 'Open Now',
    closed: 'Closed',
    leaveReview: 'Leave a Review',
    getDirections: 'Directions',
    orderWhatsApp: 'WhatsApp',
    searchPlaceholder: 'Search dishes, drinks, ingredients...',
    outOfStock: 'Out of Stock',
    allergens: 'Allergens & Dietary',
    ingredients: 'Ingredients',
    allItems: 'All Items',
    saveChanges: 'Save Changes',
    addNewDish: 'Add New Dish',
    editDish: 'Edit Dish',
    dishTitle: 'Dish Name',
    dishDescription: 'Description',
    dishPrice: 'Price',
    availability: 'Available to order',
    inStock: 'In Stock',
  },
  fr: {
    open: 'Ouvert',
    closed: 'Fermé',
    leaveReview: 'Laisser un avis',
    getDirections: 'Itinéraire',
    orderWhatsApp: 'WhatsApp',
    searchPlaceholder: 'Rechercher un plat, ingrédient...',
    outOfStock: 'Épuisé',
    allergens: 'Allergènes & Régimes',
    ingredients: 'Ingrédients',
    allItems: 'Tous les plats',
    saveChanges: 'Enregistrer',
    addNewDish: 'Ajouter un plat',
    editDish: 'Modifier le plat',
    dishTitle: 'Nom du plat',
    dishDescription: 'Description',
    dishPrice: 'Prix',
    availability: 'Disponible',
    inStock: 'En stock',
  },
  ar: {
    open: 'مفتوح الآن',
    closed: 'مغلق',
    leaveReview: 'اترك تقييماً',
    getDirections: 'الاتجاهات',
    orderWhatsApp: 'واتساب',
    searchPlaceholder: 'ابحث عن أطباق، مشروبات...',
    outOfStock: 'غير متوفر',
    allergens: 'المكونات ومسببات الحساسية',
    ingredients: 'المكونات',
    allItems: 'جميع الأطباق',
    saveChanges: 'حفظ التغييرات',
    addNewDish: 'إضافة طبق جديد',
    editDish: 'تعديل الطبق',
    dishTitle: 'اسم الطبق',
    dishDescription: 'الوصف',
    dishPrice: 'السعر',
    availability: 'متاح للطلب',
    inStock: 'متوفر',
  },
  es: {
    open: 'Abierto Ahora',
    closed: 'Cerrado',
    leaveReview: 'Dejar una Reseña',
    getDirections: 'Cómo llegar',
    orderWhatsApp: 'WhatsApp',
    searchPlaceholder: 'Buscar platos, bebidas...',
    outOfStock: 'Agotado',
    allergens: 'Alérgenos y Dietas',
    ingredients: 'Ingredientes',
    allItems: 'Todos los platos',
    saveChanges: 'Guardar cambios',
    addNewDish: 'Añadir Plato',
    editDish: 'Editar Plato',
    dishTitle: 'Nombre del Plato',
    dishDescription: 'Descripción',
    dishPrice: 'Precio',
    availability: 'Disponible para ordenar',
    inStock: 'Disponible',
  },
};
