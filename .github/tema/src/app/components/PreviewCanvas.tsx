import { ImageWithFallback } from "./figma/ImageWithFallback";

interface PreviewCanvasProps {
  uploadedImage: string | null;
  size: { width: number; height: number };
  border: { top: number; bottom: number; left: number; right: number };
  passepartout: any;
  frame: any;
  showWarning?: boolean;
  warningMessage?: string;
  isMobile?: boolean;
}

export function PreviewCanvas({
  uploadedImage,
  size,
  border,
  passepartout,
  frame,
  showWarning,
  warningMessage,
  isMobile
}: PreviewCanvasProps) {
  // Calculate aspect ratio for display
  const aspectRatio = size.width / size.height;
  
  // Responsive sizing - larger for mobile view
  const maxDisplayWidth = isMobile ? 280 : 450;
  const maxDisplayHeight = isMobile ? 180 : 350;
  
  let displayWidth = maxDisplayWidth;
  let displayHeight = maxDisplayWidth / aspectRatio;
  
  if (displayHeight > maxDisplayHeight) {
    displayHeight = maxDisplayHeight;
    displayWidth = maxDisplayHeight * aspectRatio;
  }

  // Calculate border sizes proportionally
  const borderScale = displayWidth / size.width;
  const scaledBorder = {
    top: border.top * borderScale,
    bottom: border.bottom * borderScale,
    left: border.left * borderScale,
    right: border.right * borderScale,
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-50 relative overflow-hidden flex items-center justify-center">
      {/* Room mockup background - desktop only */}
      {!isMobile && (
        <>
          {/* Wall */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-50 to-blue-100" />
          
          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-100 to-amber-50 border-t-4 border-amber-200" />
          
          {/* Decorative plant (right side) */}
          <div className="absolute bottom-32 right-12 w-24 h-48 opacity-60">
            <div className="w-2 h-32 bg-green-800 absolute bottom-0 left-1/2 -translate-x-1/2" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-green-600 rounded-full opacity-80" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-green-500 rounded-full opacity-70" />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-400 rounded-full opacity-60" />
          </div>

          {/* Decorative furniture (right side) */}
          <div className="absolute bottom-32 right-[30%] opacity-70">
            <div className="w-20 h-16 bg-pink-300 rounded-lg shadow-lg" />
            <div className="w-16 h-2 bg-pink-400 absolute bottom-0 left-2 rounded-full" />
          </div>
        </>
      )}

      {/* The framed print */}
      <div className="relative z-10 shadow-2xl" style={{
        width: displayWidth + scaledBorder.left + scaledBorder.right,
        height: displayHeight + scaledBorder.top + scaledBorder.bottom,
      }}>
        {/* Frame */}
        {frame && (
          <div 
            className="absolute inset-0"
            style={{
              background: frame.color || '#D4AF37',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.3)',
            }}
          />
        )}

        {/* Passepartout */}
        {passepartout && (
          <div
            className="absolute"
            style={{
              top: scaledBorder.top,
              left: scaledBorder.left,
              right: scaledBorder.right,
              bottom: scaledBorder.bottom,
              background: passepartout.color || '#f5f5f0',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
            }}
          />
        )}

        {/* Image */}
        <div
          className="absolute bg-white overflow-hidden"
          style={{
            top: scaledBorder.top + (passepartout ? scaledBorder.top * 0.5 : 0),
            left: scaledBorder.left + (passepartout ? scaledBorder.left * 0.5 : 0),
            right: scaledBorder.right + (passepartout ? scaledBorder.right * 0.5 : 0),
            bottom: scaledBorder.bottom + (passepartout ? scaledBorder.bottom * 0.5 : 0),
          }}
        >
          {uploadedImage ? (
            <img
              src={uploadedImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
              Görsel Yükleyin
            </div>
          )}
        </div>
      </div>

      {/* Warning message */}
      {showWarning && warningMessage && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-amber-100 border-2 border-amber-400 text-amber-900 px-6 py-3 rounded-lg shadow-lg max-w-md text-center">
          <p className="text-sm font-medium">{warningMessage}</p>
        </div>
      )}
    </div>
  );
}