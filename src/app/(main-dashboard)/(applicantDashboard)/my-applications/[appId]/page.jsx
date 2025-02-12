
const MyAppDetails = async ({ params }) => {
  const { appId } = params;
  console.log("My app Id: ", appId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications/${appId}`
  );
  const data = await response.json();
  console.log("Application details data:: ", data);

  return (
    <div>
      <h1>My app details</h1>
    </div>
  );
};

export default MyAppDetails;
