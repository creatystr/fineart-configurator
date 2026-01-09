import { Check, Plus } from "lucide-react";
import { cn } from "../ui/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useState } from "react";

interface Glass {
  id: string;
  name: string;
  type: string;
  surface: string;
  uvProtection: string;
  price: number;
  image?: string;
}

const GLASSES: Glass[] = [
  // TruVue Müze Camı
  { id: "truvue-museum", name: "TruVue Müze Sınıfı 2mm", type: "TruVue Müze", surface: "Antirefle", uvProtection: "%99", price: 150 },
  
  // UV70 Camlar
  { id: "uv70-clear", name: "TruVue UV70 Parlak 2mm", type: "UV70", surface: "Parlak", uvProtection: "%70", price: 60 },
  { id: "uv70-matte", name: "TruVue UV70 Mat 2mm", type: "UV70", surface: "Mat", uvProtection: "%70", price: 65 },
  { id: "uv70-antirefle", name: "LUXAR Antirefle", type: "UV70", surface: "Antirefle", uvProtection: "%70", price: 80 },
  
  // Mineral Cam
  { id: "mineral-clear", name: "Yerli Mineral 1.5 mm", type: "Mineral", surface: "Parlak", uvProtection: "Yok", price: 30 },
  { id: "mineral-2mm", name: "Yerli Mineral 2 mm", type: "Mineral", surface: "Parlak", uvProtection: "Yok", price: 35 },
  
  // Akrilik
  { id: "acrylic-clear", name: "3A Peti6 Akrilik", type: "Akrilik", surface: "Parlak", uvProtection: "%50", price: 40 },
  { id: "acrylic-matte", name: "Akrilik Mat", type: "Akrilik", surface: "Mat", uvProtection: "%50", price: 45 },
  { id: "acrylic-antirefle", name: "Pleksidas / Akrilik Antirefle", type: "Akrilik", surface: "Antirefle", uvProtection: "%50", price: 55 },
];

interface GlassStepProps {
  selectedGlass: string | null;
  size: { width: number; height: number };
  onChange: (glassId: string | null) => void;
}

export function GlassStep({ selectedGlass, size, onChange }: GlassStepProps) {
  const [noGlass, setNoGlass] = useState(selectedGlass === null);
  const [filterType, setFilterType] = useState<string>("all");
  
  // Check mineral glass size limitation
  const maxDimension = Math.max(size.width, size.height);
  const mineralWarning = maxDimension > 100;

  const handleNoGlassChange = (checked: boolean) => {
    setNoGlass(checked);
    if (checked) {
      onChange(null);
    }
  };

  const filteredGlasses = filterType === "all" 
    ? GLASSES 
    : GLASSES.filter(g => g.type === filterType);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Cam Seçimi</h2>
      </div>

      {mineralWarning && (
        <div className="bg-red-50 border border-red-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm text-red-900 font-semibold">
            ⚠️ Ölçü Uyarısı
          </p>
          <p className="text-[10px] md:text-xs text-red-800 mt-1">
            Seçtiğiniz ebat 100 cm'yi aşıyor. Yerli Mineral cam maksimum 100 cm boyutunda üretilebilir.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Checkbox 
          id="no-glass" 
          checked={noGlass}
          onCheckedChange={handleNoGlassChange}
        />
        <Label htmlFor="no-glass" className="text-xs md:text-sm font-medium cursor-pointer text-gray-900">
          CAM İSTEMİYORUM
        </Label>
      </div>

      {!noGlass && (
        <>
          <div className="space-y-2">
            <Label className="text-gray-900 font-medium text-xs md:text-sm">Cam Türü Filtrele</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Tüm Camlar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Camlar</SelectItem>
                <SelectItem value="TruVue Müze">TruVue Müze Sınıfı</SelectItem>
                <SelectItem value="UV70">UV70 Camlar</SelectItem>
                <SelectItem value="Mineral">Mineral Cam</SelectItem>
                <SelectItem value="Akrilik">Akrilik</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredGlasses.map(glass => {
              const isDisabled = mineralWarning && glass.type === "Mineral";
              const isSelected = selectedGlass === glass.id;
              
              return (
                <button
                  key={glass.id}
                  onClick={() => !isDisabled && onChange(glass.id)}
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
                  {/* Glass preview */}
                  <div className={cn(
                    "w-full aspect-square rounded mb-2 md:mb-3 flex items-center justify-center",
                    glass.surface === "Antirefle" && "bg-gradient-to-br from-gray-100 to-gray-200",
                    glass.surface === "Mat" && "bg-gradient-to-br from-gray-50 to-gray-100",
                    glass.surface === "Parlak" && "bg-gradient-to-br from-white to-gray-50 border border-gray-200"
                  )}>
                    {glass.surface === "Antirefle" && (
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/40 backdrop-blur-sm" />
                    )}
                    {glass.surface === "Mat" && (
                      <div className="w-full h-full opacity-50 bg-gradient-to-tr from-transparent to-white/30" />
                    )}
                    {glass.surface === "Parlak" && (
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-white to-transparent border border-gray-300" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-[10px] md:text-xs font-semibold text-gray-900 line-clamp-2 min-h-[2rem]">
                      {glass.name}
                    </h4>
                    <p className="text-[8px] md:text-[10px] text-gray-500">{glass.surface}</p>
                  </div>

                  {/* Price tag with plus button */}
                  <div className="mt-2 md:mt-3 flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-gray-900">
                      {glass.price.toFixed(2)} ₺
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
        </>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Cam Türleri Hakkında:
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li><strong>TruVue Müze:</strong> En üst seviye UV koruma ve antirefle özellik</li>
          <li><strong>UV70:</strong> %70 UV koruma, orta segment</li>
          <li><strong>Mineral:</strong> Ekonomik seçenek, max 100 cm</li>
          <li><strong>Akrilik:</strong> Hafif ve kırılmaz alternatif</li>
        </ul>
      </div>
    </div>
  );
}