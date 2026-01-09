import { Check, Plus } from "lucide-react";
import { cn } from "../ui/utils";

interface Paper {
  id: string;
  name: string;
  brand: string;
  weight: string;
  surface: string;
  price: number;
}

const PAPERS: Paper[] = [
  // Hahnemühle Papers
  { id: "photo-rag-308", name: "Photo Rag", brand: "Hahnemühle", weight: "308 gsm", surface: "Smooth Matte", price: 45 },
  { id: "william-turner-190", name: "William Turner", brand: "Hahnemühle", weight: "190 gsm", surface: "Textured Matte", price: 35 },
  { id: "museum-etching-350", name: "Museum Etching", brand: "Hahnemühle", weight: "350 gsm", surface: "Textured Matte", price: 50 },
  { id: "torchon-285", name: "Torchon", brand: "Hahnemühle", weight: "285 gsm", surface: "Rough Texture", price: 42 },
  { id: "canvas-340", name: "Canvas", brand: "Hahnemühle", weight: "340 gsm", surface: "Canvas Texture", price: 48 },
  { id: "photo-rag-baryta-315", name: "Photo Rag Baryta", brand: "Hahnemühle", weight: "315 gsm", surface: "High Gloss", price: 55 },
  { id: "german-etching-310", name: "German Etching", brand: "Hahnemühle", weight: "310 gsm", surface: "Textured Matte", price: 52 },
  { id: "photo-rag-ultra-smooth-305", name: "Photo Rag Ultra Smooth", brand: "Hahnemühle", weight: "305 gsm", surface: "Ultra Smooth", price: 60 },
  { id: "fine-art-pearl-285", name: "Fine Art Pearl", brand: "Hahnemühle", weight: "285 gsm", surface: "Pearl Surface", price: 40 },
];

interface PaperStepProps {
  selectedPaper: string | null;
  onChange: (paperId: string) => void;
}

export function PaperStep({ selectedPaper, onChange }: PaperStepProps) {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 bg-white h-full overflow-y-auto">
      <div className="border-b border-gray-200 pb-3 md:pb-4">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 uppercase tracking-wide">Kağıt Seçimi</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {PAPERS.map((paper) => {
          const isSelected = selectedPaper === paper.id;
          
          return (
            <button
              key={paper.id}
              onClick={() => onChange(paper.id)}
              className={cn(
                "relative text-left p-2 rounded border transition-all hover:shadow-md active:scale-95",
                isSelected
                  ? "border-red-600 bg-red-50 shadow-md"
                  : "border-gray-200 bg-white"
              )}
            >
              {/* Compact iconic paper preview */}
              <div className={cn(
                "w-full h-16 rounded mb-2 flex items-center justify-center relative overflow-hidden",
                paper.surface.includes("Gloss") && "bg-gradient-to-br from-white to-gray-100 border border-gray-200",
                paper.surface.includes("Matte") && "bg-gradient-to-br from-gray-50 to-gray-100",
                paper.surface.includes("Texture") && "bg-gray-100",
                paper.surface.includes("Canvas") && "bg-gradient-to-br from-amber-50 to-amber-100"
              )}>
                {paper.surface.includes("Texture") && (
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)'
                  }} />
                )}
                {paper.surface.includes("Canvas") && (
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,.05) 2px, rgba(0,0,0,.05) 4px)'
                  }} />
                )}
                <div className="text-center px-2">
                  <p className="text-[10px] font-bold text-gray-700">{paper.brand}</p>
                  <p className="text-[8px] text-gray-500 mt-0.5">{paper.surface}</p>
                </div>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-[11px] font-semibold text-gray-900 line-clamp-1">
                  {paper.name}
                </h4>
                <p className="text-[9px] text-gray-600">{paper.weight}</p>
              </div>

              {/* Price tag with plus button */}
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-900">
                  {paper.price} ₺
                </span>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center transition-colors",
                    isSelected 
                      ? "bg-red-600 text-white" 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded p-3">
        <p className="text-xs text-gray-900 font-semibold">
          Kağıt Hakkında:
        </p>
        <ul className="text-[10px] text-gray-700 mt-2 space-y-1 list-disc list-inside">
          <li>Tüm kağıtlar %100 pamuk, asitsiz ve arşiv kalitesindedir</li>
          <li>Yüzey dokusu sanat eserinizin karakterini belirler</li>
          <li>Ağırlık (gsm) kağıdın kalınlığını ve dayanıklılığını gösterir</li>
        </ul>
      </div>
    </div>
  );
}