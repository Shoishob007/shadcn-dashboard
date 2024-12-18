import Image from "next/image";
import developer from "../../../public/assests/developer.png";

const DeveloperMessage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <Image src={developer} alt="Developer" width={560} />
      <div>
        <h2 className="font-semibold my-3 text-xl">
          Shh… the developer is coding magic into this page. Don't disturb, or
          it might turn into a potato!
        </h2>
      </div>
    </div>
  );
};

export default DeveloperMessage;
