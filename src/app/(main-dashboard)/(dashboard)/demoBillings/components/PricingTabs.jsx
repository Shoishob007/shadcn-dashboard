import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingCards from "../pricing/page";
import BillingTable from "../billing-table/page";
import Payment from "../payment/page.jsx";
import MyPackage from "../myPackage/page.jsx";


// import Skills from "./Skills";

const PricingTabs = () => {
  return (
    <div>
      <Tabs defaultValue="my_package" className="px-5 py-2">
        <TabsList className="bg-transparent">
          <TabsTrigger className="data-[state=active]:!border-b-2 data-[state=active]:!border-b-gray-900 data-[state=active]:!text-gray-900 dark:data-[state=active]:!border-b-gray-200 dark:data-[state=active]:!text-gray-200" value="my_package">
            Current Package
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="billing-table">
            Purchase History
          </TabsTrigger>
          <TabsTrigger className="ml-8" value="payment-method">
            Payment Method
          </TabsTrigger>
        </TabsList>

        {/* Tabs content */}
        <div className="mt-6 w-full">
          <TabsContent value="my_package">
            <MyPackage />
          </TabsContent>
          <TabsContent value="billing-table">
            <BillingTable />
          </TabsContent>
          <TabsContent value="payment-method">
            <Payment />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PricingTabs;
