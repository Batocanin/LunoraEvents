"use server";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EllipsisVertical, Folder, Image, Video } from "lucide-react";

async function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Početna</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-3">
              <CardTitle>Slike</CardTitle>
              <Image stroke="#22c55e" />
            </CardHeader>
            <CardContent className="space-y-1">
              <h2 className="text-2xl font-bold">1390</h2>
              <p className="text-xs text-secondary">2.1 GB iskorišćeno</p>
              <div className="space-y-0.5">
                <Progress value={33} />
                <p className="text-xs text-secondary">35% memorije zauzeto</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between px-6 pt-6 pb-3">
              <CardTitle>Snimci</CardTitle>
              <Video stroke="#f43f5e" />
            </CardHeader>
            <CardContent className="space-y-1">
              <h2 className="text-2xl font-bold">501</h2>
              <p className="text-xs text-secondary">7.5 GB iskorišćeno</p>
              <div className="space-y-0.5">
                <Progress value={89} />
                <p className="text-xs text-secondary">89% memorije zauzeto</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row justify-between pt-6 pb-2">
                <div className="flex items-center gap-1">
                  <Folder stroke="#eab308" />
                  <CardTitle>Slike</CardTitle>
                </div>
                <EllipsisVertical className="size-4" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary">180 slika</p>
              </CardContent>
              <CardFooter>
                <p className="mt-auto text-sm text-secondary">
                  Ažuirano: pre 2 dana
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row justify-between pt-6 pb-2">
                <div className="flex items-center gap-1">
                  <Folder stroke="#eab308" />
                  <CardTitle>Snimci</CardTitle>
                </div>
                <EllipsisVertical className="size-4" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary">20 snimaka</p>
              </CardContent>
              <CardFooter>
                <p className="mt-auto text-sm text-secondary">
                  Ažuirano: pre 4 dana
                </p>
              </CardFooter>
            </Card>
          </div>
          <Card>
            <CardHeader className="flex justify-between px-6 pt-6 pb-3">
              <CardTitle className="text-xl font-base">
                Zauzeto prostora
              </CardTitle>
              <p className="text-xs text-secondary">Ukupno dostupno prostora</p>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <p>1.8 iskorisceno</p>
                <p>3 GB ukupno</p>
              </div>
              <Progress value={89} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default page;
