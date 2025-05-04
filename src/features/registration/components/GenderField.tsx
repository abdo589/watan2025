
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema";

interface GenderFieldProps {
  form: UseFormReturn<FormValues>;
}

export const GenderField = ({ form }: GenderFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>النوع</FormLabel>
          <FormControl>
            <RadioGroup
              className="flex gap-6"
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormItem className="flex items-center space-x-2 space-x-reverse">
                <FormControl>
                  <RadioGroupItem value="male" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">ذكر</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2 space-x-reverse">
                <FormControl>
                  <RadioGroupItem value="female" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">أنثى</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
