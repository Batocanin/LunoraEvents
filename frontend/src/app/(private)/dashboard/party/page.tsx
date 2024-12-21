import PartyList from "./components/PartyList";
import PartyCreateButton from "./components/PartyCreateButton";

async function page() {
  return (
    <div className="px-4 py-6">
      <PartyCreateButton />
      <PartyList />
    </div>
  );
}

export default page;
