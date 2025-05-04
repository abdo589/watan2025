
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema";

interface NameFieldProps {
  form: UseFormReturn<FormValues>;
}

export const NameField = ({ form }: NameFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الاسم</FormLabel>
          <FormControl>
            <Input placeholder="أدخل الاسم بالكامل" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
