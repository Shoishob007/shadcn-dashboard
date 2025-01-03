"use client";

import DatePicker from "./components/DatePicker";
import DatePickerComponent from "./components/DatePickerComponent";

const DemoProfilePage = () => {
  // const [profileImage, setProfileImage] = useState("");
  // useEffect(() => {
  //   const getImageData = async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/applicants`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //   getImageData();
  // }, []);
  return (
    <div>
      <h1>Demo Profile page</h1>
      <DatePickerComponent />

      {/* <DatePicker /> */}
    </div>
  );
};

export default DemoProfilePage;
