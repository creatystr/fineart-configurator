# FineArt Configurator - AI Coding Instructions

## Project Overview
Multi-step print configurator for FineArt/Giclee printing. Users configure print options through sequential steps with live preview and price updates.

**Live Server:** http://68.183.215.70:3000/
**Figma Design:** https://www.figma.com/make/L0Cb8Tc1srUv36KJ7jUg1U/Product-Configurator-Design

## ⚠️ IMPORTANT: No Local Testing
- **This is a PRODUCTION SERVER** - no localhost, no local testing
- All development and testing happens directly on the server
- Always use the public IP (68.183.215.70) for testing
- Never use `localhost` or `127.0.0.1`

## Architecture

### Tech Stack
- **Framework**: Vite + React 18 (SPA)
- **UI Library**: Radix UI + shadcn/ui components
- **Styling**: Tailwind CSS v4 + CSS variables
- **State**: React useState (local component state)
- **Icons**: Lucide React
- **Animations**: Framer Motion

### Project Structure
```
.github/tema/                    # Main application (Figma export)
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main configurator logic & state
│   │   └── components/
│   │       ├── Header.tsx       # Top navigation bar
│   │       ├── PreviewCanvas.tsx # Live mockup preview
│   │       ├── StepperBar.tsx   # Step navigation
│   │       ├── PriceBar.tsx     # Bottom price summary
│   │       ├── Sidebar.tsx      # Image upload & print type
│   │       ├── steps/           # Step components
│   │       │   ├── SizeStep.tsx
│   │       │   ├── PaperStep.tsx
│   │       │   ├── BorderStep.tsx
│   │       │   ├── FotoblokStep.tsx
│   │       │   ├── PassepartoutStep.tsx
│   │       │   ├── FrameStep.tsx
│   │       │   └── GlassStep.tsx
│   │       ├── ui/              # shadcn/ui components
│   │       └── figma/           # Figma-generated components
│   └── styles/
│       ├── index.css            # Main styles entry
│       ├── tailwind.css         # Tailwind directives
│       ├── theme.css            # CSS variables & theme
│       └── fonts.css            # Font definitions
└── docs/design/                 # Design assets
```

## Configurator Steps (Order Matters!)
1. **EBAT SEÇİMİ** - Size selection (width/height inputs, slider)
2. **KAĞIT SEÇİMİ** - Paper type cards with gramaj, content info
3. **KENARLIK AYARI** - 4-directional border control (top, bottom, left, right)
4. **FOTOBLOK SEÇİMİ** - Mounting options (Standart, Arşiv, Müze, Dibond, Forex)
5. **PASPARTU SEÇİMİ** - Passepartout with brand options (Eko, Britannia, Crescent, Hahnemühle)
6. **ÇERÇEVE SEÇİMİ** - Frame profiles (Wood/Plastic) with color swatches
7. **CAM SEÇİMİ** - Glass options (TruVue, UV70, Mineral, Akrilik)
8. **SİPARİŞ ÖZETİ** - Summary & add to cart

## Price Calculation (in App.tsx)

```typescript
// Price maps defined at top of App.tsx
const PAPER_PRICES: Record<string, number> = { "photo-rag-308": 45, ... };
const FOTOBLOK_PRICES: Record<string, number> = { "std-3mm": 25, ... };
const PASSEPARTOUT_PRICES: Record<string, number> = { "eko-white": 20, ... };
const FRAME_PRICES: Record<string, number> = { "wood-natural-2044": 100, ... };
const GLASS_PRICES: Record<string, number> = { "truvue-museum": 150, ... };

// Total calculation formula
total = basePrintPrice + (paperPrice * areaM²) + fotoblokPrice + passepartoutPrice + framePrice + glassPrice
```

## State Management (in App.tsx)

```typescript
interface ConfigState {
  uploadedImage: string | null;
  printType: string;                    // "fineart" | "giclee"
  size: { width: number; height: number };
  paper: string | null;                 // Paper ID
  border: { top: number; bottom: number; left: number; right: number };
  fotoblok: string | null;              // Fotoblok ID
  passepartout: string | null;          // Passepartout ID
  frame: string | null;                 // Frame ID
  glass: string | null;                 // Glass ID
}
```

## UI Components (shadcn/ui based)

Located in `src/app/components/ui/`:
- `button.tsx` - Primary/secondary/ghost variants
- `card.tsx` - Selection cards for options
- `input.tsx` - Numeric inputs for size/border
- `slider.tsx` - Size adjustment slider
- `select.tsx` - Dropdown selections
- `tabs.tsx` - Category tabs in steps
- `dialog.tsx` - Modal dialogs
- `toast` - Notifications via Sonner

## Development Commands

```bash
# Start dev server (accessible via IP)
cd .github/tema && npm run dev

# Build for production
cd .github/tema && npm run build
```

## Key Files to Modify

| Task | File |
|------|------|
| Add new paper | `App.tsx` → `PAPER_PRICES` + `PaperStep.tsx` |
| Add new frame | `App.tsx` → `FRAME_PRICES` + `FrameStep.tsx` |
| Change pricing logic | `App.tsx` → `calculateTotalPrice()` |
| Modify step flow | `App.tsx` → `handleNext()` / `handlePrevious()` |
| Update preview | `PreviewCanvas.tsx` |
| Change UI theme | `src/styles/theme.css` |

## Naming Conventions

- **IDs**: kebab-case (e.g., `photo-rag-308`, `wood-natural-2044`)
- **Components**: PascalCase (e.g., `SizeStep`, `PaperStep`)
- **CSS Variables**: `--{category}-{property}` (e.g., `--primary-foreground`)

## UI/UX Notes
- Sticky bottom price bar always visible
- Step progress bar shows completion state
- Toast notifications for user feedback (Sonner)
- Responsive design with mobile support
