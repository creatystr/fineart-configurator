import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { 
  ConfiguratorState, 
  EbatConfig, 
  PaperType, 
  BorderConfig,
  MountingType,
  PassepartoutConfig,
  FrameConfig,
  GlassConfig,
  UploadedImage,
  PriceBreakdown
} from '@/types/configurator';
import { calculateTotalPrice } from '@/lib/pricing/calculator';
import { validateStep } from '@/lib/validations';
import { checkStepDependencies } from '@/lib/rules/step-dependencies';

interface ConfiguratorActions {
  // Navigation
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Image
  setImage: (image: UploadedImage) => void;
  clearImage: () => void;
  
  // Step setters
  setEbat: (ebat: Partial<EbatConfig>) => void;
  setKagit: (kagit: PaperType | null) => void;
  setKenarlik: (kenarlik: Partial<BorderConfig>) => void;
  setFotoblok: (fotoblok: MountingType | null) => void;
  setPaspartu: (paspartu: Partial<PassepartoutConfig>) => void;
  setCerceve: (cerceve: FrameConfig | null) => void;
  setCam: (cam: GlassConfig) => void;
  
  // Utilities
  reset: () => void;
  recalculatePrice: () => void;
  validateCurrentStep: () => boolean;
}

const initialState: ConfiguratorState = {
  currentStep: 0,
  image: null,
  ebat: {
    width: 50,
    height: 70,
    hasFireWarning: false
  },
  kagit: null,
  kenarlik: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    isLocked: false
  },
  fotoblok: null,
  paspartu: {
    enabled: false,
    width: 0,
    color: '#FFFFFF',
    pricePerMeter: 0
  },
  cerceve: null,
  cam: {
    type: null
  },
  priceBreakdown: {
    base: 0,
    paper: 0,
    mounting: 0,
    passepartout: 0,
    frame: 0,
    glass: 0,
    total: 0
  },
  stepErrors: {},
  canProceed: false
};

export const useConfiguratorStore = create<ConfiguratorState & ConfiguratorActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setStep: (step) => {
        const state = get();
        const canNavigate = checkStepDependencies(step, state);
        if (canNavigate) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const state = get();
        if (state.currentStep < 7 && state.canProceed) {
          set({ currentStep: state.currentStep + 1 });
        }
      },

      prevStep: () => {
        const state = get();
        if (state.currentStep > 0) {
          set({ currentStep: state.currentStep - 1 });
        }
      },

      setImage: (image) => set({ image }),

      clearImage: () => set({ image: null }),

      setEbat: (ebat) => {
        const current = get().ebat;
        const updated = { ...current, ...ebat };
        
        // Calculate fire warning based on aspect ratio
        const aspectRatio = updated.width / updated.height;
        updated.hasFireWarning = aspectRatio < 0.5 || aspectRatio > 2;
        
        set({ ebat: updated });
        get().recalculatePrice();
      },

      setKagit: (kagit) => {
        set({ kagit });
        get().recalculatePrice();
      },

      setKenarlik: (kenarlik) => {
        const state = get();
        // Block if passepartout is active
        if (state.paspartu.enabled) {
          return;
        }
        set({ kenarlik: { ...state.kenarlik, ...kenarlik } });
        get().recalculatePrice();
      },

      setFotoblok: (fotoblok) => {
        set({ fotoblok });
        // Clear frame if fotoblok is removed
        if (!fotoblok) {
          set({ cerceve: null, cam: { type: null } });
        }
        get().recalculatePrice();
      },

      setPaspartu: (paspartu) => {
        const state = get();
        const updated = { ...state.paspartu, ...paspartu };
        
        // Lock border when passepartout is enabled
        if (updated.enabled && !state.paspartu.enabled) {
          set({
            kenarlik: { ...state.kenarlik, isLocked: true }
          });
        } else if (!updated.enabled && state.paspartu.enabled) {
          set({
            kenarlik: { ...state.kenarlik, isLocked: false }
          });
        }
        
        set({ paspartu: updated });
        get().recalculatePrice();
      },

      setCerceve: (cerceve) => {
        const state = get();
        // Require fotoblok first
        if (!state.fotoblok && cerceve) {
          console.warn('Fotoblok seçmeden çerçeve seçilemez');
          return;
        }
        set({ cerceve });
        // Clear glass if frame is removed
        if (!cerceve) {
          set({ cam: { type: null } });
        }
        get().recalculatePrice();
      },

      setCam: (cam) => {
        const state = get();
        // Require frame first
        if (!state.cerceve && cam.type) {
          console.warn('Çerçeve seçmeden cam seçilemez');
          return;
        }
        set({ cam });
        get().recalculatePrice();
      },

      reset: () => set(initialState),

      recalculatePrice: () => {
        const state = get();
        const priceBreakdown = calculateTotalPrice(state);
        set({ priceBreakdown });
      },

      validateCurrentStep: () => {
        const state = get();
        const result = validateStep(state.currentStep, state);
        set({ 
          stepErrors: { ...state.stepErrors, [state.currentStep]: result.errors },
          canProceed: result.isValid
        });
        return result.isValid;
      }
    }),
    { name: 'configurator-store' }
  )
);
