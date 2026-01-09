import type { GlassType } from '@/types/configurator';

export const GLASS_TYPES: GlassType[] = [
  // TruVue Müze
  {
    id: 'truvue-museum-glass',
    name: 'TruVue Museum Glass',
    category: 'truvue-muze',
    surface: 'antirefle',
    pricePerSqm: 350
  },
  {
    id: 'truvue-optium-museum',
    name: 'TruVue Optium Museum Acrylic',
    category: 'truvue-muze',
    surface: 'antirefle',
    pricePerSqm: 450
  },
  
  // UV70
  {
    id: 'uv70-clear',
    name: 'UV70 Clear',
    category: 'uv70',
    surface: 'parlak',
    pricePerSqm: 180
  },
  {
    id: 'uv70-non-glare',
    name: 'UV70 Non-Glare',
    category: 'uv70',
    surface: 'mat',
    pricePerSqm: 200
  },
  
  // Mineral
  {
    id: 'mineral-standard',
    name: 'Standart Mineral Cam',
    category: 'mineral',
    surface: 'parlak',
    pricePerSqm: 45
  },
  {
    id: 'mineral-non-glare',
    name: 'Mineral Cam Mat',
    category: 'mineral',
    surface: 'mat',
    pricePerSqm: 65
  },
  {
    id: 'mineral-antirefle',
    name: 'Mineral Cam Antirefle',
    category: 'mineral',
    surface: 'antirefle',
    pricePerSqm: 85
  },
  
  // Akrilik
  {
    id: 'akrilik-clear',
    name: 'Akrilik Şeffaf',
    category: 'akrilik',
    surface: 'parlak',
    pricePerSqm: 120
  },
  {
    id: 'akrilik-non-glare',
    name: 'Akrilik Mat',
    category: 'akrilik',
    surface: 'mat',
    pricePerSqm: 140
  },
  {
    id: 'akrilik-uv-filter',
    name: 'Akrilik UV Filtreli',
    category: 'akrilik',
    surface: 'parlak',
    pricePerSqm: 160
  }
];

export function getGlassByCategory(category: GlassType['category']): GlassType[] {
  return GLASS_TYPES.filter(g => g.category === category);
}

export function getGlassById(id: string): GlassType | undefined {
  return GLASS_TYPES.find(g => g.id === id);
}

// Category descriptions for UI
export const GLASS_CATEGORY_INFO: Record<GlassType['category'], { name: string; description: string }> = {
  'truvue-muze': {
    name: 'TruVue Müze',
    description: 'Müze kalitesinde koruma, %99 UV filtreleme, maksimum netlik'
  },
  'uv70': {
    name: 'UV70',
    description: '%70 UV koruma, profesyonel kalite'
  },
  'mineral': {
    name: 'Mineral Cam',
    description: 'Ekonomik seçenek, standart koruma'
  },
  'akrilik': {
    name: 'Akrilik',
    description: 'Hafif, kırılmaya dayanıklı, büyük eserler için ideal'
  }
};
