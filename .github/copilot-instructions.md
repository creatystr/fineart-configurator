# FineArt Configurator - AI Coding Instructions

## Project Overview
Multi-step print configurator for FineArt/Giclee printing. Users configure print options through sequential steps with live preview and price updates.

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State**: Zustand for configurator state (`/src/store/configurator-store.ts`)
- **Styling**: Tailwind CSS + Framer Motion for animations
- **Validation**: Zod schemas in `/src/lib/validations/`

### Key Directories
```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── configurator/       # Step components (EbatStep, KagitStep, etc.)
│   ├── preview/            # Canvas preview & mockup rendering
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Header, Sidebar, Footer
├── store/                  # Zustand stores
├── lib/
│   ├── validations/        # Zod schemas for each step
│   ├── rules/              # Business rules & constraints
│   └── pricing/            # Price calculation logic
├── types/                  # TypeScript interfaces
└── data/                   # Static data (papers, frames, glass types)
```

## Configurator Steps (Order Matters!)
1. **EBAT** - Size selection (width/height with fire warning)
2. **KAĞIT** - Paper type (Naturel mat, Dokulu mat, Pürüzsüz mat, Parlak)
3. **KENARLIK** - Border (4-directional numeric control)
4. **FOTOBLOK** - Mounting (Standart, Arşiv, Müze, Sentetik/Alüminyum)
5. **PASPARTU** - Passepartout (locks border values when active)
6. **ÇERÇEVE** - Frame (Wood/Plastic with color variants)
7. **CAM** - Glass (TruVue Müze, UV70, Mineral, Akrilik + surface options)
8. **TOPLAM** - Summary & cart

## Critical Business Rules

### Step Dependencies
```typescript
// Enforced in /src/lib/rules/step-dependencies.ts
- Frame selection REQUIRES Fotoblok first
- Passepartout DISABLES manual border editing
- Glass unavailable without Frame
- Size changes trigger recalculation cascade
```

### Validation Pattern
```typescript
// Always validate step completion before allowing next
const canProceed = validateStep(currentStep, configuratorState);
if (!canProceed.success) {
  showStepError(canProceed.errors);
  return;
}
```

### Price Calculation
```typescript
// /src/lib/pricing/calculator.ts
// Price updates on EVERY selection change
// Formula: base + paper + mounting + frame + glass + passepartout
const calculateTotal = (state: ConfiguratorState): PriceBreakdown => {
  // Each component has its own pricing function
};
```

## Component Patterns

### Step Component Template
```typescript
// Each step follows this pattern in /src/components/configurator/
export function StepName({ onNext, onBack }: StepProps) {
  const { stepData, setStepData } = useConfiguratorStore();
  
  // Validate on change
  // Update preview on change
  // Show inline errors
}
```

### Preview Canvas Updates
```typescript
// Preview must update reactively
// Use /src/components/preview/PreviewCanvas.tsx
// Dimensions, borders, frame colors render in real-time
```

## Data Files Location
- Paper types: `/src/data/papers.ts`
- Frame profiles: `/src/data/frames.ts`
- Glass options: `/src/data/glass.ts`
- Fotoblok types: `/src/data/mounting.ts`

## State Shape Reference
```typescript
// /src/types/configurator.ts
interface ConfiguratorState {
  currentStep: number;
  image: UploadedImage | null;
  ebat: { width: number; height: number; hasFireWarning: boolean };
  kagit: PaperType | null;
  kenarlik: { top: number; bottom: number; left: number; right: number };
  fotoblok: MountingType | null;
  paspartu: PassepartoutConfig | null;
  cerceve: FrameConfig | null;
  cam: GlassConfig | null;
  totalPrice: number;
}
```

## Testing
- Unit tests for pricing calculations
- Integration tests for step flow
- Run: `npm test` or `npm test:ui`

## Common Tasks

### Adding New Paper Type
1. Add to `/src/data/papers.ts`
2. Update Zod schema in `/src/lib/validations/kagit.ts`
3. Add pricing in `/src/lib/pricing/paper.ts`

### Modifying Business Rules
1. Update `/src/lib/rules/` files
2. Add corresponding validation in `/src/lib/validations/`
3. Test with edge cases

## UI/UX Notes
- Sticky bottom price bar always visible
- Step progress bar shows completion state
- Invalid combinations show inline warnings (not blocking modals)
- Fire warning appears conditionally based on size ratio
