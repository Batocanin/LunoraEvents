import React, { useState } from "react";
import { PartyInfoValues, PartyValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { Party } from "@/lib/types";
import ApperanceEditDesignForm from "./ApperanceEditDesignForm";
import ApperanceEditDesignPreview from "./ApperanceEditDesignPreview";

export interface PartyPropsForm {
  form: ReturnType<typeof useForm<PartyInfoValues>>;
  formData: Party;
  setFormData: React.Dispatch<React.SetStateAction<PartyValues>>;
}

function ApperanceEditDesignEditor({
  form,
  formData,
  setFormData,
}: PartyPropsForm) {
  const [mainPhotoUrl, setMainPhotoUrl] = useState<string>();
  const [backgroundPhotoUrl, setBackgroundPhotoUrl] = useState<string>();
  return (
    <div className="overflow-y-auto h-full space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semiboold">Dizajn stranice za proslavu</h2>
        <p className="text-sm text-muted-foreground">
          Stranica ce biti prikazana kada korisnik skenira QR kod
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <ApperanceEditDesignForm
          form={form}
          formData={formData}
          setFormData={setFormData}
          setMainPhotoUrl={setMainPhotoUrl}
          setBackgroundPhotoUrl={setBackgroundPhotoUrl}
        />
        <ApperanceEditDesignPreview
          partyData={formData}
          backgroundPhotoUrl={backgroundPhotoUrl}
          mainPhotoUrl={mainPhotoUrl}
        />
      </div>
    </div>
  );
}

export default ApperanceEditDesignEditor;
