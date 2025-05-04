
import { MemberData } from "../models/MemberData";

// This is a simple in-memory storage for now
// In a real application, this would connect to a backend service
let members: MemberData[] = [];
const STORAGE_KEY = "watan_youth_members";

// Initialize from local storage
const initializeFromStorage = (): void => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      members = parsed.map((item: any) => ({
        ...item,
        timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
      }));
    } catch (error) {
      console.error("Failed to parse stored members", error);
      members = [];
    }
  }
};

// Save to local storage
const saveToStorage = (): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
};

// Get all members
export const getAllMembers = (): MemberData[] => {
  initializeFromStorage();
  return [...members];
};

// Add a new member
export const addMember = (member: Omit<MemberData, "id" | "timestamp">): MemberData => {
  initializeFromStorage();
  
  const newMember: MemberData = {
    ...member,
    id: Date.now().toString(), // Simple ID generation
    timestamp: new Date()
  };
  
  members = [...members, newMember];
  saveToStorage();
  
  return newMember;
};

// Export members to CSV format
export const exportToCSV = (): string => {
  initializeFromStorage();
  
  if (members.length === 0) {
    return "لا توجد بيانات للتصدير";
  }
  
  // CSV Header
  let csv = "الاسم,الرقم القومي,رقم التليفون,النوع,الصفة,التاريخ\n";
  
  // Add rows
  members.forEach((member) => {
    const gender = member.gender === 'male' ? 'ذكر' : 'أنثى';
    const date = member.timestamp instanceof Date 
      ? member.timestamp.toLocaleDateString('ar-EG')
      : new Date().toLocaleDateString('ar-EG');
      
    csv += `"${member.name}","${member.nationalId}","${member.phone}","${gender}","${member.position}","${date}"\n`;
  });
  
  return csv;
};

// Function to download the CSV file
export const downloadCSV = (): void => {
  const csv = exportToCSV();
  const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' }); // Add BOM for proper Arabic encoding
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `بيانات_الأعضاء_${new Date().toLocaleDateString('ar-EG')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
