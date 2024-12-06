"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import PartyEditorFooter from "./PartyEditorFooter";
import { useState } from "react";
import { PartyValues } from "@/lib/validation";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import UseAutoSaveParty from "./UseAutoSaveParty";

function PartyEditor() {
  const searchParams = useSearchParams();
  const [partyData, setPartyData] = useState<PartyValues>({
    title: "",
    dateEndTime: new Date().toISOString(),
  });

  const { isSaving, hasUnsavedChanges } = UseAutoSaveParty(partyData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 pb-3 text-center">
        <h1 className="text-2xl font-bold">
          Dizajnirajte izgled stranice vaše proslave
        </h1>
        <p className="text-sm text-muted-foreground">
          Pratite korak ispred da bi kreirali stranicu za vašu proslavu. Svaka
          izmena ce biti automatski sačuvana.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div className="w-full flex flex-col p-3 space-y-6">
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            <div className="grow overflow-y-auto">
              {FormComponent && (
                <FormComponent
                  partyData={partyData}
                  setPartyData={setPartyData}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <PartyEditorFooter
        currentStep={currentStep}
        setCurrentStep={setStep}
        isSaving={isSaving}
      />
    </div>
  );
}

export default PartyEditor;
