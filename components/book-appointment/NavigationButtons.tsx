import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface NavigationButtonsProps {
  step: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  handleSubmit: () => void;
  canProceed: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  step,
  handlePrevStep,
  handleNextStep,
  handleSubmit,
  canProceed,
}) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
      <Button
        variant="outline"
        onClick={handlePrevStep}
        disabled={step === 1}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </Button>
      {step < 4 ? (
        <Button
          onClick={handleNextStep}
          disabled={!canProceed}
          className="w-full sm:w-auto"
        >
          Next
          <ChevronRight className="h-5 w-5 ml-1" />
        </Button>
      ) : (
        <Button onClick={handleSubmit} className="w-full sm:w-auto">
          Confirm Appointment
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;