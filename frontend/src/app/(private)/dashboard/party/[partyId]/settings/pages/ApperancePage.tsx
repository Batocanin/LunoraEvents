import { Party } from "@/lib/types";
import ApperancePageEditButton from "../components/ApperancePageComponents/ApperancePageEditButton";

function ApperancePage({ partyData }: { partyData: Party }) {
  return <ApperancePageEditButton partyData={partyData} />;
}

export default ApperancePage;
