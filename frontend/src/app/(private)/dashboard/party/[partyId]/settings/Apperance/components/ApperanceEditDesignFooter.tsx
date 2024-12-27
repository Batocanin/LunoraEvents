import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { editPartySteps } from "../../../../shared/utils/steps";
import { useForm } from "react-hook-form";
import { PartyInfoValues } from "@/lib/validation";
import { UseMutationResult } from "@tanstack/react-query";
import { Party } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface ApperanceEditDesignFooterProps {
  form: ReturnType<typeof useForm<PartyInfoValues>>;
  mutation: UseMutationResult<Party, Error, void>;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  progress: number;
}

function ApperanceEditDesignFooter({
  form,
  mutation,
  currentStep,
  setCurrentStep,
  progress,
}: ApperanceEditDesignFooterProps) {
  const previousStep = editPartySteps.find(
    (_, index) => editPartySteps[index + 1]?.key === currentStep
  )?.key;

  const nextStep = editPartySteps.find(
    (_, index) => editPartySteps[index - 1]?.key === currentStep
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              mutation.isPending && "opacity-100"
            )}
          >
            {mutation.isPending && "Čuvanje..."}
          </p>
          <Progress value={progress} className="w-40" />
          {progress}
        </div>
        <Button
          variant="secondary"
          disabled={mutation.isPending}
          onClick={form.handleSubmit(
            () => !mutation.isPending && mutation.mutate()
          )}
        >
          Izmeni
        </Button>
        {editPartySteps.length > 1 && (
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
        )}
      </div>
    </footer>
  );
}

export default ApperanceEditDesignFooter;
