import { Button } from "@/components/ui/button";
import useGetPartyCheckoutUrl from "../hooks/useGetPartyCheckoutUrl";
import { useEffect } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function PartyCreateDesignPricing({
  mutation,
  progress,
  setIsOpen,
}: {
  mutation: UseMutationResult<any, Error, { partyId: string }>;
  progress: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate, data, isSuccess, isPending, isError } =
    useGetPartyCheckoutUrl();

  useEffect(() => {
    window.createLemonSqueezy();

    window.LemonSqueezy.Setup({
      eventHandler(event) {
        if (event === "close") setIsOpen(true);
        if (event.event === "Checkout.Success") {
          setIsOpen(true);
          window.LemonSqueezy.Url.Close();
          mutation.mutate({
            partyId: event.data.order.meta.custom_data.party_id,
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      window.LemonSqueezy.Url.Open(data);
      setIsOpen(false);
    }
  }, [isSuccess]);

  if (mutation.isSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <h2 className="text-3xl">Vaša stranica je uspešno kreirana!</h2>
        <p className="text-primary/60">Možete zatvoriti stranicu.</p>
      </div>
    );
  }

  if (mutation.isPending) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <h2 className="text-3xl">Kreiranje vaše stranice je u toku...</h2>
        {progress < 80 ? (
          <p className="text-muted-foreground">
            Vaša stranica se trenutno kreira. Ovo može potrajati nekoliko
            trenutaka, pa vas molimo za strpljenje.
          </p>
        ) : (
          <p className="text-muted-foreground">
            Vaše slike se trenutno postavljaju i obrađuju.
          </p>
        )}
        <p className="text-primary/60">
          Ne zatvarajte ovu stranicu dok proces nije završen.
        </p>
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          className="lemonsqueezy-button"
          disabled={isPending}
          onClick={() => mutate({ productId: "644675" })}
        >
          Free
        </Button>
        <Button
          className="lemonsqueezy-button"
          disabled={isPending}
          onClick={() => mutate({ productId: "643689" })}
        >
          Pro
        </Button>
        <Button
          className="lemonsqueezy-button"
          disabled={isPending}
          onClick={() => mutate({ productId: "644676" })}
        >
          Pro Plus
        </Button>
      </div>
    </>
  );
}

export default PartyCreateDesignPricing;
