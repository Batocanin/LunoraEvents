import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import { mediaSteps } from "../../../../shared/utils/steps";
import { Party } from "@/lib/types";

function PartyMediaTabs({ partyData }: { partyData: Party }) {
  const searchParams = useSearchParams();

  const currentStepKey = searchParams.get("mediaStatus") || mediaSteps[0].key;
  const currentStep = mediaSteps.find((step) => step.key === currentStepKey);

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    if (key === currentStepKey) return;
    newSearchParams.set("mediaStatus", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = currentStep?.component || mediaSteps[0].component;

  return (
    <div className="py-6">
      <Tabs defaultValue={currentStepKey}>
        <div className="grid justify-start">
          <TabsList className="flex h-auto flex-wrap gap-2">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:drop-shadow-lg"
              data-state={currentStepKey === "all" ? "active" : "inactive"}
              onClick={() => setStep("all")}
            >
              Sve
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:drop-shadow-lg"
              data-state={currentStepKey === "approved" ? "active" : "inactive"}
              onClick={() => setStep("approved")}
            >
              Objavljeno
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:drop-shadow-lg"
              data-state={currentStepKey === "pending" ? "active" : "inactive"}
              onClick={() => setStep("pending")}
            >
              Na čekanju
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:drop-shadow-lg"
              data-state={currentStepKey === "archived" ? "active" : "inactive"}
              onClick={() => setStep("archived")}
            >
              Arhivirano
            </TabsTrigger>
          </TabsList>
        </div>
        {FormComponent && <FormComponent partyData={partyData} />}
      </Tabs>
    </div>
  );
}

export default PartyMediaTabs;
