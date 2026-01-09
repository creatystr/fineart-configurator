import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface PriceBarProps {
  totalPrice: number;
  onAddToCart: () => void;
  selectionSummary?: string;
}

export function PriceBar({ totalPrice, onAddToCart, selectionSummary }: PriceBarProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-6 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {selectionSummary ? (
            <p className="text-xs md:text-sm text-gray-700 font-medium truncate">
              {selectionSummary}
            </p>
          ) : (
            <p className="text-xs md:text-sm text-gray-500">
              Seçimlerinizi tamamlayın
            </p>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-6">
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-gray-600 uppercase tracking-wide">Toplam</span>
            <span className="text-xl md:text-3xl font-bold text-red-600">
              {totalPrice.toFixed(2)} ₺
            </span>
          </div>

          <Button
            onClick={onAddToCart}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 md:px-8 uppercase tracking-wide text-xs md:text-sm"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
            <span className="hidden sm:inline">Sepete Ekle</span>
            <span className="sm:hidden">Sepet</span>
          </Button>
        </div>
      </div>
    </div>
  );
}