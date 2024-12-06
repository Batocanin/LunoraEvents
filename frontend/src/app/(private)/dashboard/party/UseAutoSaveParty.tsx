import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { AxiosInstance } from "@/lib/axios";
import { fileReplacer } from "@/lib/utils";
import { PartyValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UseAutoSaveParty(partyData: PartyValues) {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const debouncePartyData = useDebounce(partyData, 1500);

  const [partyId, setPartyId] = useState(partyData.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(partyData)
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, []);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncePartyData);

        const formData = new FormData();
        Object.entries(newData).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });

        console.log(debouncePartyData);
        console.log(newData);

        if (
          newData.mainPhoto &&
          JSON.stringify(lastSavedData.mainPhoto, fileReplacer) !==
            JSON.stringify(newData.mainPhoto, fileReplacer)
        ) {
          formData.append("mainPhoto", newData.mainPhoto as File);
        }

        if (
          newData.backgroundPhoto &&
          JSON.stringify(lastSavedData.backgroundPhoto, fileReplacer) !==
            JSON.stringify(newData.backgroundPhoto, fileReplacer)
        ) {
          formData.append("backgroundPhoto", newData.backgroundPhoto as File);
        }

        if (partyId) {
          formData.append("id", partyId.toString());
        }

        const {
          data: { data },
        } = await AxiosInstance.post("/party/saveParty", formData, {
          withCredentials: true,
        });

        setPartyId(data.id);
        setLastSavedData(newData);

        if (searchParams.get("partyId") !== data.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("partyId", data.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`
          );
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Dogodila se greska! Izmene nisu sacuvane.</p>
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncePartyData, fileReplacer) !==
      JSON.stringify(lastSavedData, fileReplacer);

    if (hasUnsavedChanges && debouncePartyData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncePartyData,
    isSaving,
    lastSavedData,
    isError,
    partyId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(partyData) !== JSON.stringify(lastSavedData),
  };
}

export default UseAutoSaveParty;
