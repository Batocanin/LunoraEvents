import { createPartySteps } from "../shared/utils/steps";
import { Button } from "@/components/ui/button";

interface PartyEditDesignFooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

function PartyCreateDesignFooter({
  currentStep,
  setCurrentStep,
}: PartyEditDesignFooterProps) {
  const previousStep = createPartySteps.find(
    (_, index) => createPartySteps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = createPartySteps.find(
    (_, index) => createPartySteps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex flex-wrap justify-between gap-3">
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
          {nextStep && (
            <Button
              onClick={nextStep ? () => setCurrentStep(nextStep) : undefined}
              disabled={!nextStep}
            >
              Sledeci korak
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}

export default PartyCreateDesignFooter;
