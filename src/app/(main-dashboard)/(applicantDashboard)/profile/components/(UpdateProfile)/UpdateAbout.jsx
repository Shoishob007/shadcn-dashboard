import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const UpdateAbout = () => {
  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">About Me</h2>
      <p className="text-sm text-gray-500 mb-8">
        The About is your opportunity to share your story, showcase your
        strengths, and highlight your professional journey.
      </p>
      <div>
        <textarea
          rows="10"
          placeholder="Write about yourself..."
          className="w-full border border-[#e5e5e5] rounded-md p-2"
        ></textarea>
        <div className="flex items-center justify-end mt-5">
          <Button type="submit" className="px-4 py-2">
            <span>
              <Check />
            </span>
            <span>Save</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpdateAbout;
