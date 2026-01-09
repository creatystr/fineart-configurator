import { Upload } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  uploadedImage: string | null;
  printType: string;
  onImageUpload: (file: File) => void;
  onPrintTypeChange: (type: string) => void;
}

export function Sidebar({ uploadedImage, printType, onImageUpload, onPrintTypeChange }: SidebarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <aside className="w-[200px] bg-white border-r border-gray-200 p-3 flex flex-col gap-4">
      {/* Thumbnail Area - Compact */}
      <div className="flex gap-2">
        <div className="w-14 h-14 border-2 border-gray-300 rounded overflow-hidden bg-gray-50 flex-shrink-0">
          {uploadedImage ? (
            <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Upload className="w-5 h-5" />
            </div>
          )}
        </div>
        <div className="w-14 h-14 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors flex-shrink-0">
          <label className="cursor-pointer flex items-center justify-center w-full h-full">
            <Upload className="w-5 h-5 text-gray-400" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Print Type Selection - Compact */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-semibold text-gray-700 uppercase tracking-wide">Baskı Türü</h3>
        
        <Button
          variant={printType === "fotograf" ? "default" : "outline"}
          size="sm"
          onClick={() => onPrintTypeChange("fotograf")}
          className={`text-[10px] h-auto py-2 w-full ${
            printType === "fotograf" 
              ? "bg-gray-700 hover:bg-gray-800 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          FOTOGRAF SINIFI
        </Button>
        
        <Button
          variant={printType === "fineart" ? "default" : "outline"}
          size="sm"
          onClick={() => onPrintTypeChange("fineart")}
          className={`text-[10px] h-auto py-2 w-full ${
            printType === "fineart" 
              ? "bg-red-600 hover:bg-red-700 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          FINEART SINIFI
        </Button>

        <Button
          variant={printType === "kanvas" ? "default" : "outline"}
          size="sm"
          onClick={() => onPrintTypeChange("kanvas")}
          className={`text-[10px] py-2 w-full ${
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
          className={`text-[10px] py-2 w-full ${
            printType === "diasec" 
              ? "bg-gray-700 hover:bg-gray-800 text-white" 
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          DIASEC
        </Button>
      </div>

      {/* Brand Logo - Compact */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="text-red-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-900">Hahnemühle</span>
        </div>
      </div>
    </aside>
  );
}