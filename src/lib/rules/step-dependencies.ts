import type { ConfiguratorState } from '@/types/configurator';

/**
 * Step dependency rules
 * Defines which steps require previous selections
 */
const STEP_DEPENDENCIES: Record<number, (state: ConfiguratorState) => { canProceed: boolean; reason?: string }> = {
  0: () => ({ canProceed: true }), // Ebat - always available
  1: () => ({ canProceed: true }), // Kağıt - always available
  2: () => ({ canProceed: true }), // Kenarlık - always available
  3: () => ({ canProceed: true }), // Fotoblok - always available
  4: () => ({ canProceed: true }), // Paspartu - always available
  5: (state) => {
    // Çerçeve requires Fotoblok
    if (!state.fotoblok) {
      return { canProceed: false, reason: 'Çerçeve seçimi için önce fotoblok seçmelisiniz' };
    }
    return { canProceed: true };
  },
  6: (state) => {
    // Cam requires Çerçeve
    if (!state.cerceve) {
      return { canProceed: false, reason: 'Cam seçimi için önce çerçeve seçmelisiniz' };
    }
    return { canProceed: true };
  },
  7: () => ({ canProceed: true }) // Toplam - always available
};

/**
 * Check if user can navigate to a specific step
 */
export function checkStepDependencies(
  targetStep: number,
  state: ConfiguratorState
): boolean {
  const check = STEP_DEPENDENCIES[targetStep];
  if (!check) return false;
  
  const result = check(state);
  
  if (!result.canProceed && result.reason) {
    console.warn(result.reason);
  }
  
  return result.canProceed;
}

/**
 * Size constraints for mounting options
 */
export function checkMountingSizeConstraints(
  width: number,
  height: number,
  mountingId: string
): { isValid: boolean; message?: string } {
  // Size limits per mounting type
  const MOUNTING_LIMITS: Record<string, { maxWidth: number; maxHeight: number }> = {
    'standart': { maxWidth: 120, maxHeight: 180 },
    'arsiv': { maxWidth: 100, maxHeight: 150 },
    'muze': { maxWidth: 150, maxHeight: 200 },
    'sentetik': { maxWidth: 200, maxHeight: 300 },
    'aluminyum': { maxWidth: 250, maxHeight: 350 }
  };
  
  const limits = MOUNTING_LIMITS[mountingId];
  if (!limits) {
    return { isValid: true };
  }
  
  if (width > limits.maxWidth || height > limits.maxHeight) {
    return {
      isValid: false,
      message: `Bu fotoblok tipi maksimum ${limits.maxWidth}x${limits.maxHeight} cm boyutlarını destekler`
    };
  }
  
  return { isValid: true };
}

/**
 * Check if passepartout is compatible with current selections
 */
export function checkPassepartoutCompatibility(
  state: ConfiguratorState
): { isValid: boolean; message?: string } {
  // Passepartout requires minimum border space
  const { ebat, kenarlik } = state;
  const totalWidth = ebat.width + kenarlik.left + kenarlik.right;
  const totalHeight = ebat.height + kenarlik.top + kenarlik.bottom;
  
  // Minimum passepartout width is 3cm
  if (totalWidth < 20 || totalHeight < 20) {
    return {
      isValid: false,
      message: 'Paspartu için minimum 20x20 cm alan gereklidir'
    };
  }
  
  return { isValid: true };
}
