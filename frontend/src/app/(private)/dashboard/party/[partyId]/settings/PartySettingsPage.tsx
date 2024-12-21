import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Party } from "@/lib/types";
import ApperancePage from "./pages/ApperancePage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import GeneralSettingsPage from "./pages/GeneralSettingsPage";

function PartySettingsPage({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Podešavanja</h2>
      <Tabs defaultValue="settings">
        <TabsList className="flex flex-wrap h-auto gap-y-4 mt-2 w-fit">
          <TabsTrigger value="settings">Opšta podešavanja</TabsTrigger>
          <TabsTrigger value="" asChild>
            <ApperancePage partyData={partyData} />
          </TabsTrigger>
          <TabsTrigger value="administration">Administracija</TabsTrigger>
          <TabsTrigger value="sharing">Deljenje</TabsTrigger>
        </TabsList>
        <TabsContent value="settings">
          <GeneralSettingsPage partyData={partyData} />
        </TabsContent>
        <TabsContent value="administration">
          <AdminSettingsPage partyData={partyData} />
        </TabsContent>
        <TabsContent value="sharing">Sharing.</TabsContent>
      </Tabs>
    </div>
  );
}

export default PartySettingsPage;
