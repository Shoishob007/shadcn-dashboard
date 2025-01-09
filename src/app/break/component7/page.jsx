import EditPopup from "./components/EditPopup";

const EditProfile = () => {
  return (
    <div>
      <h1>Edit your profile</h1>
      <div className="overflow-y-auto">
      <EditPopup />
      </div>
    </div>
  );
};

export default EditProfile;
