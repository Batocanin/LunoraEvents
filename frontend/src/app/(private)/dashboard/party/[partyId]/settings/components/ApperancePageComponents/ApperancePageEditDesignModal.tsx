"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { PartyInfoSchema, PartyInfoValues } from "@/lib/validation";
import { editPartySteps } from "../../../../steps";
import Breadcrumbs from "../../../../Breadcrumbs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Party } from "@/lib/types";
import { UseMutationResult } from "@tanstack/react-query";
import ApperancePageEditDesignFooter from "./ApperancePageEditDesignFooter";

interface ApperancePageEditDesignModal {
  formData: Party;
  setFormData: React.Dispatch<React.SetStateAction<Party>>;
  mutation: UseMutationResult<any, Error, void>;
  progress: number;
}

function ApperancePageEditDesignModal({
  formData,
  setFormData,
  mutation,
  progress,
}: ApperancePageEditDesignModal) {
  const searchParams = useSearchParams();
  const form = useForm<PartyInfoValues>({
    resolver: zodResolver(PartyInfoSchema),
    defaultValues: {
      title: formData.title || "",
      dateEndTime: formData.dateEndTime || "",
      message: formData.message || "",
      mainPhoto: formData.mainPhoto || undefined,
      backgroundPhoto: formData.backgroundPhoto || undefined,
    },
  });

  const currentStep = searchParams.get("step") || editPartySteps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent =
    editPartySteps.find((step) => step.key === currentStep)?.component ||
    editPartySteps[0].component;

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
            {editPartySteps.length > 1 && (
              <Breadcrumbs
                currentStep={currentStep}
                setCurrentStep={setStep}
                steps={editPartySteps}
              />
            )}
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
      <ApperancePageEditDesignFooter
        form={form}
        mutation={mutation}
        currentStep={currentStep}
        setCurrentStep={setStep}
        progress={progress}
      />
    </div>
  );
}

export default ApperancePageEditDesignModal;
