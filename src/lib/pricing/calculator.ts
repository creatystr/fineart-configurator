import type { ConfiguratorState, PriceBreakdown } from '@/types/configurator';

/**
 * Main price calculation function
 * Called on every state change to update total price
 */
export function calculateTotalPrice(state: ConfiguratorState): PriceBreakdown {
  const { ebat, kagit, fotoblok, paspartu, cerceve, cam } = state;
  
  // Calculate area in square meters
  const areaSqm = (ebat.width * ebat.height) / 10000;
  
  // Base price (minimum order)
  const base = 50;
  
  // Paper price
  const paper = kagit ? areaSqm * kagit.pricePerSqm : 0;
  
  // Mounting price
  const mounting = fotoblok ? areaSqm * fotoblok.pricePerSqm : 0;
  
  // Passepartout price (calculated by perimeter)
  const passepartoutPerimeter = paspartu.enabled
    ? 2 * (ebat.width + ebat.height + 4 * paspartu.width) / 100
    : 0;
  const passepartout = passepartoutPerimeter * paspartu.pricePerMeter;
  
  // Frame price (calculated by perimeter including passepartout)
  const framePerimeter = cerceve
    ? 2 * (ebat.width + ebat.height + (paspartu.enabled ? 4 * paspartu.width : 0)) / 100
    : 0;
  const frame = cerceve ? framePerimeter * cerceve.profile.pricePerMeter : 0;
  
  // Glass price
  const glass = cam.type ? areaSqm * cam.type.pricePerSqm : 0;
  
  // Total
  const total = base + paper + mounting + passepartout + frame + glass;
  
  return {
    base,
    paper: Math.round(paper * 100) / 100,
    mounting: Math.round(mounting * 100) / 100,
    passepartout: Math.round(passepartout * 100) / 100,
    frame: Math.round(frame * 100) / 100,
    glass: Math.round(glass * 100) / 100,
    total: Math.round(total * 100) / 100
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency: string = '₺'): string {
  return `${amount.toFixed(2)} ${currency}`;
}
