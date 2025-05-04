
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema";

interface PhoneFieldProps {
  form: UseFormReturn<FormValues>;
}

export const PhoneField = ({ form }: PhoneFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>رقم التليفون</FormLabel>
          <FormControl>
            <Input placeholder="أدخل رقم التليفون" maxLength={11} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
