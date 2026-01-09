import type { MountingType } from '@/types/configurator';

export const MOUNTING_TYPES: MountingType[] = [
  // Standart
  {
    id: 'fotoblok-standart-3mm',
    name: 'Fotoblok Standart 3mm',
    category: 'standart',
    minWidth: 10,
    maxWidth: 120,
    minHeight: 10,
    maxHeight: 180,
    pricePerSqm: 25
  },
  {
    id: 'fotoblok-standart-5mm',
    name: 'Fotoblok Standart 5mm',
    category: 'standart',
    minWidth: 10,
    maxWidth: 120,
    minHeight: 10,
    maxHeight: 180,
    pricePerSqm: 35
  },
  
  // Arşiv
  {
    id: 'fotoblok-arsiv-acid-free',
    name: 'Fotoblok Arşiv (Acid-Free)',
    category: 'arsiv',
    minWidth: 10,
    maxWidth: 100,
    minHeight: 10,
    maxHeight: 150,
    pricePerSqm: 55
  },
  
  // Müze
  {
    id: 'fotoblok-muze-ragboard',
    name: 'Fotoblok Müze Ragboard',
    category: 'muze',
    minWidth: 10,
    maxWidth: 150,
    minHeight: 10,
    maxHeight: 200,
    pricePerSqm: 85
  },
  {
    id: 'fotoblok-muze-conservation',
    name: 'Fotoblok Müze Conservation',
    category: 'muze',
    minWidth: 10,
    maxWidth: 150,
    minHeight: 10,
    maxHeight: 200,
    pricePerSqm: 95
  },
  
  // Sentetik
  {
    id: 'fotoblok-forex',
    name: 'Forex PVC',
    category: 'sentetik',
    minWidth: 10,
    maxWidth: 200,
    minHeight: 10,
    maxHeight: 300,
    pricePerSqm: 45
  },
  {
    id: 'fotoblok-kapa',
    name: 'Kapa Mount',
    category: 'sentetik',
    minWidth: 10,
    maxWidth: 200,
    minHeight: 10,
    maxHeight: 300,
    pricePerSqm: 40
  },
  
  // Alüminyum
  {
    id: 'dibond-3mm',
    name: 'Dibond 3mm',
    category: 'aluminyum',
    minWidth: 10,
    maxWidth: 250,
    minHeight: 10,
    maxHeight: 350,
    pricePerSqm: 120
  },
  {
    id: 'dibond-brushed',
    name: 'Dibond Fırçalı Alüminyum',
    category: 'aluminyum',
    minWidth: 10,
    maxWidth: 250,
    minHeight: 10,
    maxHeight: 350,
    pricePerSqm: 150
  }
];

export function getMountingByCategory(category: MountingType['category']): MountingType[] {
  return MOUNTING_TYPES.filter(m => m.category === category);
}

export function getMountingById(id: string): MountingType | undefined {
  return MOUNTING_TYPES.find(m => m.id === id);
}

export function checkMountingFits(
  mounting: MountingType,
  width: number,
  height: number
): boolean {
  return (
    width >= mounting.minWidth &&
    width <= mounting.maxWidth &&
    height >= mounting.minHeight &&
    height <= mounting.maxHeight
  );
}
