import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function LocationTab({ form }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const contactInfo = form.getValues("contactInfo");
  // console.log(contactInfo)

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Address</FormLabel>
              <FormControl className="dark:border-gray-400 ">
                <Input {...field} placeholder="Full address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {" "}
        {/* Use grid for two columns */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl className="dark:border-gray-400 ">
                <Input
                  type="email"
                  {...field}
                  placeholder="contact@company.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <PhoneInput
                  country="bd"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  containerStyle={{
                    width: "100%",
                  }}
                  inputStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    width: "100%",
                  }}
                  buttonStyle={{
                    width: "45px",
                    height: "35px",
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="contactInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Contact Information</FormLabel>
            <FormControl>
              <ReactQuill
                value={field.value || contactInfo}
                onChange={(value) => field.onChange(stripHtml(value))}
                modules={modules}
                theme="snow"
                placeholder="Additional contact info..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
