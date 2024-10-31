"use client"
import FormatTitle from "@/components/TitleFormatter";
import { usePathname } from "next/navigation";

const Profile = () => {
    const pathname = usePathname();
    const pageTitle = FormatTitle(pathname);
    
    return (
        <div>
             <PageTitle title={pageTitle} className={"pb-4 ml-2"} />
        </div>
    );
};

export default Profile;