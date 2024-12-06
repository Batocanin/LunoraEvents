import { Button } from "@/components/ui/button";
import { steps } from "./steps";
import { cn } from "@/lib/utils";

interface PartyEditorFooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  isSaving: boolean;
}

function PartyEditorFooter({
  currentStep,
  setCurrentStep,
  isSaving,
}: PartyEditorFooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              isSaving && "opacity-100"
            )}
          >
            {isSaving && "Saving..."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Nazad
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
            disabled={!nextStep}
          >
            Sledeci korak
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default PartyEditorFooter;
