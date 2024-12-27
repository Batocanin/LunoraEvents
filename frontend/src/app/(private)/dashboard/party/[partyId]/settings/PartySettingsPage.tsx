import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Party } from "@/lib/types";
import Apperance from "./Apperance/Apperance";
import GeneralSettings from "./GeneralSettings/GeneralSettings";
import AdminSettings from "./AdminSettings/AdminSettings";

function PartySettingsPage({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Podešavanja</h2>
      <Tabs defaultValue="settings">
        <TabsList className="flex flex-wrap h-auto gap-y-4 mt-2 w-fit">
          <TabsTrigger value="settings">Opšta podešavanja</TabsTrigger>
          <TabsTrigger value="" asChild>
            <Apperance partyData={partyData} />
          </TabsTrigger>
          <TabsTrigger value="administration">Administracija</TabsTrigger>
          <TabsTrigger value="sharing">Deljenje</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <GeneralSettings partyData={partyData} />
        </TabsContent>
        <TabsContent value="administration">
          <AdminSettings partyData={partyData} />
        </TabsContent>
        <TabsContent value="sharing">Sharing.</TabsContent>
      </Tabs>
    </div>
  );
}

export default PartySettingsPage;
