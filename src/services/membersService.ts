
import { MemberData } from "../models/MemberData";

// هذا تخزين بسيط في الذاكرة حاليًا
// في تطبيق حقيقي، سيكون هناك اتصال بخدمة خلفية
const STORAGE_KEY = "watan_youth_members";

// التهيئة من التخزين المحلي - دائمًا تحديث من التخزين
export const getAllMembers = (): MemberData[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  let members: MemberData[] = [];
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      members = parsed.map((item: any) => ({
        ...item,
        timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
      }));
    } catch (error) {
      console.error("خطأ في تحليل الأعضاء المخزنين", error);
      members = [];
    }
  }
  
  return members;
};

// حفظ في التخزين المحلي
const saveToStorage = (members: MemberData[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
};

// إضافة عضو جديد
export const addMember = (member: Omit<MemberData, "id" | "timestamp">): MemberData => {
  const members = getAllMembers(); // دائمًا الحصول على أحدث البيانات
  
  const newMember: MemberData = {
    ...member,
    id: Date.now().toString(), // توليد بسيط للمعرّف
    timestamp: new Date()
  };
  
  const updatedMembers = [...members, newMember];
  saveToStorage(updatedMembers);
  
  return newMember;
};

// حذف عضو حسب المعرّف
export const deleteMember = (id: string): boolean => {
  const members = getAllMembers(); // دائمًا الحصول على أحدث البيانات
  
  const initialLength = members.length;
  const updatedMembers = members.filter(member => member.id !== id);
  
  if (updatedMembers.length !== initialLength) {
    saveToStorage(updatedMembers);
    return true;
  }
  
  return false;
};

// تصدير الأعضاء إلى تنسيق CSV
export const exportToCSV = (): string => {
  const members = getAllMembers(); // دائمًا الحصول على أحدث البيانات
  
  if (members.length === 0) {
    return "لا توجد بيانات للتصدير";
  }
  
  // رأس CSV
  let csv = "الاسم,الرقم القومي,رقم التليفون,النوع,الصفة,التاريخ\n";
  
  // إضافة صفوف
  members.forEach((member) => {
    const gender = member.gender === 'male' ? 'ذكر' : 'أنثى';
    const date = member.timestamp instanceof Date 
      ? member.timestamp.toLocaleDateString('ar-EG')
      : new Date().toLocaleDateString('ar-EG');
      
    csv += `"${member.name}","${member.nationalId}","${member.phone}","${gender}","${member.position}","${date}"\n`;
  });
  
  return csv;
};

// وظيفة لتنزيل ملف CSV
export const downloadCSV = (): void => {
  const csv = exportToCSV();
  const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' }); // إضافة BOM للترميز العربي الصحيح
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `بيانات_الأعضاء_${new Date().toLocaleDateString('ar-EG')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
