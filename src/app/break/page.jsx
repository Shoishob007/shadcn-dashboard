import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DraftPage = () => {
  return (
    <div className="flex items-center h-full w-full justify-center ">
      <Tabs defaultValue="account" className="w-[500px] border shadow-lg rounded-md bg-white p-10 space-y-8">
        <TabsList className='bg-gray-500 p-2 text-white'>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">This is a Overview content</TabsContent>
        <TabsContent value="skills">This is a Skills content.</TabsContent>
        <TabsContent value="projects">This is a projects content.</TabsContent>
        <TabsContent value="documents">This is a documents content.</TabsContent>
        <TabsContent value="activity">This is a an activity content.</TabsContent>
      </Tabs>
    </div>
  );
};

export default DraftPage;