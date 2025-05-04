
import { z } from "zod";

// Define validation schema using Zod
export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;
