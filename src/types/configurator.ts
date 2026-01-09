// Configurator State Types

export interface UploadedImage {
  id: string;
  url: string;
  originalWidth: number;
  originalHeight: number;
  aspectRatio: number;
  thumbnail: string;
}

export interface EbatConfig {
  width: number;  // cm
  height: number; // cm
  hasFireWarning: boolean;
}

export interface PaperType {
  id: string;
  name: string;
  category: 'naturel-mat' | 'dokulu-mat' | 'puruzsuz-mat' | 'parlak';
  gramaj: number;
  content: string; // pamuk, selüloz, etc.
  color: string;
  pricePerSqm: number;
}

export interface BorderConfig {
  top: number;
  bottom: number;
  left: number;
  right: number;
  isLocked: boolean; // true when passepartout is active
}

export interface MountingType {
  id: string;
  name: string;
  category: 'standart' | 'arsiv' | 'muze' | 'sentetik' | 'aluminyum';
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  pricePerSqm: number;
}

export interface PassepartoutConfig {
  enabled: boolean;
  width: number;
  color: string;
  pricePerMeter: number;
}

export interface FrameProfile {
  id: string;
  name: string;
  material: 'ahsap' | 'plastik';
  width: number; // mm
  colors: string[];
  pricePerMeter: number;
}

export interface FrameConfig {
  profile: FrameProfile;
  selectedColor: string;
}

export interface GlassType {
  id: string;
  name: string;
  category: 'truvue-muze' | 'uv70' | 'mineral' | 'akrilik';
  surface: 'parlak' | 'mat' | 'antirefle';
  pricePerSqm: number;
}

export interface GlassConfig {
  type: GlassType | null; // null means "Cam istemiyorum"
}

export interface PriceBreakdown {
  base: number;
  paper: number;
  mounting: number;
  passepartout: number;
  frame: number;
  glass: number;
  total: number;
}

export interface ConfiguratorState {
  // Current step (0-7)
  currentStep: number;
  
  // Uploaded image
  image: UploadedImage | null;
  
  // Step configurations
  ebat: EbatConfig;
  kagit: PaperType | null;
  kenarlik: BorderConfig;
  fotoblok: MountingType | null;
  paspartu: PassepartoutConfig;
  cerceve: FrameConfig | null;
  cam: GlassConfig;
  
  // Calculated values
  priceBreakdown: PriceBreakdown;
  
  // Validation state
  stepErrors: Record<number, string[]>;
  canProceed: boolean;
}

export type ConfiguratorStep = 
  | 'ebat'
  | 'kagit'
  | 'kenarlik'
  | 'fotoblok'
  | 'paspartu'
  | 'cerceve'
  | 'cam'
  | 'toplam';

export const STEP_ORDER: ConfiguratorStep[] = [
  'ebat',
  'kagit',
  'kenarlik',
  'fotoblok',
  'paspartu',
  'cerceve',
  'cam',
  'toplam'
];

export const STEP_LABELS: Record<ConfiguratorStep, string> = {
  ebat: 'EBAT',
  kagit: 'KAĞIT',
  kenarlik: 'KENARLIK',
  fotoblok: 'FOTOBLOK',
  paspartu: 'PASPARTU',
  cerceve: 'ÇERÇEVE',
  cam: 'CAM',
  toplam: 'TOPLAM'
};
