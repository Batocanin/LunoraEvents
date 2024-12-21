import { useCookie } from "@/app/CookiesProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { AxiosInstance } from "@/lib/axios";
import { fileReplacer } from "@/lib/utils";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function useAutoSaveParty2(partyData: PartyValues) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const debouncePartyData = useDebounce(partyData, 1500);

  const [partyId, setPartyId] = useState(partyData.id);
  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(partyData)
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const newData = structuredClone(debouncePartyData);

      const formData = new FormData();
      Object.entries(newData).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });

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

      const {
        data: { data },
      } = await AxiosInstance.post("/party/saveParty", formData, {
        withCredentials: true,
      });

      setPartyId(data.id);
      setLastSavedData(newData);

      return data;
    },
    onMutate: () => {},
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["partyList"],
        (old: PartyValues[] | undefined) => {
          if (old) {
            const existingIndex = old.findIndex(
              (party) => party.id === data.id
            );
            if (existingIndex !== -1) {
              const updatedList = [...old];
              updatedList[existingIndex] = data;
              return updatedList;
            } else {
              return [...old, data];
            }
          }
          return [data];
        }
      );
      if (searchParams.get("partyId") !== data.id) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("partyId", data.id);
        window.history.replaceState(null, "", `?${newSearchParams.toString()}`);
      }
    },
    onError: (error) => {
      console.log(error);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Izmene nisu sacuvane.</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate();
              }}
            >
              Retry
            </Button>
          </div>
        ),
      });
    },
  });

  useEffect(() => {
    const hasUnsavedChanges =
      JSON.stringify(debouncePartyData) !== JSON.stringify(lastSavedData);

    if (
      hasUnsavedChanges &&
      debouncePartyData &&
      !mutation.isError &&
      !mutation.isPending
    ) {
      mutation.mutate();
    }
  }, [debouncePartyData, lastSavedData, mutation]);

  return {
    isSaving: mutation.isPending,
    hasUnsavedChanges:
      JSON.stringify(partyData) !== JSON.stringify(debouncePartyData),
  };
}

export default useAutoSaveParty2;
