import type { PaperType } from '@/types/configurator';

export const PAPER_TYPES: PaperType[] = [
  // Naturel Mat
  {
    id: 'hahnemuhle-photo-rag',
    name: 'Hahnemühle Photo Rag',
    category: 'naturel-mat',
    gramaj: 308,
    content: '100% Pamuk',
    color: 'Doğal Beyaz',
    pricePerSqm: 85
  },
  {
    id: 'hahnemuhle-german-etching',
    name: 'Hahnemühle German Etching',
    category: 'naturel-mat',
    gramaj: 310,
    content: '100% Pamuk',
    color: 'Doğal Beyaz',
    pricePerSqm: 90
  },
  
  // Dokulu Mat
  {
    id: 'hahnemuhle-torchon',
    name: 'Hahnemühle Torchon',
    category: 'dokulu-mat',
    gramaj: 285,
    content: '100% Pamuk',
    color: 'Beyaz',
    pricePerSqm: 75
  },
  {
    id: 'hahnemuhle-william-turner',
    name: 'Hahnemühle William Turner',
    category: 'dokulu-mat',
    gramaj: 310,
    content: '100% Pamuk',
    color: 'Krem',
    pricePerSqm: 95
  },
  
  // Pürüzsüz Mat
  {
    id: 'hahnemuhle-photo-rag-ultra-smooth',
    name: 'Hahnemühle Photo Rag Ultra Smooth',
    category: 'puruzsuz-mat',
    gramaj: 305,
    content: '100% Pamuk',
    color: 'Beyaz',
    pricePerSqm: 100
  },
  {
    id: 'hahnemuhle-fine-art-pearl',
    name: 'Hahnemühle Fine Art Pearl',
    category: 'puruzsuz-mat',
    gramaj: 285,
    content: '100% Pamuk',
    color: 'Beyaz',
    pricePerSqm: 80
  },
  
  // Parlak
  {
    id: 'hahnemuhle-photo-rag-baryta',
    name: 'Hahnemühle Photo Rag Baryta',
    category: 'parlak',
    gramaj: 315,
    content: '100% Pamuk',
    color: 'Beyaz',
    pricePerSqm: 110
  },
  {
    id: 'hahnemuhle-photo-gloss',
    name: 'Hahnemühle Photo Gloss',
    category: 'parlak',
    gramaj: 290,
    content: 'Selüloz',
    color: 'Parlak Beyaz',
    pricePerSqm: 65
  }
];

export function getPapersByCategory(category: PaperType['category']): PaperType[] {
  return PAPER_TYPES.filter(paper => paper.category === category);
}

export function getPaperById(id: string): PaperType | undefined {
  return PAPER_TYPES.find(paper => paper.id === id);
}
