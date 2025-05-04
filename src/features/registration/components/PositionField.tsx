
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../schema";
import { Button } from "@/components/ui/button";
import { positions } from "../constants";

interface PositionFieldProps {
  form: UseFormReturn<FormValues>;
}

export const PositionField = ({ form }: PositionFieldProps) => {
  const [customPosition, setCustomPosition] = useState(false);
  
  return (
    <FormField
      control={form.control}
      name="position"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الصفة</FormLabel>
          <div className="flex items-center gap-2 mb-2">
            <Button
              type="button"
              variant={customPosition ? "outline" : "default"}
              size="sm"
              className="text-xs"
              onClick={() => setCustomPosition(false)}
            >
              من القائمة
            </Button>
            <Button
              type="button"
              variant={customPosition ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => setCustomPosition(true)}
            >
              إدخال يدوي
            </Button>
          </div>
          <FormControl>
            {customPosition ? (
              <Input placeholder="أدخل الصفة" {...field} />
            ) : (
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصفة" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
