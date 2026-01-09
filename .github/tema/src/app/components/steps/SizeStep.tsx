import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { Upload } from "lucide-react";

interface SizeStepProps {
  size: { width: number; height: number };
  onChange: (size: { width: number; height: number }) => void;
  onImageUpload?: (file: File) => void;
  onPrintTypeChange?: (type: string) => void;
  uploadedImage?: string | null;
  printType?: string;
}

const PRESET_SIZES = [
  { width: 30, height: 40, label: "30x40 cm" },
  { width: 50, height: 70, label: "50x70 cm" },
  { width: 60, height: 80, label: "60x80 cm" },
  { width: 70, height: 100, label: "70x100 cm" },
  { width: 80, height: 120, label: "80x120 cm" },
  { width: 100, height: 140, label: "100x140 cm" },
];

export function SizeStep({ size, onChange, onImageUpload, onPrintTypeChange, uploadedImage, printType }: SizeStepProps) {
  const [customWidth, setCustomWidth] = useState(size.width.toString());
  const [customHeight, setCustomHeight] = useState(size.height.toString());

  const handlePresetClick = (width: number, height: number) => {
    onChange({ width, height });
    setCustomWidth(width.toString());
    setCustomHeight(height.toString());
  };

  const handleCustomApply = () => {
    const width = parseInt(customWidth) || 50;
    const height = parseInt(customHeight) || 70;
    onChange({ width, height });
  };

  const handleSwap = () => {
    const newWidth = size.height;
    const newHeight = size.width;
    onChange({ width: newWidth, height: newHeight });
    setCustomWidth(newWidth.toString());
    setCustomHeight(newHeight.toString());
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File read complete");
        if (onImageUpload) {
          onImageUpload(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Ebat Seçimi</h2>
      </div>

      {/* Upload & Print Type Section - Show on all devices */}
      {onImageUpload && onPrintTypeChange && (
        <div className="space-y-4">
          {/* Image Upload */}
          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-xs font-semibold text-gray-900 mb-3">Görsel Yükle</p>
            <div className="flex gap-3">
              {uploadedImage && (
                <div className="w-20 h-20 border-2 border-gray-300 rounded overflow-hidden bg-gray-50 flex-shrink-0">
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex-1 min-h-[80px] border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors bg-white">
                <Upload className="w-8 h-8 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">Görsel Seç</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Print Type Selection */}
          <div className="bg-gray-50 border border-gray-200 rounded p-3">
            <p className="text-xs font-semibold text-gray-900 mb-3">Baskı Türü</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={printType === "fotograf" ? "default" : "outline"}
                size="sm"
                onClick={() => onPrintTypeChange("fotograf")}
                className={`text-[10px] md:text-xs h-auto py-2.5 md:py-3 ${
                  printType === "fotograf" 
                    ? "bg-gray-700 hover:bg-gray-800 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="lg:hidden">FOTOGRAF</span>
                <span className="hidden lg:inline">FOTOGRAF<br />SINIFI</span>
              </Button>
              
              <Button
                variant={printType === "fineart" ? "default" : "outline"}
                size="sm"
                onClick={() => onPrintTypeChange("fineart")}
                className={`text-[10px] md:text-xs h-auto py-2.5 md:py-3 ${
                  printType === "fineart" 
                    ? "bg-red-600 hover:bg-red-700 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="lg:hidden">FINEART</span>
                <span className="hidden lg:inline">FINEART<br />SINIFI</span>
              </Button>

              <Button
                variant={printType === "kanvas" ? "default" : "outline"}
                size="sm"
                onClick={() => onPrintTypeChange("kanvas")}
                className={`text-[10px] md:text-xs py-2.5 md:py-3 ${
                  printType === "kanvas" 
                    ? "bg-gray-700 hover:bg-gray-800 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                KANVAS
              </Button>
              
              <Button
                variant={printType === "diasec" ? "default" : "outline"}
                size="sm"
                onClick={() => onPrintTypeChange("diasec")}
                className={`text-[10px] md:text-xs py-2.5 md:py-3 ${
                  printType === "diasec" 
                    ? "bg-gray-700 hover:bg-gray-800 text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                DIASEC
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3">Hazır Ebatlar</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {PRESET_SIZES.map((preset) => {
              const isSelected = size.width === preset.width && size.height === preset.height;
              return (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.width, preset.height)}
                  className={cn(
                    "px-3 md:px-4 py-2 md:py-3 rounded border font-medium transition-all text-xs md:text-sm active:scale-95",
                    isSelected
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3">Özel Ebat</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3">
            <div>
              <Label htmlFor="width" className="text-gray-900 font-medium text-xs md:text-sm">Genişlik (cm)</Label>
              <Input
                id="width"
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-gray-900 font-medium text-xs md:text-sm">Yükseklik (cm)</Label>
              <Input
                id="height"
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCustomApply}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm"
            >
              Uygula
            </Button>
            <Button
              onClick={handleSwap}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-xs md:text-sm"
            >
              ↔ Döndür
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Seçili Ebat: {size.width} x {size.height} cm
        </p>
        <p className="text-[10px] md:text-xs text-gray-600 mt-1">
          Alan: {((size.width * size.height) / 10000).toFixed(2)} m²
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Önemli Notlar:
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Minimum baskı ebatı: 20 x 20 cm</li>
          <li>Maksimum baskı ebatı: 120 x 200 cm</li>
          <li>Özel ebatlar için ölçüleri dikkatle girin</li>
        </ul>
      </div>
    </div>
  );
}