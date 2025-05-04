
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemberData } from "@/models/MemberData";
import { getAllMembers, downloadCSV } from "@/services/membersService";

const AdminDataTable = () => {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
    // Load members from service
    const loadMembers = () => {
      const data = getAllMembers();
      setMembers(data);
    };
    
    loadMembers();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(loadMembers, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(member => 
    member.name.includes(searchTerm) || 
    member.nationalId.includes(searchTerm) ||
    member.phone.includes(searchTerm) ||
    member.position.includes(searchTerm)
  );

  // Handle export to Excel/CSV
  const handleExport = () => {
    downloadCSV();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-party-blue to-party-lightblue text-white">
        <h2 className="text-2xl font-bold mb-2 text-center">بيانات الأعضاء المسجلين</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-4" dir="rtl">
          <div className="relative">
            <Input
              placeholder="بحث..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black pl-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </span>
          </div>
          <Button 
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 btn-shine"
          >
            تصدير البيانات (Excel)
          </Button>
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        {members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            لا توجد بيانات مسجلة بعد
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-right">الاسم</TableHead>
                  <TableHead className="text-right">الرقم القومي</TableHead>
                  <TableHead className="text-right">رقم التليفون</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">الصفة</TableHead>
                  <TableHead className="text-right">تاريخ التسجيل</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.nationalId}</TableCell>
                    <TableCell dir="ltr" className="text-right">{member.phone}</TableCell>
                    <TableCell>{member.gender === 'male' ? 'ذكر' : 'أنثى'}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>
                      {member.timestamp instanceof Date
                        ? member.timestamp.toLocaleDateString('ar-EG')
                        : new Date().toLocaleDateString('ar-EG')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 text-center text-sm text-gray-500" dir="rtl">
              إجمالي الأعضاء: {filteredMembers.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDataTable;
