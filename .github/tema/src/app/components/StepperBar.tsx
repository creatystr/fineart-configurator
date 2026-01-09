import { Check } from "lucide-react";
import { cn } from "./ui/utils";

interface Step {
  id: string;
  label: string;
  number: number;
}

const STEPS: Step[] = [
  { id: "size", label: "EBAT", number: 1 },
  { id: "paper", label: "KAĞIT", number: 2 },
  { id: "border", label: "KENARLIK", number: 3 },
  { id: "fotoblok", label: "FOTOBLOK", number: 4 },
  { id: "passepartout", label: "PASPARTU", number: 5 },
  { id: "frame", label: "ÇERÇEVE", number: 6 },
  { id: "glass", label: "CAM", number: 7 },
  { id: "total", label: "TOPLAM", number: 8 },
  { id: "save", label: "KAYDET", number: 9 },
  { id: "clear", label: "TEMİZLE", number: 10 },
];

interface StepperBarProps {
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export function StepperBar({ currentStep, onStepClick }: StepperBarProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white border-t border-gray-200 overflow-x-auto">
      <div className="max-w-[1920px] mx-auto px-3 md:px-6 py-2 md:py-3">
        <div className="flex items-center gap-1 md:gap-2 min-w-max md:min-w-0">
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index < currentIndex;
            const isSpecial = step.id === "save" || step.id === "clear";

            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-1 px-2 md:px-3 py-2 rounded-lg transition-all md:flex-1 min-w-[70px] md:min-w-0",
                  isActive && !isSpecial && "bg-black text-white",
                  !isActive && !isSpecial && "hover:bg-gray-100",
                  isSpecial && step.id === "save" && "bg-red-600 text-white hover:bg-red-700",
                  isSpecial && step.id === "clear" && "bg-gray-800 text-white hover:bg-gray-900"
                )}
              >
                <div className="flex items-center gap-1 md:gap-2">
                  <div
                    className={cn(
                      "w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-xs font-semibold border-2 transition-all flex-shrink-0",
                      isActive && !isSpecial && "bg-white text-black border-white",
                      !isActive && !isSpecial && isCompleted && "bg-black text-white border-black",
                      !isActive && !isSpecial && !isCompleted && "bg-white text-gray-600 border-gray-300",
                      isSpecial && "border-transparent"
                    )}
                  >
                    {isCompleted && !isSpecial ? (
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] md:text-xs font-semibold uppercase tracking-wide truncate",
                    !isActive && !isSpecial && "text-gray-700"
                  )}>
                    {step.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}