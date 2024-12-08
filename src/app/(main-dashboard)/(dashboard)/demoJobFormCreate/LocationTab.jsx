import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function LocationTab({ form }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl className="dark:border-gray-300 ">
                <Input {...field} placeholder="Full address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Use grid for two columns */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl className="dark:border-gray-300 ">
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
            <FormControl className="dark:border-gray-300 ">
              <Textarea
                {...field}
                placeholder="Any additional contact details..."
                className="min-h-[80px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

