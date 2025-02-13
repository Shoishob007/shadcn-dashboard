import Image from "next/image";
import developer from "../../../public/assests/developer.png";

const DeveloperMessage = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-3">
      <Image src={developer} alt="Developer" width={560} />
      <div>
        <h1 className="text-3xl font-semibold mb-1 text-center">
          Coming Soon!
        </h1>
        <p className=" mb-3 ">
          Shh… the developer is coding magic into this page. Don&apos;t disturb, or
          it might turn into a potato!
        </p>
      </div>
    </div>
  );
};

export default DeveloperMessage;
