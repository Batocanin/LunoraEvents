import { PartyPopper } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import PartyEditor from "./PartyEditor";
import { getPartiesById } from "../actions";

async function page() {
  try {
    const {
      data: { data },
    } = await getPartiesById();

    return (
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mx-auto w-fit flex gap-2">
              <PartyPopper />
              Kreiraj proslavu
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[95%] h-full max-h-[95%]">
            <VisuallyHidden.Root>
              <DialogTitle />
            </VisuallyHidden.Root>
            <PartyEditor />
          </DialogContent>
        </Dialog>
        <div className="flex flex-col">
          {data.map((party) => party.mainPhotoUrl)}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}

export default page;
