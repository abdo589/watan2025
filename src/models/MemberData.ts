
export interface MemberData {
  id?: string;
  name: string;
  nationalId: string;
  phone: string;
  gender: 'male' | 'female';
  position: string;
  timestamp?: Date;
}

// Create a test data array for development purposes
export const sampleData: MemberData[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    nationalId: '29912121234567',
    phone: '01012345678',
    gender: 'male',
    position: 'منسق شباب',
    timestamp: new Date()
  },
  {
    id: '2',
    name: 'سارة أحمد',
    nationalId: '30112121234567',
    phone: '01112345678',
    gender: 'female',
    position: 'مسؤول لجنة',
    timestamp: new Date()
  }
];
