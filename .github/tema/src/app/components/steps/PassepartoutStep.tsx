import { Check, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface Passepartout {
  id: string;
  name: string;
  brand: string;
  color: string;
  thickness: string;
  price: number;
  hexColor: string;
}

const PASSEPARTOUTS: Passepartout[] = [
  // Eko
  { id: "eko-white", name: "Beyaz", brand: "Eko | Krem kağıt tabanlı | Ph. Nötr | Kalınlık: 1.4 mm", color: "Beyaz", thickness: "1.4mm", price: 20.00, hexColor: "#FFFFFF" },
  { id: "eko-gray", name: "Gri-B", brand: "Eko | Krem kağıt tabanlı | Ph. Nötr | Kalınlık: 1.4 mm", color: "Gri", thickness: "1.4mm", price: 20.00, hexColor: "#D3D3D3" },
  { id: "eko-ivory", name: "Ivory", brand: "Eko | Krem kağıt tabanlı | Ph. Nötr | Kalınlık: 1.4 mm", color: "Ivory", thickness: "1.4mm", price: 20.00, hexColor: "#FFFFF0" },
  { id: "eko-black", name: "Siyah", brand: "Eko | Krem kağıt tabanlı | Ph. Nötr | Kalınlık: 1.4 mm", color: "Siyah", thickness: "1.4mm", price: 20.00, hexColor: "#000000" },
  
  // Britannia
  { id: "brit-white", name: "Beyaz", brand: "Britannia | Beyaz kağıt tabanlı | Ph. 7.7 - 8.5 | Kalınlık: 1.4 mm", color: "Beyaz", thickness: "1.4mm", price: 25.00, hexColor: "#FFFFFF" },
  { id: "brit-gray", name: "Gri-B", brand: "Britannia | Beyaz kağıt tabanlı | Ph. 7.7 - 8.5 | Kalınlık: 1.4 mm", color: "Gri", thickness: "1.4mm", price: 25.00, hexColor: "#D3D3D3" },
  { id: "brit-ivory", name: "Ivory", brand: "Britannia | Beyaz kağıt tabanlı | Ph. 7.7 - 8.5 | Kalınlık: 1.4 mm", color: "Ivory", thickness: "1.4mm", price: 25.00, hexColor: "#FFFFF0" },
  { id: "brit-black", name: "Siyah", brand: "Britannia | Beyaz kağıt tabanlı | Ph. 7.7 - 8.5 | Kalınlık: 1.4 mm", color: "Siyah", thickness: "1.4mm", price: 25.00, hexColor: "#000000" },
  
  // Crescent
  { id: "cres-white", name: "Antik Beyaz", brand: "Crescent | Asitsiz, Alfa Selüloz ISO 9706, Arşiv Sınıfı | Ph. 8.0 - 8.5 | Kalınlık: 1.5 ve 2.5 mm", color: "Beyaz", thickness: "1.5mm", price: 30.00, hexColor: "#FAFAFA" },
  { id: "cres-gray", name: "Antik Gri", brand: "Crescent | Asitsiz, Alfa Selüloz ISO 9706, Arşiv Sınıfı | Ph. 8.0 - 8.5 | Kalınlık: 1.5 ve 2.5 mm", color: "Gri", thickness: "1.5mm", price: 30.00, hexColor: "#BEBEBE" },
  { id: "cres-cream", name: "Bej / Beyaz İç Beyaz", brand: "Crescent | Asitsiz, Alfa Selüloz ISO 9706, Arşiv Sınıfı | Ph. 8.0 - 8.5 | Kalınlık: 1.5 ve 2.5 mm", color: "Bej", thickness: "1.5mm", price: 30.00, hexColor: "#F5F5DC" },
  { id: "cres-ivory", name: "Antik", brand: "Crescent | Asitsiz, Alfa Selüloz ISO 9706, Arşiv Sınıfı | Ph. 8.0 - 8.5 | Kalınlık: 1.5 ve 2.5 mm", color: "Antik", thickness: "1.5mm", price: 30.00, hexColor: "#FAF0E6" },
  
  // Hahnemuhle
  { id: "hahn-white", name: "14 mm Beyaz", brand: "Hahnemuhle | Asitsiz, %100 Pamuk, ISO 9706, Müze Sınıfı | Ph. 8.5 - 8.5 | Kalınlık: 1.5 mm, Ivory", color: "Beyaz", thickness: "1.5mm", price: 50.00, hexColor: "#FFFFFF" },
  { id: "hahn-gray", name: "14 mm Gri", brand: "Hahnemuhle | Asitsiz, %100 Pamuk, ISO 9706, Müze Sınıfı | Ph. 8.5 - 8.5 | Kalınlık: 1.5 mm, Ivory", color: "Gri", thickness: "1.5mm", price: 50.00, hexColor: "#CCCCCC" },
  { id: "hahn-cream", name: "Bej / Beyaz İç Beyaz", brand: "Hahnemuhle | Asitsiz, %100 Pamuk, ISO 9706, Müze Sınıfı | Ph. 8.5 - 8.5 | Kalınlık: 1.5 mm, Ivory", color: "Bej", thickness: "1.5mm", price: 50.00, hexColor: "#F5F5DC" },
  { id: "hahn-ivory", name: "Ivory", brand: "Hahnemuhle | Asitsiz, %100 Pamuk, ISO 9706, Müze Sınıfı | Ph. 8.5 - 8.5 | Kalınlık: 1.5 mm, Ivory", color: "Ivory", thickness: "1.5mm", price: 50.00, hexColor: "#FFFFF0" },
];

interface PassepartoutStepProps {
  selectedPassepartout: string | null;
  onChange: (passepartoutId: string | null) => void;
}

export function PassepartoutStep({ selectedPassepartout, onChange }: PassepartoutStepProps) {
  const [noPassepartout, setNoPassepartout] = useState(selectedPassepartout === null);
  const brands = Array.from(new Set(PASSEPARTOUTS.map(p => p.brand)));

  const handleNoPassepartoutChange = (checked: boolean) => {
    setNoPassepartout(checked);
    if (checked) {
      onChange(null);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Paspartu Seçimi</h2>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox 
          id="no-passepartout" 
          checked={noPassepartout}
          onCheckedChange={handleNoPassepartoutChange}
        />
        <Label htmlFor="no-passepartout" className="text-xs md:text-sm font-medium cursor-pointer text-gray-900">
          PASPARTU İSTEMİYORUM
        </Label>
      </div>

      {!noPassepartout && (
        <div className="space-y-4 md:space-y-6">
          {brands.map(brand => (
            <div key={brand} className="space-y-3">
              <div className="flex items-start gap-2 border-b border-gray-200 pb-2">
                <div className="flex-1">
                  <h3 className="text-xs md:text-sm font-bold text-gray-900">
                    {brand.split('|')[0].trim()}
                  </h3>
                  <p className="text-[9px] md:text-[10px] text-gray-600 mt-0.5">
                    {brand.split('|').slice(1).join(' | ')}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {PASSEPARTOUTS.filter(p => p.brand === brand).map(passepartout => {
                  const isSelected = selectedPassepartout === passepartout.id;
                  
                  return (
                    <button
                      key={passepartout.id}
                      onClick={() => onChange(passepartout.id)}
                      className={cn(
                        "relative text-center p-3 md:p-4 rounded border transition-all hover:shadow-md active:scale-95",
                        isSelected
                          ? "border-red-600 bg-red-50 shadow-md"
                          : "border-gray-200 bg-white"
                      )}
                    >
                      {/* Passepartout color preview */}
                      <div className="w-full aspect-square mb-2 md:mb-3 relative rounded overflow-hidden border-2 border-gray-300">
                        <div 
                          className="absolute inset-0"
                          style={{ backgroundColor: passepartout.hexColor }}
                        />
                        {/* Inner frame effect */}
                        <div className="absolute inset-[25%] bg-white shadow-md rounded-sm" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-[10px] md:text-xs font-semibold text-gray-900">
                          {passepartout.name}
                        </h4>
                      </div>

                      {/* Price tag with plus button */}
                      <div className="mt-2 md:mt-3 flex items-center justify-between">
                        <span className="text-xs md:text-sm font-bold text-gray-900">
                          {passepartout.price.toFixed(2)} ₺
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
          Paspartu Avantajları:
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Eserinizi cam ile temasını önler, koruma sağlar</li>
          <li>Görsel olarak çerçeve ile eser arasında derinlik yaratır</li>
          <li>Profesyonel galeri görünümü kazandırır</li>
          <li>Asitsiz, arşiv kalitesinde materyalden üretilmiştir</li>
        </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Önemli Not:
        </p>
        <p className="text-[10px] md:text-xs text-gray-700 mt-1">
          Paspartu seçildiğinde kenarlık değerleri otomatik olarak paspartuya uygun şekilde ayarlanacaktır.
        </p>
      </div>
    </div>
  );
}