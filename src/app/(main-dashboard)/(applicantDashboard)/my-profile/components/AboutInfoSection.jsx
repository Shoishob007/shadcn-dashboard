import { Phone, Mail } from "lucide-react";

export default function AboutInfoSection() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
      {/* About Me Section */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
          Hi! I'm a passionate **Full Stack Developer** with 2 years of experience building dynamic, user-friendly web
          applications. I specialize in the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and enjoy solving
          complex problems through coding.
        </p>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact</h2>
        <div className="flex items-center mb-4">
          <Phone className="w-6 h-6 text-red-600" />
          <span className="ml-3 text-gray-700 font-medium">1234598765</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-6 h-6 text-red-600" />
          <span className="ml-3 text-gray-700 font-medium">demo@example.com</span>
        </div>
      </section>
    </div>
  );
}
