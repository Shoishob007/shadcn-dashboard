"use client";

import ApplicantsData from "../../applicants/view/page";
import GeneralSettings from "../(all components)/general/page";
import ProfileSettings from "../(all components)/profile/page";
import PasswordSettings from "../(all components)/password/page";
import SocialSettings from "../(all components)/social/page";
import BranchSettings from "../(all components)/branches/page";
import DeleteAccount from "../(all components)/delete/page";

const SettingsContainer = ({ currentPath }) => {
  const renderContent = () => {
    switch (currentPath) {
      case "/profile-settings":
        return <GeneralSettings />;
      case "/profile-settings/profile":
        return <ProfileSettings />;
      case "/profile-settings/password":
        return <PasswordSettings />;
      case "/profile-settings/social":
        return <SocialSettings />;
      case "/applicants/view":
        return <ApplicantsData />;
      case "/profile-settings/branches":
        return <BranchSettings />;
      case "/profile-settings/delete":
        return <DeleteAccount />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {renderContent()}
    </div>
  );
};

export default SettingsContainer;
