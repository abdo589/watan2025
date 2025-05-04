
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addMember } from "@/services/membersService";

// Define validation schema using Zod
const formSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يحتوي على الأقل 3 أحرف" }),
  nationalId: z.string()
    .regex(/^[0-9]{14}$/, { message: "الرقم القومي يجب أن يكون 14 رقم" }),
  phone: z.string()
    .regex(/^01[0125][0-9]{8}$/, { message: "رقم التليفون يجب أن يكون 11 رقم ويبدأ ب 01" }),
  gender: z.enum(["male", "female"], {
    required_error: "يرجى اختيار النوع",
  }),
  position: z.string().min(2, { message: "يرجى إدخال الصفة" }),
});

type FormValues = z.infer<typeof formSchema>;

const positions = [
  "عضو لجنة",
  "منسق شباب",
  "مسؤول لجنة",
  "أمين شباب",
  "أخرى"
];

const RegistrationForm = () => {
  const { toast } = useToast();
  const [customPosition, setCustomPosition] = useState(false);
  
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
      setCustomPosition(false);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "خطأ في التسجيل",
        description: "حدث خطأ أثناء تسجيل البيانات. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-md w-full mx-auto shadow-lg border-party-blue border-t-4">
      <CardHeader className="bg-gradient-to-r from-party-blue to-party-lightblue text-white">
        <CardTitle className="text-center text-xl">تسجيل بيانات عضو جديد</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right" dir="rtl">
            {/* Name Field */}
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
            
            {/* National ID Field */}
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
            
            {/* Phone Field */}
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
            
            {/* Gender Field */}
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
            
            {/* Position Field */}
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

export default RegistrationForm;
