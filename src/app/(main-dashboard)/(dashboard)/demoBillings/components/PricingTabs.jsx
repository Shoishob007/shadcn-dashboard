import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCards from "../pricing/page";
import BillingTable from "../billing-table/page";

// import Skills from "./Skills";

const PricingTabs = () => {
  return (
    <div>
      <Tabs defaultValue="pricing" className="">
        <TabsList className="bg-transparent">
          <TabsTrigger className="" value="pricing">
            My Pricing
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="billing-table">
            Packages
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="pricing">
            <PricingCards />
          </TabsContent>
          <TabsContent value="billing-table">
            <BillingTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PricingTabs;
