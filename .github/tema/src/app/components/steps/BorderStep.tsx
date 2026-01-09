import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

interface BorderStepProps {
  border: { top: number; bottom: number; left: number; right: number };
  hasPassepartout: boolean;
  onChange: (border: { top: number; bottom: number; left: number; right: number }) => void;
}

export function BorderStep({ border, hasPassepartout, onChange }: BorderStepProps) {
  const [top, setTop] = useState(border.top.toString());
  const [bottom, setBottom] = useState(border.bottom.toString());
  const [left, setLeft] = useState(border.left.toString());
  const [right, setRight] = useState(border.right.toString());
  const [uniform, setUniform] = useState("2");

  const handleApply = () => {
    onChange({
      top: parseFloat(top) || 2,
      bottom: parseFloat(bottom) || 2,
      left: parseFloat(left) || 2,
      right: parseFloat(right) || 2,
    });
  };

  const handleUniformApply = () => {
    const value = parseFloat(uniform) || 2;
    setTop(value.toString());
    setBottom(value.toString());
    setLeft(value.toString());
    setRight(value.toString());
    onChange({ top: value, bottom: value, left: value, right: value });
  };

  const handlePreset = (preset: "none" | "small" | "medium" | "large") => {
    let value = { top: 0, bottom: 0, left: 0, right: 0 };
    
    switch (preset) {
      case "none":
        value = { top: 0, bottom: 0, left: 0, right: 0 };
        break;
      case "small":
        value = { top: 2, bottom: 2, left: 2, right: 2 };
        break;
      case "medium":
        value = { top: 5, bottom: 5, left: 5, right: 5 };
        break;
      case "large":
        value = { top: 10, bottom: 10, left: 10, right: 10 };
        break;
    }
    
    setTop(value.top.toString());
    setBottom(value.bottom.toString());
    setLeft(value.left.toString());
    setRight(value.right.toString());
    onChange(value);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Kenarlık</h2>
      </div>

      {hasPassepartout && (
        <div className="bg-red-50 border border-red-200 rounded p-3 md:p-4 flex gap-2 md:gap-3">
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm text-red-900 font-semibold">Paspartu Seçili</p>
            <p className="text-[10px] md:text-xs text-red-800 mt-1">
              Paspartu seçtiğiniz için kenarlık değerleri paspartuya göre otomatik ayarlanmıştır.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3">Hızlı Seçim</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => handlePreset("none")}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-xs md:text-sm"
            >
              Kenarlıksız
            </Button>
            <Button
              onClick={() => handlePreset("small")}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-xs md:text-sm"
            >
              Küçük (2cm)
            </Button>
            <Button
              onClick={() => handlePreset("medium")}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-xs md:text-sm"
            >
              Orta (5cm)
            </Button>
            <Button
              onClick={() => handlePreset("large")}
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-xs md:text-sm"
            >
              Büyük (10cm)
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3">Eşit Kenarlık</p>
          <div className="flex gap-2">
            <Input
              type="number"
              step="0.5"
              value={uniform}
              onChange={(e) => setUniform(e.target.value)}
              placeholder="cm"
              className="border-gray-300 text-sm"
            />
            <Button
              onClick={handleUniformApply}
              className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap text-xs md:text-sm px-3 md:px-4"
            >
              Tümüne Uygula
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
          <p className="text-xs md:text-sm font-semibold text-gray-900 mb-3">Özel Kenarlık</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3">
            <div>
              <Label htmlFor="top" className="text-gray-900 font-medium text-xs md:text-sm">Üst (cm)</Label>
              <Input
                id="top"
                type="number"
                step="0.5"
                value={top}
                onChange={(e) => setTop(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="bottom" className="text-gray-900 font-medium text-xs md:text-sm">Alt (cm)</Label>
              <Input
                id="bottom"
                type="number"
                step="0.5"
                value={bottom}
                onChange={(e) => setBottom(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="left" className="text-gray-900 font-medium text-xs md:text-sm">Sol (cm)</Label>
              <Input
                id="left"
                type="number"
                step="0.5"
                value={left}
                onChange={(e) => setLeft(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="right" className="text-gray-900 font-medium text-xs md:text-sm">Sağ (cm)</Label>
              <Input
                id="right"
                type="number"
                step="0.5"
                value={right}
                onChange={(e) => setRight(e.target.value)}
                className="mt-1 border-gray-300 text-sm"
              />
            </div>
          </div>
          <Button
            onClick={handleApply}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm"
          >
            Uygula
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Mevcut Kenarlık: Ü:{border.top}cm A:{border.bottom}cm S:{border.left}cm Sğ:{border.right}cm
        </p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-900 font-semibold">
          Kenarlık Nedir?
        </p>
        <ul className="text-[10px] md:text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Baskı alanı ile kağıt kenarı arasındaki beyaz boşluktur</li>
          <li>Çerçeveleme için önemli bir detaydır</li>
          <li>Klasik galeri baskılarında genellikle 2-5 cm kullanılır</li>
        </ul>
      </div>
    </div>
  );
}