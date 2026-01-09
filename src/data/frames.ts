import type { FrameProfile } from '@/types/configurator';

export const FRAME_PROFILES: FrameProfile[] = [
  // Ahşap Profiller
  {
    id: 'ahsap-classic-20',
    name: 'Klasik Ahşap 20mm',
    material: 'ahsap',
    width: 20,
    colors: ['#2C1810', '#4A3728', '#8B7355', '#D4C4B0', '#FFFFFF', '#000000'],
    pricePerMeter: 35
  },
  {
    id: 'ahsap-classic-30',
    name: 'Klasik Ahşap 30mm',
    material: 'ahsap',
    width: 30,
    colors: ['#2C1810', '#4A3728', '#8B7355', '#D4C4B0', '#FFFFFF', '#000000'],
    pricePerMeter: 45
  },
  {
    id: 'ahsap-modern-25',
    name: 'Modern Ahşap 25mm',
    material: 'ahsap',
    width: 25,
    colors: ['#1A1A1A', '#FFFFFF', '#8B7355', '#C0C0C0'],
    pricePerMeter: 55
  },
  {
    id: 'ahsap-float-40',
    name: 'Float Frame Ahşap 40mm',
    material: 'ahsap',
    width: 40,
    colors: ['#2C1810', '#000000', '#FFFFFF', '#D4AF37'],
    pricePerMeter: 75
  },
  {
    id: 'ahsap-ornate-50',
    name: 'Süslemeli Ahşap 50mm',
    material: 'ahsap',
    width: 50,
    colors: ['#D4AF37', '#C0C0C0', '#2C1810', '#000000'],
    pricePerMeter: 95
  },
  
  // Plastik Profiller
  {
    id: 'plastik-slim-15',
    name: 'İnce Plastik 15mm',
    material: 'plastik',
    width: 15,
    colors: ['#000000', '#FFFFFF', '#C0C0C0', '#2C1810'],
    pricePerMeter: 15
  },
  {
    id: 'plastik-standard-20',
    name: 'Standart Plastik 20mm',
    material: 'plastik',
    width: 20,
    colors: ['#000000', '#FFFFFF', '#C0C0C0', '#D4AF37', '#2C1810'],
    pricePerMeter: 20
  },
  {
    id: 'plastik-wide-30',
    name: 'Geniş Plastik 30mm',
    material: 'plastik',
    width: 30,
    colors: ['#000000', '#FFFFFF', '#C0C0C0'],
    pricePerMeter: 28
  }
];

export function getFramesByMaterial(material: FrameProfile['material']): FrameProfile[] {
  return FRAME_PROFILES.filter(f => f.material === material);
}

export function getFrameById(id: string): FrameProfile | undefined {
  return FRAME_PROFILES.find(f => f.id === id);
}

// Color name mapping for display
export const COLOR_NAMES: Record<string, string> = {
  '#2C1810': 'Koyu Ceviz',
  '#4A3728': 'Orta Ceviz',
  '#8B7355': 'Açık Meşe',
  '#D4C4B0': 'Doğal Ahşap',
  '#FFFFFF': 'Beyaz',
  '#000000': 'Siyah',
  '#1A1A1A': 'Antrasit',
  '#C0C0C0': 'Gümüş',
  '#D4AF37': 'Altın'
};
