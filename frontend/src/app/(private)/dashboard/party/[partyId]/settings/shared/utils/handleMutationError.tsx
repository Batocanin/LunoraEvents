import { Button } from "@/components/ui/button";
import { QueryClient } from "@tanstack/react-query";

export const handleMutationError = (
  toast: any,
  queryClient: QueryClient,
  queryKey: string[],
  previousData: any,
  retryFn: () => void
) => {
  queryClient.setQueryData(queryKey, previousData);

  const { dismiss } = toast({
    variant: "destructive",
    description: (
      <div className="space-y-3">
        <p>Dogodila se greška! Podešavanja nisu izmenjena.</p>
        <Button
          variant="secondary"
          onClick={() => {
            dismiss();
            retryFn();
          }}
        >
          Retry
        </Button>
      </div>
    ),
  });
};
