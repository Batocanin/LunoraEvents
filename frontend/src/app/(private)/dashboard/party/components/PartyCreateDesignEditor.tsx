"use client";

import { useState } from "react";
import PartyCreateDesignForm from "../forms/PartyCreateDesignForm";
import PartyCreateDesignPreview from "./PartyCreateDesignPreview";
import { PartyInfoValues, PartyValues } from "@/lib/validation";
import { useForm } from "react-hook-form";

export interface PartyPropsForm {
  form: ReturnType<typeof useForm<PartyInfoValues>>;
  formData: PartyValues;
  setFormData: React.Dispatch<React.SetStateAction<PartyValues>>;
}

function PartyCreateDesignEditor({
  formData,
  setFormData,
  form,
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
        <PartyCreateDesignForm
          form={form}
          formData={formData}
          setFormData={setFormData}
          setMainPhotoUrl={setMainPhotoUrl}
          setBackgroundPhotoUrl={setBackgroundPhotoUrl}
        />
        <PartyCreateDesignPreview
          formData={formData}
          backgroundPhotoUrl={backgroundPhotoUrl}
          mainPhotoUrl={mainPhotoUrl}
        />
      </div>
    </div>
  );
}

export default PartyCreateDesignEditor;
