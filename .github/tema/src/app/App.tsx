import { useState } from "react";
import { Header } from "./components/Header";
import { PreviewCanvas } from "./components/PreviewCanvas";
import { StepperBar } from "./components/StepperBar";
import { PriceBar } from "./components/PriceBar";
import { SizeStep } from "./components/steps/SizeStep";
import { PaperStep } from "./components/steps/PaperStep";
import { BorderStep } from "./components/steps/BorderStep";
import { FotoblokStep } from "./components/steps/FotoblokStep";
import { PassepartoutStep } from "./components/steps/PassepartoutStep";
import { FrameStep } from "./components/steps/FrameStep";
import { GlassStep } from "./components/steps/GlassStep";
import { toast, Toaster } from "sonner";
import { Button } from "./components/ui/button";

// Types
interface ConfigState {
  uploadedImage: string | null;
  printType: string;
  size: { width: number; height: number };
  paper: string | null;
  border: { top: number; bottom: number; left: number; right: number };
  fotoblok: string | null;
  passepartout: string | null;
  frame: string | null;
  glass: string | null;
}

// Price calculation data
const PAPER_PRICES: Record<string, number> = {
  "photo-rag-308": 45,
  "william-turner-190": 35,
  "museum-etching-350": 50,
  "torchon-285": 42,
  "canvas-340": 48,
  "photo-rag-baryta-315": 55,
  "german-etching-310": 52,
  "photo-rag-ultra-smooth-305": 60,
  "fine-art-pearl-285": 40,
};

const FOTOBLOK_PRICES: Record<string, number> = {
  "std-3mm": 25,
  "std-5mm": 35,
  "archive-5mm": 50,
  "archive-8mm": 65,
  "museum-5mm": 80,
  "museum-10mm": 120,
  "dibond-3mm": 55,
  "forex-5mm": 40,
};

const PASSEPARTOUT_PRICES: Record<string, number> = {
  "eko-white": 20,
  "eko-gray": 20,
  "eko-ivory": 20,
  "eko-black": 20,
  "brit-white": 25,
  "brit-gray": 25,
  "brit-ivory": 25,
  "brit-black": 25,
  "cres-white": 30,
  "cres-gray": 30,
  "cres-cream": 30,
  "cres-ivory": 30,
  "hahn-white": 50,
  "hahn-gray": 50,
  "hahn-cream": 50,
  "hahn-ivory": 50,
};

const FRAME_PRICES: Record<string, number> = {
  "wood-natural-2044": 100,
  "wood-white-2044": 100,
  "wood-walnut-2044": 100,
  "wood-black-2044": 100,
  "wood-natural-2030": 80,
  "wood-white-2030": 80,
  "wood-walnut-2030": 80,
  "wood-black-2030": 80,
  "plastic-natural-2033": 60,
  "plastic-white-2033": 60,
  "plastic-walnut-2033": 60,
  "plastic-black-2033": 60,
};

const GLASS_PRICES: Record<string, number> = {
  "truvue-museum": 150,
  "uv70-clear": 60,
  "uv70-matte": 65,
  "uv70-antirefle": 80,
  "mineral-clear": 30,
  "mineral-2mm": 35,
  "acrylic-clear": 40,
  "acrylic-matte": 45,
  "acrylic-antirefle": 55,
};

// Glass name mapping
const GLASS_NAMES: Record<string, string> = {
  "truvue-museum": "TruVue Müze Sınıfı 2mm",
  "uv70-clear": "TruVue UV70 Parlak 2mm",
  "uv70-matte": "TruVue UV70 Mat 2mm",
  "uv70-antirefle": "LUXAR Antirefle",
  "mineral-clear": "Yerli Mineral 1.5 mm",
  "mineral-2mm": "Yerli Mineral 2 mm",
  "acrylic-clear": "3A Peti6 Akrilik",
  "acrylic-matte": "Akrilik Mat",
  "acrylic-antirefle": "Pleksidas / Akrilik Antirefle",
};

// Frame name mapping
const FRAME_NAMES: Record<string, string> = {
  "wood-natural-2044": "20x44 mm. Ahşap Profil | 3401 Natural",
  "wood-white-2044": "20x44 mm. Ahşap Profil | 3401 Beyaz",
  "wood-walnut-2044": "20x44 mm. Ahşap Profil | 3401 Kahve",
  "wood-black-2044": "20x44 mm. Ahşap Profil | 3401 Siyah",
  "wood-natural-2030": "20x30 mm. Ahşap Profil | 2514 Natural",
  "wood-white-2030": "20x30 mm. Ahşap Profil | 2514 Beyaz",
  "wood-walnut-2030": "20x30 mm. Ahşap Profil | 2514 Kahve",
  "wood-black-2030": "20x30 mm. Ahşap Profil | 2514 Siyah",
  "plastic-natural-2033": "20x33 mm. Plastik Profil | 2235 Natural",
  "plastic-white-2033": "20x33 mm. Plastik Profil | 2235 Beyaz",
  "plastic-walnut-2033": "20x33 mm. Plastik Profil | 2235 Kahve",
  "plastic-black-2033": "20x33 mm. Plastik Profil | 2235 Siyah",
};

// Passepartout name mapping
const PASSEPARTOUT_NAMES: Record<string, string> = {
  "eko-white": "Eko Beyaz",
  "eko-gray": "Eko Gri-B",
  "eko-ivory": "Eko Ivory",
  "eko-black": "Eko Siyah",
  "brit-white": "Britannia Beyaz",
  "brit-gray": "Britannia Gri-B",
  "brit-ivory": "Britannia Ivory",
  "brit-black": "Britannia Siyah",
  "cres-white": "Crescent Antik Beyaz",
  "cres-gray": "Crescent Antik Gri",
  "cres-cream": "Crescent Bej / Beyaz",
  "cres-ivory": "Crescent Antik",
  "hahn-white": "Hahnemühle 14 mm Beyaz",
  "hahn-gray": "Hahnemühle 14 mm Gri",
  "hahn-cream": "Hahnemühle Bej / Beyaz",
  "hahn-ivory": "Hahnemühle Ivory",
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<ConfigState>({
    uploadedImage: null,
    printType: "fineart",
    size: { width: 50, height: 70 },
    paper: null,
    border: { top: 2, bottom: 2, left: 2, right: 2 },
    fotoblok: null,
    passepartout: null,
    frame: null,
    glass: null,
  });

  // Step names
  const STEP_NAMES = [
    "EBAT SEÇİMİ",
    "KAĞIT SEÇİMİ",
    "KENARLIK AYARI",
    "FOTOBLOK SEÇİMİ",
    "PASPARTU SEÇİMİ",
    "ÇERÇEVE SEÇİMİ",
    "CAM SEÇİMİ",
    "SİPARİŞ ÖZETİ"
  ];

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate total price
  const calculateTotalPrice = (): number => {
    let total = 0;

    // Base price for print type
    total += config.printType === "fineart" ? 100 : 80;

    // Size-based calculation (area in m²)
    const areaInM2 = (config.size.width * config.size.height) / 10000;

    // Paper price
    if (config.paper && PAPER_PRICES[config.paper]) {
      total += PAPER_PRICES[config.paper] * areaInM2;
    }

    // Fotoblok price
    if (config.fotoblok && FOTOBLOK_PRICES[config.fotoblok]) {
      total += FOTOBLOK_PRICES[config.fotoblok];
    }

    // Passepartout price
    if (config.passepartout && PASSEPARTOUT_PRICES[config.passepartout]) {
      total += PASSEPARTOUT_PRICES[config.passepartout];
    }

    // Frame price
    if (config.frame && FRAME_PRICES[config.frame]) {
      total += FRAME_PRICES[config.frame];
    }

    // Glass price
    if (config.glass && GLASS_PRICES[config.glass]) {
      total += GLASS_PRICES[config.glass];
    }

    return total;
  };

  // Handlers
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setConfig({ ...config, uploadedImage: e.target?.result as string });
      toast.success("Görsel başarıyla yüklendi!");
    };
    reader.readAsDataURL(file);
  };

  const handlePrintTypeChange = (type: string) => {
    setConfig({ ...config, printType: type });
  };

  const handleSizeChange = (size: { width: number; height: number }) => {
    setConfig({ ...config, size });
  };

  const handlePaperChange = (paperId: string) => {
    setConfig({ ...config, paper: paperId });
  };

  const handleBorderChange = (border: { top: number; bottom: number; left: number; right: number }) => {
    setConfig({ ...config, border });
  };

  const handleFotoblokChange = (fotoblokId: string | null) => {
    setConfig({ ...config, fotoblok: fotoblokId });
    
    // If fotoblok is removed, also remove frame
    if (!fotoblokId) {
      setConfig(prev => ({ ...prev, fotoblok: null, frame: null }));
      toast.warning("Fotoblok kaldırıldığı için çerçeve seçimi de iptal edildi.");
    }
  };

  const handlePassepartoutChange = (passepartoutId: string | null) => {
    setConfig({ ...config, passepartout: passepartoutId });
    
    // Auto-adjust borders when passepartout is selected
    if (passepartoutId) {
      setConfig(prev => ({
        ...prev,
        passepartout: passepartoutId,
        border: { top: 5, bottom: 5, left: 5, right: 5 }
      }));
      toast.info("Paspartu seçildi, kenarlıklar otomatik ayarlandı.");
    }
  };

  const handleFrameChange = (frameId: string | null) => {
    setConfig({ ...config, frame: frameId });
  };

  const handleGlassChange = (glassId: string | null) => {
    setConfig({ ...config, glass: glassId });
  };

  const handleAddToCart = () => {
    if (!config.uploadedImage) {
      toast.error("Lütfen önce bir görsel yükleyin!");
      return;
    }
    if (!config.paper) {
      toast.error("Lütfen bir kağıt seçin!");
      return;
    }

    toast.success("Ürün sepete eklendi!", {
      description: `Toplam: ${calculateTotalPrice().toFixed(2)} ₺`,
    });
  };

  const handleClear = () => {
    setConfig({
      uploadedImage: null,
      printType: "fineart",
      size: { width: 50, height: 70 },
      paper: null,
      border: { top: 2, bottom: 2, left: 2, right: 2 },
      fotoblok: null,
      passepartout: null,
      frame: null,
      glass: null,
    });
    setCurrentStep(0);
    toast.info("Tüm seçimler temizlendi.");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <SizeStep 
            size={config.size} 
            onChange={handleSizeChange}
            // Pass upload and print type to all devices
            uploadedImage={config.uploadedImage}
            printType={config.printType}
            onImageUpload={handleImageUpload}
            onPrintTypeChange={handlePrintTypeChange}
          />
        );
      case 1:
        return <PaperStep selectedPaper={config.paper} onChange={handlePaperChange} />;
      case 2:
        return (
          <BorderStep
            border={config.border}
            hasPassepartout={!!config.passepartout}
            onChange={handleBorderChange}
          />
        );
      case 3:
        return (
          <FotoblokStep
            selectedFotoblok={config.fotoblok}
            size={config.size}
            onChange={handleFotoblokChange}
          />
        );
      case 4:
        return (
          <PassepartoutStep
            selectedPassepartout={config.passepartout}
            onChange={handlePassepartoutChange}
          />
        );
      case 5:
        return (
          <FrameStep
            selectedFrame={config.frame}
            hasFotoblok={!!config.fotoblok}
            onChange={handleFrameChange}
          />
        );
      case 6:
        return (
          <GlassStep
            selectedGlass={config.glass}
            size={config.size}
            onChange={handleGlassChange}
          />
        );
      case 7:
        return (
          <div className="p-4 space-y-4 bg-white h-full">
            <h2 className="text-xl font-bold text-gray-900 uppercase">Sipariş Özeti</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-700">Ebat</span>
                <span className="text-sm font-semibold">{config.size.width} x {config.size.height} cm</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-700">Baskı Türü</span>
                <span className="text-sm font-semibold uppercase">{config.printType}</span>
              </div>
              {config.paper && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-700">Kağıt</span>
                  <span className="text-sm font-semibold">Seçildi</span>
                </div>
              )}
              {config.fotoblok && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-700">Fotoblok</span>
                  <span className="text-sm font-semibold">Seçildi</span>
                </div>
              )}
              {config.passepartout && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-700">Paspartu</span>
                  <span className="text-sm font-semibold">Seçildi</span>
                </div>
              )}
              {config.frame && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-700">Çerçeve</span>
                  <span className="text-sm font-semibold">Seçildi</span>
                </div>
              )}
              {config.glass && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-sm text-gray-700">Cam</span>
                  <span className="text-sm font-semibold">Seçildi</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-black mt-4">
                <span className="text-lg font-bold text-gray-900">TOPLAM</span>
                <span className="text-2xl font-bold text-red-600">{calculateTotalPrice().toFixed(2)} ₺</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getPassepartoutData = () => {
    if (!config.passepartout) return null;
    
    const colors: Record<string, string> = {
      "eko-white": "#FFFFFF",
      "eko-gray": "#808080",
      "eko-ivory": "#FFFFF0",
      "eko-black": "#000000",
      "brit-white": "#FFFFFF",
      "brit-gray": "#808080",
      "brit-ivory": "#FFFFF0",
      "brit-black": "#000000",
      "cres-white": "#FFFFFF",
      "cres-gray": "#808080",
      "cres-cream": "#F5F5DC",
      "cres-ivory": "#FFFFF0",
      "hahn-white": "#FFFFFF",
      "hahn-gray": "#808080",
      "hahn-cream": "#F5F5DC",
      "hahn-ivory": "#FFFFF0",
    };

    return { color: colors[config.passepartout] || "#FFFFFF" };
  };

  const getFrameData = () => {
    if (!config.frame) return null;
    
    const colors: Record<string, string> = {
      "wood-natural-2044": "#D2B48C",
      "wood-white-2044": "#FFFFFF",
      "wood-walnut-2044": "#5C4033",
      "wood-black-2044": "#000000",
      "wood-natural-2030": "#D2B48C",
      "wood-white-2030": "#FFFFFF",
      "wood-walnut-2030": "#5C4033",
      "wood-black-2030": "#000000",
      "plastic-natural-2033": "#D2B48C",
      "plastic-white-2033": "#FFFFFF",
      "plastic-walnut-2033": "#5C4033",
      "plastic-black-2033": "#000000",
    };

    return { color: colors[config.frame] || "#D4AF37" };
  };

  const getSelectionSummary = (): string => {
    const parts: string[] = [];
    
    if (config.frame && FRAME_NAMES[config.frame]) {
      parts.push(FRAME_NAMES[config.frame]);
    }
    
    if (config.passepartout && PASSEPARTOUT_NAMES[config.passepartout]) {
      parts.push(PASSEPARTOUT_NAMES[config.passepartout]);
    }
    
    if (config.glass && GLASS_NAMES[config.glass]) {
      parts.push(GLASS_NAMES[config.glass]);
    } else {
      parts.push("Yerli Mineral 1.5 mm, Matbaai/Mat");
    }
    
    return parts.join(" | ");
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" />
      {/* Unified Wizard Layout for all devices */}
      <div className="flex flex-col h-screen">
        {/* Header with Progress */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-xs md:text-sm text-gray-600 font-medium">
                Adım {currentStep + 1}/8
              </span>
              <span className="hidden md:inline text-xs text-gray-400">•</span>
              <span className="hidden md:inline text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide">
                {STEP_NAMES[currentStep]}
              </span>
            </div>
            <div className="text-base md:text-lg font-bold text-red-600">
              {calculateTotalPrice().toFixed(0)} ₺
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
            <div
              className="bg-red-600 h-1.5 md:h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 8) * 100}%` }}
            />
          </div>
          
          {/* Mobile: Step Title */}
          <div className="md:hidden mt-2">
            <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              {STEP_NAMES[currentStep]}
            </h1>
          </div>
        </div>

        {/* Preview Canvas */}
        <div className="bg-gray-100 border-b border-gray-200 h-56 md:h-80 lg:h-96 flex-shrink-0">
          <PreviewCanvas
            uploadedImage={config.uploadedImage}
            size={config.size}
            border={config.border}
            passepartout={getPassepartoutData()}
            frame={getFrameData()}
            isMobile={false}
          />
        </div>

        {/* Step Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 flex gap-3 flex-shrink-0">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            ← Geri
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 7}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {currentStep === 7 ? 'Tamamla' : 'İleri'} →
          </Button>
        </div>
      </div>
    </div>
  );
}