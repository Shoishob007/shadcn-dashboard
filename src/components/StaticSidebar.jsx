// StaticSidebar.js
import Image from 'next/image';
import Link from 'next/link';

export default function StaticSidebar() {
  return (
    <div className="items-center text-center sm:mx-auto mb-4">
      <Link href={"/"}>
        <Image
          src="/assests/Hirehub_Logo.png"
          alt="Logo"
          width={120}
          height={120}
          className={`rounded-lg items-center text-center inline`}
        />
      </Link>
    </div>
  );
}
