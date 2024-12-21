"use client";

import { useSearchParams } from "next/navigation";
import { createPartySteps } from "../steps";
import Breadcrumbs from "../Breadcrumbs";
import PartyCreateDesignFooter from "./PartyCreateDesignFooter";
import {
  PartyInfoSchema,
  PartyInfoValues,
  PartyValues,
} from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";

interface PartyCreateDesignModal {
  formData: PartyValues;
  setFormData: React.Dispatch<React.SetStateAction<PartyValues>>;
  mutation: UseMutationResult<any, Error, void>;
  progress: number;
}

function PartyCreateDesignModal({
  formData,
  setFormData,
  mutation,
  progress,
}: PartyCreateDesignModal) {
  const form = useForm<PartyInfoValues>({
    resolver: zodResolver(PartyInfoSchema),
    defaultValues: {
      title: formData?.title || "",
      dateEndTime: undefined,
      message: formData?.message || "",
      mainPhoto: formData?.mainPhoto || undefined,
      backgroundPhoto: formData?.backgroundPhoto || undefined,
    },
  });

  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || createPartySteps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent =
    createPartySteps.find((step) => step.key === currentStep)?.component ||
    createPartySteps[0].component;

  return (
    <div className="flex grow flex-col">
      <header className="hidden sm:block space-y-1.5 border-b px-3 pb-3 text-center">
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
            <Breadcrumbs
              currentStep={currentStep}
              setCurrentStep={setStep}
              steps={createPartySteps}
            />
            <div className="grow overflow-y-auto">
              {FormComponent && (
                <FormComponent
                  formData={formData}
                  setFormData={setFormData}
                  form={form}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <PartyCreateDesignFooter
        form={form}
        currentStep={currentStep}
        setCurrentStep={setStep}
        mutation={mutation}
        progress={progress}
      />
    </div>
  );
}

export default PartyCreateDesignModal;
