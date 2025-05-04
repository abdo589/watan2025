
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormValues } from "../schema";
import { NameField } from "./NameField";
import { NationalIdField } from "./NationalIdField";
import { PhoneField } from "./PhoneField";
import { GenderField } from "./GenderField";
import { PositionField } from "./PositionField";
import { UseFormReturn } from "react-hook-form";

interface RegistrationFormCardProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
}

export const RegistrationFormCard = ({ form, onSubmit }: RegistrationFormCardProps) => {
  return (
    <Card className="max-w-md w-full mx-auto shadow-lg border-party-blue border-t-4">
      <CardHeader className="bg-gradient-to-r from-party-blue to-party-lightblue text-white">
        <CardTitle className="text-center text-xl">تسجيل بيانات عضو جديد</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right" dir="rtl">
            <NameField form={form} />
            <NationalIdField form={form} />
            <PhoneField form={form} />
            <GenderField form={form} />
            <PositionField form={form} />
            
            <CardFooter className="px-0 pt-6 flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                className="w-full bg-party-blue hover:bg-party-darkblue btn-shine text-base"
              >
                تسجيل البيانات
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
