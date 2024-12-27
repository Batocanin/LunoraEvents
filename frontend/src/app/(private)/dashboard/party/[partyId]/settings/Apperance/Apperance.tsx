import { Party } from "@/lib/types";
import ApperanceEditButton from "./components/ApperanceEditButton";

function Apperance({ partyData }: { partyData: Party }) {
  return <ApperanceEditButton partyData={partyData} />;
}

export default Apperance;
