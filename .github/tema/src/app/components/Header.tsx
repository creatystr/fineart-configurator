import { ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">
              in
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
              <span className="font-bold text-gray-900 text-sm md:text-base">plato</span>
              <span className="text-xs text-gray-600 hidden md:block">fine art studio</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            Giclee Baskı
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            Materyaller
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            Sanatçılar
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            Edisyon Eser
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            SSS & Yardım
          </a>
          <a href="#" className="text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide">
            İletişim
          </a>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-2">
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            Giclee Baskı
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            Materyaller
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            Sanatçılar
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            Edisyon Eser
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            SSS & Yardım
          </a>
          <a href="#" className="block text-sm text-gray-700 hover:text-red-600 uppercase tracking-wide py-2">
            İletişim
          </a>
        </nav>
      )}
    </header>
  );
}