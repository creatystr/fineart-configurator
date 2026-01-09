import { Check, AlertCircle, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface Frame {
  id: string;
  name: string;
  material: string;
  color: string;
  width: string;
  price: number;
  hexColor: string;
}

const FRAMES: Frame[] = [
  // Ahşap Çerçeveler - 20x44 mm
  { id: "wood-natural-2044", name: "3401 Natural", material: "20x44 mm. Ahşap Profil", color: "Natural", width: "20x44 mm", price: 100.00, hexColor: "#D2B48C" },
  { id: "wood-white-2044", name: "3401 Beyaz", material: "20x44 mm. Ahşap Profil", color: "Beyaz", width: "20x44 mm", price: 100.00, hexColor: "#FFFFFF" },
  { id: "wood-walnut-2044", name: "3401 Kahve", material: "20x44 mm. Ahşap Profil", color: "Kahve", width: "20x44 mm", price: 100.00, hexColor: "#5C4033" },
  { id: "wood-black-2044", name: "3401 Siyah", material: "20x44 mm. Ahşap Profil", color: "Siyah", width: "20x44 mm", price: 100.00, hexColor: "#000000" },
  
  // Ahşap Çerçeveler - 20x30 mm
  { id: "wood-natural-2030", name: "2514 Natural", material: "20x30 mm. Ahşap Profil", color: "Natural", width: "20x30 mm", price: 80.00, hexColor: "#D2B48C" },
  { id: "wood-white-2030", name: "2514 Beyaz", material: "20x30 mm. Ahşap Profil", color: "Beyaz", width: "20x30 mm", price: 80.00, hexColor: "#FFFFFF" },
  { id: "wood-walnut-2030", name: "2514 Kahve", material: "20x30 mm. Ahşap Profil", color: "Kahve", width: "20x30 mm", price: 80.00, hexColor: "#654321" },
  { id: "wood-black-2030", name: "2514 Siyah", material: "20x30 mm. Ahşap Profil", color: "Siyah", width: "20x30 mm", price: 80.00, hexColor: "#000000" },
  
  // Plastik Çerçeveler - 20x33 mm
  { id: "plastic-natural-2033", name: "2235 Natural", material: "20x33 mm. Plastik Profil", color: "Natural", width: "20x33 mm", price: 60.00, hexColor: "#E8D5C4" },
  { id: "plastic-white-2033", name: "2235 Beyaz", material: "20x33 mm. Plastik Profil", color: "Beyaz", width: "20x33 mm", price: 60.00, hexColor: "#FFFFFF" },
  { id: "plastic-walnut-2033", name: "2235 Kahve", material: "20x33 mm. Plastik Profil", color: "Kahve", width: "20x33 mm", price: 60.00, hexColor: "#6B4423" },
  { id: "plastic-black-2033", name: "2235 Siyah", material: "20x33 mm. Plastik Profil", color: "Siyah", width: "20x33 mm", price: 60.00, hexColor: "#000000" },
];

interface FrameStepProps {
  selectedFrame: string | null;
  hasFotoblok: boolean;
  onChange: (frameId: string | null) => void;
}

export function FrameStep({ selectedFrame, hasFotoblok, onChange }: FrameStepProps) {
  const [noFrame, setNoFrame] = useState(selectedFrame === null);
  const materials = Array.from(new Set(FRAMES.map(f => f.material)));

  const handleNoFrameChange = (checked: boolean) => {
    setNoFrame(checked);
    if (checked) {
      onChange(null);
    }
  };

  if (!hasFotoblok) {
    return (
      <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full">
        <div className="border-b border-gray-200 pb-3 md:pb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Çerçeve Seçimi</h2>
        </div>

        <div className="bg-red-50 border border-red-200 rounded p-4 md:p-6 flex gap-3 md:gap-4">
          <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0" />
          <div>
            <p className="text-xs md:text-sm text-red-900 font-semibold mb-2">
              Çerçeve Seçimi İçin Fotoblok Gereklidir
            </p>
            <p className="text-xs md:text-sm text-red-800">
              Çerçeve seçebilmek için öncelikle <strong>FOTOBLOK</strong> adımına geri dönüp 
              bir fotoblok seçimi yapmanız gerekmektedir. Fotoblok, çerçevelemenin temel altyapısıdır.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Çerçeve Seçimi</h2>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="no-frame" 
          checked={noFrame}
          onCheckedChange={handleNoFrameChange}
        />
        <Label htmlFor="no-frame" className="text-xs md:text-sm font-medium cursor-pointer text-gray-900">
          ÇERÇEVE İSTEMİYORUM
        </Label>
      </div>

      {!noFrame && (
        <div className="space-y-4 md:space-y-6">
          {materials.map(material => (
            <div key={material} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide">
                  {material}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {FRAMES.filter(f => f.material === material).map(frame => {
                  const isSelected = selectedFrame === frame.id;
                  
                  return (
                    <button
                      key={frame.id}
                      onClick={() => onChange(frame.id)}
                      className={cn(
                        "relative text-center p-3 md:p-4 rounded border transition-all hover:shadow-md active:scale-95",
                        isSelected
                          ? "border-red-600 bg-red-50 shadow-md"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      {/* Frame preview - showing corner */}
                      <div className="w-full aspect-square mb-2 md:mb-3 relative rounded overflow-hidden">
                        {/* Outer frame */}
                        <div 
                          className="absolute inset-0 rounded"
                          style={{ 
                            backgroundColor: frame.hexColor,
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)'
                          }}
                        />
                        {/* Inner white space */}
                        <div className="absolute inset-[20%] bg-white rounded-sm shadow-inner" />
                        {/* Corner accent */}
                        <div 
                          className="absolute top-0 right-0 w-1/3 h-1/3"
                          style={{
                            background: `linear-gradient(135deg, ${frame.hexColor} 0%, transparent 100%)`
                          }}
                        />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[10px] md:text-xs font-semibold text-gray-900">
                          {frame.name}
                        </h4>
                      </div>

                      {/* Price tag with plus button */}
                      <div className="mt-2 md:mt-3 flex items-center justify-between">
                        <span className="text-xs md:text-sm font-bold text-gray-900">
                          {frame.price.toFixed(2)} ₺
                        </span>
                        <div
                          className={cn(
                            "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-colors",
                            isSelected 
                              ? "bg-red-600 text-white" 
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          )}
                        >
                          {isSelected ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <Plus className="w-3 h-3 md:w-4 md:h-4" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Çerçeve Bilgileri:
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Ahşap çerçeveler el işçiliği ile üretilir</li>
          <li>Plastik çerçeveler hafif ve ekonomiktir</li>
          <li>Tüm çerçeveler profesyonel montaj ile teslim edilir</li>
        </ul>
      </div>
    </div>
  );
}