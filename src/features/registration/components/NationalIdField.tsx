
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema";

interface NationalIdFieldProps {
  form: UseFormReturn<FormValues>;
}

export const NationalIdField = ({ form }: NationalIdFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="nationalId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الرقم القومي</FormLabel>
          <FormControl>
            <Input placeholder="أدخل الرقم القومي المكون من 14 رقم" maxLength={14} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
