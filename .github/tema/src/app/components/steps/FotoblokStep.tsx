import { Check, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface Fotoblok {
  id: string;
  name: string;
  category: string;
  thickness: string;
  material: string;
  price: number;
  maxSize: number; // in cm
}

const FOTOBLOKS: Fotoblok[] = [
  // Standard Fotoblok
  { id: "std-3mm", name: "Standart 3mm", category: "Standart Fotoblok", thickness: "3mm", material: "MDF", price: 25, maxSize: 100 },
  { id: "std-5mm", name: "Standart 5mm", category: "Standart Fotoblok", thickness: "5mm", material: "MDF", price: 35, maxSize: 120 },
  
  // Archive Fotoblok
  { id: "archive-5mm", name: "Arşiv 5mm", category: "Arşiv Kalitesi Fotoblok", thickness: "5mm", material: "Asitsiz MDF", price: 50, maxSize: 120 },
  { id: "archive-8mm", name: "Arşiv 8mm", category: "Arşiv Kalitesi Fotoblok", thickness: "8mm", material: "Asitsiz MDF", price: 65, maxSize: 150 },
  
  // Museum Fotoblok
  { id: "museum-5mm", name: "Müze 5mm", category: "Müze Kalitesi Fotoblok", thickness: "5mm", material: "%100 Pamuk", price: 80, maxSize: 120 },
  { id: "museum-10mm", name: "Müze 10mm", category: "Müze Kalitesi Fotoblok", thickness: "10mm", material: "%100 Pamuk", price: 120, maxSize: 150 },
  
  // Alternative Materials
  { id: "dibond-3mm", name: "Dibond 3mm", category: "Alternatif Malzemeler", thickness: "3mm", material: "Alüminyum Kompozit", price: 55, maxSize: 200 },
  { id: "forex-5mm", name: "Forex 5mm", category: "Alternatif Malzemeler", thickness: "5mm", material: "PVC Köpük", price: 40, maxSize: 200 },
];

interface FotoblokStepProps {
  selectedFotoblok: string | null;
  size: { width: number; height: number };
  onChange: (fotoblokId: string | null) => void;
}

export function FotoblokStep({ selectedFotoblok, size, onChange }: FotoblokStepProps) {
  const [noFotoblok, setNoFotoblok] = useState(selectedFotoblok === null);
  const categories = Array.from(new Set(FOTOBLOKS.map(f => f.category)));
  
  const maxDimension = Math.max(size.width, size.height);

  const handleNoFotoblokChange = (checked: boolean) => {
    setNoFotoblok(checked);
    if (checked) {
      onChange(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Fotoblok Seçimi</h2>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="no-fotoblok" 
          checked={noFotoblok}
          onCheckedChange={handleNoFotoblokChange}
        />
        <Label htmlFor="no-fotoblok" className="text-xs md:text-sm font-medium cursor-pointer text-gray-900">
          FOTOBLOK İSTEMİYORUM
        </Label>
      </div>

      {!noFotoblok && (
        <div className="space-y-4 md:space-y-6">
          {categories.map(category => (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide">
                  {category}
                </h3>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {FOTOBLOKS.filter(f => f.category === category).map(fotoblok => {
                  const isDisabled = maxDimension > fotoblok.maxSize;
                  const isSelected = selectedFotoblok === fotoblok.id;
                  
                  return (
                    <button
                      key={fotoblok.id}
                      onClick={() => !isDisabled && onChange(fotoblok.id)}
                      disabled={isDisabled}
                      className={cn(
                        "relative text-center p-3 md:p-4 rounded border transition-all",
                        isDisabled && "opacity-30 cursor-not-allowed",
                        !isDisabled && "hover:shadow-md active:scale-95",
                        isSelected && !isDisabled
                          ? "border-red-600 bg-red-50 shadow-md"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      {/* Fotoblok visual */}
                      <div className="w-full aspect-square mb-2 md:mb-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded flex items-center justify-center border border-gray-300">
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-amber-900">{fotoblok.thickness}</p>
                          <p className="text-[7px] md:text-[8px] text-amber-700 uppercase mt-1">{fotoblok.material}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[10px] md:text-xs font-semibold text-gray-900">
                          {fotoblok.name}
                        </h4>
                        <p className="text-[9px] md:text-[10px] text-gray-600">
                          Max: {fotoblok.maxSize}cm
                        </p>
                      </div>

                      {isDisabled && (
                        <div className="absolute top-2 right-2">
                          <span className="text-[9px] md:text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">
                            Büyük
                          </span>
                        </div>
                      )}

                      {/* Price tag with plus button */}
                      <div className="mt-2 md:mt-3 flex items-center justify-between">
                        <span className="text-xs md:text-sm font-bold text-gray-900">
                          {fotoblok.price.toFixed(2)} ₺
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
          Fotoblok Nedir?
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Baskınızı düz, sert bir yüzeye monte ederek stabilite sağlar</li>
          <li>Çerçeveleme için gerekli altyapıyı oluşturur</li>
          <li>Arşiv kalitesi seçenekler uzun ömürlü koruma sağlar</li>
          <li>Seçtiğiniz ebata uygun fotoblok seçiniz</li>
        </ul>
      </div>

      {maxDimension > 100 && (
        <div className="bg-red-50 border border-red-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm text-red-900 font-semibold">
            ⚠️ Ebat Uyarısı
          </p>
          <p className="text-[10px] md:text-xs text-red-800 mt-1">
            Seçtiğiniz ebat {maxDimension} cm. Bazı fotoblok seçenekleri bu ebat için uygun değildir.
          </p>
        </div>
      )}
    </div>
  );
}