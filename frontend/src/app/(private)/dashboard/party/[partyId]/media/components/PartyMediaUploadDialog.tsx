import { Button } from "@/components/ui/button";
import { CircleCheck, ImageUp, Loader2, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { FilesToUploadGallery, Party } from "@/lib/types";
import { nanoid } from "nanoid";
import useUploadPartyMedia from "../hooks/useUploadMediaMutation";
import PartyMediaZipDialog from "./PartyMediaZipDialog";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";
import PartyMediaDeleteButton from "./PartyMediaDeleteButton";

function PartyMediaUploadDialog({ partyData }: { partyData: Party }) {
  const [zipDialogOpen, setIsZipDialogOpen] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  const uploadMutation = useUploadPartyMedia(partyData, setProgressMap);

  const queryClient = useQueryClient();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithIds = acceptedFiles.map((file) => ({
      id: nanoid(4),
      file,
      previewUrl: file.type.includes("image") && URL.createObjectURL(file),
      serverUrl: null,
      progress: 0,
      status: "uploading",
    }));

    handleMutationOptimisticallyUpdate<FilesToUploadGallery[]>(
      queryClient,
      ["adminUploads"],
      (oldUploads = []) => [
        ...oldUploads,
        ...filesWithIds.map((file) => ({
          ...file,
          previewUrl: file.previewUrl || "",
          status: file.status as "uploading",
        })),
      ]
    );

    filesWithIds.map(({ file, id }) => {
      uploadMutation.mutate({ file, id });
    });
  }, []);

  const uploadedFiles: FilesToUploadGallery[] =
    queryClient.getQueryData(["adminUploads"]) || [];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
    },
  });
  return (
    <div className="flex items-center flex-wrap gap-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Upload /> Upload slike ili snimke
          </Button>
        </DialogTrigger>
        <DialogContent className="flex items-center justify-center w-full max-w-[95%] h-[95%]">
          <div className="flex justify-center h-full flex-col space-y-3">
            <DialogHeader>
              <VisuallyHidden>
                <DialogTitle />
              </VisuallyHidden>
            </DialogHeader>
            <div
              {...getRootProps()}
              className={cn(
                "flex items-center flex-col text-center  gap-3 border-2 border-dotted py-6 px-2 md:px-12 cursor-pointer",
                isDragActive && "bg-primary-foreground"
              )}
            >
              <input {...getInputProps()} />
              <ImageUp className="size-12 stroke-primary" />
              <div className="space-y-2">
                <h2 className="font-medium">
                  Drag & Drop slike ili snimke za upload
                </h2>
                <p className="text-sm text-muted-foreground/90">
                  Kliknite da bi ste selektovali snimke ili slike za upload
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Broj dostupnih slika ili snimka za upload: 97 od 500
                </p>
              </div>
            </div>
            <ScrollArea className="grow rounded-md max-h-[60vh] p-2">
              <div className="space-y-3">
                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((uploadedFile) => (
                    <div
                      key={uploadedFile.id}
                      className="flex items-center gap-4 border border-muted-foreground/30 p-2 rounded-lg"
                    >
                      {uploadedFile.previewUrl && (
                        <div className="relative h-20 aspect-square">
                          <Image
                            className="object-cover rounded-lg border border-white"
                            src={uploadedFile.previewUrl}
                            alt=""
                            fill
                          />
                        </div>
                      )}
                      <div className="space-y-3 py-2 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-sm break-all text-muted-foreground">
                            {uploadedFile.file.name}
                          </h3>
                          {uploadedFile.status === "completed" && (
                            <PartyMediaDeleteButton
                              partyId={partyData.id}
                              url={uploadedFile.serverUrl}
                              mediaId={uploadedFile.id}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={progressMap[uploadedFile.id]}
                            className="w-[90%]"
                            indicatorClassName={
                              uploadedFile.status === "completed"
                                ? "bg-green-400"
                                : ""
                            }
                          />
                          {progressMap[uploadedFile.id] === 100 &&
                          uploadedFile.status !== "completed" ? (
                            <Loader2 className="animate-spin size-4 ml-2 stroke-primary" />
                          ) : uploadedFile.status === "completed" ? (
                            <CircleCheck className="stroke-green-400 size-6 ml-2" />
                          ) : (
                            <span className="text-sm">
                              {progressMap[uploadedFile.id]}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
      <PartyMediaZipDialog
        partyId={partyData.id}
        zipDialogOpen={zipDialogOpen}
        setIsZipDialogOpen={setIsZipDialogOpen}
      />
    </div>
  );
}

export default PartyMediaUploadDialog;
