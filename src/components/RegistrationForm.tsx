
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useState } from "react";
import { FormValues, formSchema } from "@/features/registration/schema";
import { addMember } from "@/services/membersService";
import { RegistrationFormCard } from "@/features/registration/components/RegistrationFormCard";

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with zod resolver
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nationalId: "",
      phone: "",
      gender: undefined,
      position: "",
    },
  });

  // Form submission handler
  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Make sure gender is defined (typescript check)
      if (!values.gender) {
        throw new Error("يرجى اختيار النوع");
      }

      // Add member to our service/database
      addMember({
        name: values.name,
        nationalId: values.nationalId,
        phone: values.phone,
        gender: values.gender,
        position: values.position
      });

      // Reset form after successful submission
      form.reset();

      // Show success message
      toast.success("تم تسجيل البيانات بنجاح!", {
        description: "شكراً لك على التسجيل"
      });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("حدث خطأ أثناء تسجيل البيانات", {
        description: "يرجى المحاولة مرة أخرى"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegistrationFormCard form={form} onSubmit={onSubmit} />
  );
};

export default RegistrationForm;
