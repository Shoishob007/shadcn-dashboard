"use client";
import PageTitle from "@/components/PageTitle";
import FormatTitle from "@/components/TitleFormatter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Briefcase, DollarSign } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BranchSettings() {
  const stats = [
    {
      title: "Total Employees",
      value: "234",
      icon: Users,
      change: "+12.5%",
      description: "from last month",
    },
    {
      title: "Departments",
      value: "12",
      icon: Building2,
      change: "+2",
      description: "new this quarter",
    },
    {
      title: "Active Projects",
      value: "45",
      icon: Briefcase,
      change: "+5",
      description: "from last week",
    },
    {
      title: "Revenue",
      value: "$2.4M",
      icon: DollarSign,
      change: "+18.2%",
      description: "from last quarter",
    },
  ];

  const pathname = usePathname();
  const pageTitle = FormatTitle(pathname);

  return (
    <>
      <div className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight dark:text-gray-200">
            Branch Information
          </h2>
          <p className="text-sm text-muted-foreground">
            Overview of your organizations statistics and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">{stat.change}</span>{" "}
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
