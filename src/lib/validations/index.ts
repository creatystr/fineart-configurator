import { z } from 'zod';
import type { ConfiguratorState } from '@/types/configurator';

// Ebat validation schema
export const ebatSchema = z.object({
  width: z.number().min(10, 'Minimum genişlik 10 cm').max(300, 'Maksimum genişlik 300 cm'),
  height: z.number().min(10, 'Minimum yükseklik 10 cm').max(400, 'Maksimum yükseklik 400 cm'),
  hasFireWarning: z.boolean()
});

// Kağıt validation schema
export const kagitSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['naturel-mat', 'dokulu-mat', 'puruzsuz-mat', 'parlak']),
  gramaj: z.number(),
  content: z.string(),
  color: z.string(),
  pricePerSqm: z.number()
}).nullable();

// Kenarlık validation schema
export const kenarlikSchema = z.object({
  top: z.number().min(0).max(50),
  bottom: z.number().min(0).max(50),
  left: z.number().min(0).max(50),
  right: z.number().min(0).max(50),
  isLocked: z.boolean()
});

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate a specific step
 */
export function validateStep(step: number, state: ConfiguratorState): ValidationResult {
  const errors: string[] = [];
  
  switch (step) {
    case 0: // Ebat
      const ebatResult = ebatSchema.safeParse(state.ebat);
      if (!ebatResult.success) {
        errors.push(...ebatResult.error.errors.map(e => e.message));
      }
      break;
      
    case 1: // Kağıt
      if (!state.kagit) {
        errors.push('Lütfen bir kağıt türü seçin');
      }
      break;
      
    case 2: // Kenarlık
      const kenarlikResult = kenarlikSchema.safeParse(state.kenarlik);
      if (!kenarlikResult.success) {
        errors.push(...kenarlikResult.error.errors.map(e => e.message));
      }
      break;
      
    case 3: // Fotoblok
      // Optional step, no validation required
      break;
      
    case 4: // Paspartu
      // Optional step, no validation required
      break;
      
    case 5: // Çerçeve
      if (!state.fotoblok && state.cerceve) {
        errors.push('Çerçeve seçimi için önce fotoblok seçmelisiniz');
      }
      break;
      
    case 6: // Cam
      if (!state.cerceve && state.cam.type) {
        errors.push('Cam seçimi için önce çerçeve seçmelisiniz');
      }
      break;
      
    case 7: // Toplam
      if (!state.kagit) {
        errors.push('Sepete eklemek için kağıt seçimi zorunludur');
      }
      break;
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
