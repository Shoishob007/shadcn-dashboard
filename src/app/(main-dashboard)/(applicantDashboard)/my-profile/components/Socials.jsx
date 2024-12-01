import { Dribbble, Facebook, Linkedin, Youtube } from "lucide-react";
import Link from "next/link";

export default function Socials() {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "/franklin.jr123",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "/franklin.jr123",
      bgColor: "bg-blue-200",
      textColor: "text-blue-800",
    },
    {
      name: "Dribbble",
      icon: Dribbble,
      url: "/franklin.jr123",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "/franklin.jr123",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-md bg-white dark:bg-gray-800 p-6">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Socials
      </h1>
      <div className="space-y-4">
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`flex items-center p-3 rounded-lg ${link.bgColor} hover:shadow-lg transition-all`}
          >
            <span
              className={`w-10 h-10 flex items-center justify-center rounded-full ${link.textColor}`}
            >
              <link.icon size={20} />
            </span>
            <span className="ml-3 font-medium text-gray-700 dark:text-gray-300">
              {link.url}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
