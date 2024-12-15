const BasicDetails = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
