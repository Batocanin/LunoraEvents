import { cn } from "@/lib/utils";
import { createPartySteps } from "../shared/utils/steps";
import { Button } from "@/components/ui/button";
import { UseMutationResult } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { PartyInfoValues } from "@/lib/validation";
import { Progress } from "@/components/ui/progress";

interface PartyEditDesignFooterProps {
  form: ReturnType<typeof useForm<PartyInfoValues>>;
  mutation: UseMutationResult<any, Error, void>;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  progress: number;
}

function PartyCreateDesignFooter({
  form,
  currentStep,
  setCurrentStep,
  mutation,
  progress,
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
          <p
            className={cn(
              "text-muted-foreground opacity-0",
              mutation.isPending && "opacity-100"
            )}
          >
            {mutation.isPending && "Kreiranje..."}
          </p>
          <Progress value={progress} className="w-40" />
          {progress}
        </div>
        <Button
          variant="secondary"
          onClick={form.handleSubmit(() => mutation.mutate())}
        >
          Kreiraj
        </Button>
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

export default PartyCreateDesignFooter;
