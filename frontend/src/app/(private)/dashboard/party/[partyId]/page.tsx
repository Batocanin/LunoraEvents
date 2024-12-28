"use client";

import { Home, Image, Loader2, Settings, X } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import useGetParty from "../hooks/useGetParty";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { settingsSteps } from "../shared/utils/steps";
import PartySettingsFreePlanAlert from "../shared/components/PartySettingsFreePlanAlert";
import { Button } from "@/components/ui/button";

function Page() {
  const { partyId } = useParams();
  const searchParams = useSearchParams();
  const {
    data: partyData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetParty(partyId);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        {error.response?.data.successMessage}
      </div>
    );
  }

  if (!partyData) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <div>
          <p>
            Dogodila se greska prilikom ucitavanja podataka, pokušajte ponovo
            kasnije ili nas kontaktirajte.
          </p>
          <Button onClick={refetch}>Pokušajte ponovo</Button>
        </div>
      </div>
    );
  }

  const currentStepKey = searchParams.get("settings") || settingsSteps[0].key;
  const currentStep = settingsSteps.find((step) => step.key === currentStepKey);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (key === currentStepKey) return;
    newSearchParams.set("settings", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = currentStep?.component || settingsSteps[0].component;

  console.log(partyData.plan.variantId);
  return (
    <>
      {partyData.plan.variantId === 644675 && <PartySettingsFreePlanAlert />}
      <div className="px-4 py-6">
        <Tabs defaultValue={currentStepKey}>
          <div className="grid justify-center">
            <TabsList className="flex items-center justify-center flex-wrap h-auto gap-y-3 sm:gap-y-0 bg-primary text-primary-foreground drop-shadow-lg">
              <TabsTrigger
                value=""
                data-state={currentStepKey === "" ? "active" : "inactive"}
                className="flex items-center gap-1 px-4 py-2"
                onClick={() =>
                  window.history.replaceState(null, "", location.pathname)
                }
              >
                <Home className="size-4" /> Početna
              </TabsTrigger>
              <TabsTrigger
                value="media"
                data-state={currentStepKey === "media" ? "active" : "inactive"}
                className="flex items-center gap-1 px-4 py-2"
                onClick={() => setStep("media")}
              >
                <Image className="size-4" /> Slike & Snimci
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                data-state={
                  currentStepKey === "settings" ? "active" : "inactive"
                }
                className="flex items-center gap-1 px-4 py-2"
                onClick={() => setStep("settings")}
              >
                <Settings className="size-4" /> Podešavanja
              </TabsTrigger>
            </TabsList>
          </div>
          {FormComponent && <FormComponent partyData={partyData} />}
        </Tabs>
      </div>
    </>
  );
}

export default Page;
