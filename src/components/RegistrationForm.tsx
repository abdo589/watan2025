
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMember } from "@/services/membersService";
import { formSchema, FormValues } from "@/features/registration/schema";
import { RegistrationFormCard } from "@/features/registration/components/RegistrationFormCard";

const RegistrationForm = () => {
  const { toast } = useToast();
  
  // Initialize the form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nationalId: "",
      phone: "",
      gender: "male",
      position: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    try {
      // Add the member to our service
      addMember(values);
      
      // Show success message
      toast({
        title: "تم التسجيل بنجاح",
        description: "تم حفظ بيانات العضو",
        variant: "default",
      });
      
      // Reset the form
      form.reset();
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "خطأ في التسجيل",
        description: "حدث خطأ أثناء تسجيل البيانات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return <RegistrationFormCard form={form} onSubmit={onSubmit} />;
};

export default RegistrationForm;
